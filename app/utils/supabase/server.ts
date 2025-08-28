import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://portoddbpemsvvnmklsl.supabase.co';
// Make sure we have a fallback for the service role key
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcnRvZGRicGVtc3Z2bm1rbHNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjM1Njc4NSwiZXhwIjoyMDcxOTMyNzg1fQ.yRaGJyFSettMr4uVD9kJ3BCDpuZ_5bw32GiQlHuTa44';

// This client should ONLY be used in server-side code
// It bypasses RLS policies completely
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);