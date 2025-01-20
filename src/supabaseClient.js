// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = "https://bdxmgpmqmybbcbxfmlkr.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkeG1ncG1xbXliYmNieGZtbGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNjU2ODEsImV4cCI6MjA1Mjk0MTY4MX0.vINvwhVzk8k6XrNaW1ghC3ULGA4hde9q2vROuhCBjJo";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
