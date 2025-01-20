import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://bdxmgpmqmybbcbxfmlkr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkeG1ncG1xbXliYmNieGZtbGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNjU2ODEsImV4cCI6MjA1Mjk0MTY4MX0.vINvwhVzk8k6XrNaW1ghC3ULGA4hde9q2vROuhCBjJo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
