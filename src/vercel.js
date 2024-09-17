// src/components/YourComponent.js
import React, { useState } from 'react';
import { sendOTPEmail } from './emailUtils';

const YourComponent = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendOTPEmail(email);
        // Handle further actions, e.g., show a success message or redirect
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit">Send OTP</button>
        </form>
    );
};

export default YourComponent;
