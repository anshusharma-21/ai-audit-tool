import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://uphmajzqdyucvzdukxll.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwaG1hanpxZHl1Y3Z6ZHVreGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTkyNjMsImV4cCI6MjA5Mzc5NTI2M30.THCqEj6bJVE20p2CsGTy35_W9YpLM99N-uHUEKNB6WI'; 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);



