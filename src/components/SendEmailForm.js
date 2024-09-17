// src/components/SendEmailForm.js
import React, { useState } from 'react';
import { sendOTPEmail } from '../emailUtils';

const SendEmailForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await sendOTPEmail(email);
            setSuccess('OTP email sent successfully!');
        } catch (err) {
            setError('Failed to send OTP email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Send OTP Email</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send OTP'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default SendEmailForm;
