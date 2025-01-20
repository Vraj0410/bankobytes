import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import ReCAPTCHA from 'react-google-recaptcha';  // Import reCAPTCHA
import "./Signup.css";

// Supabase credentials
const supabaseUrl = 'https://ckvysioexrpmifmegule.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdnlzaW9leHJwbWlmbWVndWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzNDU3NTUsImV4cCI6MjA0MTkyMTc1NX0.fGXp0iJk32OsIRxxGY2rKTenXNgreutWRXuOMBjQrbo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Your reCAPTCHA site key
const RECAPTCHA_SITE_KEY = '6Lek7EgqAAAAAHlKHTj8DK8fw8Knj7omeX0giaqi';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone_number: '',
        email: '',
        aadhar_number: '',
        pan_number: ''
    });
    const [files, setFiles] = useState({
        aadhar_image: null,
        pan_image: null,
        birth_certificate_image: null,
        digital_signature_image: null
    });
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);  // State to track CAPTCHA verification

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFiles(prevFiles => ({
            ...prevFiles,
            [name]: files[0] || null
        }));
    };

    const uploadFile = async (file, folderName, newFileName) => {
        if (!file) return null;

        const fileExtension = file.name.split('.').pop();
        const fileName = `${newFileName}.${fileExtension}`;
        const filePath = `${folderName}/${fileName}`;

        const { data, error } = await supabase
            .storage
            .from('images')
            .upload(filePath, file);

        if (error) {
            console.error(`Error uploading ${fileName}:`, error);
            return null;
        }

        const { data: publicUrlData, error: urlError } = supabase
            .storage
            .from('images')
            .getPublicUrl(filePath);

        if (urlError) {
            console.error(`Error getting URL for ${fileName}:`, urlError);
            return null;
        }

        const publicUrl = publicUrlData.publicUrl;
        return publicUrl;
    };

    const handleCaptchaChange = (value) => {
        if (value) {
            setCaptchaVerified(true);
        } else {
            setCaptchaVerified(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!captchaVerified) {
            setMessage('Please complete the CAPTCHA.');
            return;
        }

        setUploading(true);
        setMessage('');

        const folderName = `${formData.name.replace(/\s+/g, '_')}_${Date.now()}`;

        try {
            const urls = await Promise.all(
                Object.entries(files).map(async ([key, file]) => {
                    if (!file) return null;

                    let newFileName;
                    switch (key) {
                        case 'aadhar_image':
                            newFileName = 'aadhar';
                            break;
                        case 'pan_image':
                            newFileName = 'pan';
                            break;
                        case 'birth_certificate_image':
                            newFileName = 'birth_certificate';
                            break;
                        case 'digital_signature_image':
                            newFileName = 'digital_signature';
                            break;
                        default:
                            newFileName = 'unknown';
                    }

                    return await uploadFile(file, folderName, newFileName);
                })
            );

            const [aadharUrl, panUrl, birthCertUrl, digitalSigUrl] = urls;

            const { error } = await supabase
                .from('user_data')
                .insert([
                    {
                        name: formData.name,
                        age: formData.age,
                        phone_number: formData.phone_number,
                        email: formData.email,
                        aadhar_number: formData.aadhar_number,
                        pan_number: formData.pan_number,
                        aadhar_image: aadharUrl,
                        pan_image: panUrl,
                        birth_certificate_image: birthCertUrl,
                        digital_signature_image: digitalSigUrl,
                    }
                ]);

            if (error) {
                setMessage('Error submitting form: ' + error.message);
            } else {
                setMessage('Form submitted successfully!');
            }
        } catch (err) {
            setMessage('An unexpected error occurred during form submission.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="signup-container">
            <form className="form-Signup" onSubmit={handleSubmit}>
                <table className="table-Signup">
                    <tbody>
                        <tr>
                            <th><label>Name:</label></th>
                            <td><input className="input-Signup" type="text" name="name" value={formData.name} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <th><label>Age:</label></th>
                            <td><input className="input-Signup" type="number" name="age" value={formData.age} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <th><label>Phone Number:</label></th>
                            <td><input className="input-Signup" type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <th><label>Email ID:</label></th>
                            <td><input className="input-Signup" type="email" name="email" value={formData.email} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <th><label>Aadhar Number:</label></th>
                            <td><input className="input-Signup" type="text" name="aadhar_number" value={formData.aadhar_number} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <th><label>PAN Number:</label></th>
                            <td><input className="input-Signup" type="text" name="pan_number" value={formData.pan_number} onChange={handleInputChange} required /></td>
                        </tr>
                        <tr>
                            <th><label>Aadhar Image:</label></th>
                            <td><input className="input-file-Signup" type="file" name="aadhar_image" onChange={handleFileChange} /></td>
                        </tr>
                        <tr>
                            <th><label>PAN Image:</label></th>
                            <td><input className="input-file-Signup" type="file" name="pan_image" onChange={handleFileChange} /></td>
                        </tr>
                        <tr>
                            <th><label>Birth Certificate Image:</label></th>
                            <td><input className="input-file-Signup" type="file" name="birth_certificate_image" onChange={handleFileChange} /></td>
                        </tr>
                        <tr>
                            <th><label>Digital Signature Image:</label></th>
                            <td><input className="input-file-Signup" type="file" name="digital_signature_image" onChange={handleFileChange} /></td>
                        </tr>
                    </tbody>
                </table>

                {/* reCAPTCHA Component */}
                <div className="captcha-Signup">
                    <ReCAPTCHA
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={handleCaptchaChange}
                    />
                </div>

                <button className="button-Signup" type="submit" disabled={uploading}>
                    {uploading ? 'Submitting...' : 'Submit'}
                </button>

                {message && <p className="message-Signup">{message}</p>}
            </form>
        </div>
    );
}

export default Signup;
