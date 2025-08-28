import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://portoddbpemsvvnmklsl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcnRvZGRicGVtc3Z2bm1rbHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTY3ODUsImV4cCI6MjA3MTkzMjc4NX0.s38tG84ydZ8uMj46aUbLnmg0lLOV9aL5bKQl18w0oS8';

export const supabase = createClient(supabaseUrl, supabaseKey);