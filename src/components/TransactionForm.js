// src/components/TransactionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        apiKey: 'VRAJ', // Replace with your actual API key if needed
        userId: '',
        amount: '',
        transactionType: '',
        callbackUrl: '',
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/transactions', formData); // Ensure this is a POST request
            setResponseMessage(response.data.success ? 'Transaction successful!' : response.data.message);
        } catch (err) {
            setResponseMessage(`Error: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div>
            <h1>Transaction Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="apiKey"
                    placeholder="API Key"
                    value={formData.apiKey}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="userId"
                    placeholder="User ID"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
                <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                        Select Transaction Type
                    </option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                </select>
                <input
                    type="url"
                    name="callbackUrl"
                    placeholder="Callback URL (optional)"
                    value={formData.callbackUrl}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default TransactionForm;
