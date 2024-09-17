// src/utils/emailUtils.js
export const sendOTPEmail = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP

    try {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipientEmail: email,
                otp,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Email sent:', result);
            return result;
        } else {
            console.error('Error sending email:', result);
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
};
