// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Directly include the Supabase URL and anon key
const SUPABASE_URL = 'https://ckvysioexrpmifmegule.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdnlzaW9leHJwbWlmbWVndWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzNDU3NTUsImV4cCI6MjA0MTkyMTc1NX0.fGXp0iJk32OsIRxxGY2rKTenXNgreutWRXuOMBjQrbo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
