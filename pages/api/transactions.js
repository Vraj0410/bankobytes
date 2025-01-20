// pages/api/transactions.js
import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = "https://bdxmgpmqmybbcbxfmlkr.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkeG1ncG1xbXliYmNieGZtbGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNjU2ODEsImV4cCI6MjA1Mjk0MTY4MX0.vINvwhVzk8k6XrNaW1ghC3ULGA4hde9q2vROuhCBjJo";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
    console.log('Request method:', req.method); // Debugging the request method

    if (req.method === 'POST') {
        const { apiKey, userId, amount, transactionType, callbackUrl } = req.body;

        // Check API key
        if (apiKey !== process.env.VALID_API_KEY) {
            return res.status(403).json({ success: false, message: 'Invalid API key.' });
        }

        try {
            // Insert transaction into Supabase
            const { data, error } = await supabase
                .from('transactions')
                .insert({
                    user_id: userId,
                    amount,
                    type: transactionType,
                    status: 'pending',
                })
                .select();

            if (error) throw error;

            // Optional: Send a callback if the callback URL is provided
            if (callbackUrl) {
                await fetch(callbackUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ transactionId: data[0].id, status: 'success' }),
                });
            }

            return res.status(200).json({ success: true, data });
        } catch (err) {
            console.error('Error:', err.message);
            return res.status(500).json({ success: false, message: err.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
