// OtpVerification.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    // Generate random 6-digit OTP
    const generateOtp = () => {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(newOtp);
        return newOtp;
    };

    const sendOtp = (e) => {
        e.preventDefault();
        const otp = generateOtp();

        const templateParams = {
            user_email: email,
            otp_code: otp,
        };

        emailjs
            .send('service_1xts70f', 'template_go393yq', templateParams, 'USAJDADYF8M8tSIbW')
            .then((response) => {
                console.log('OTP sent successfully!', response.status, response.text);
                setIsOtpSent(true);
            })
            .catch((err) => {
                console.error('Failed to send OTP:', err);
                alert('Failed to send OTP. Check console for details.');
            });
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        if (otp === generatedOtp) {
            alert('OTP Verified Successfully!');
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    return (
        <div>
            <h2>OTP Verification</h2>
            {!isOtpSent ? (
                <form onSubmit={sendOtp}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit">Send OTP</button>
                </form>
            ) : (
                <form onSubmit={verifyOtp}>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter the OTP"
                        required
                    />
                    <button type="submit">Verify OTP</button>
                </form>
            )}
        </div>
    );
};

export default OtpVerification;
