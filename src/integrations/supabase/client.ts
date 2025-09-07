import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yhvokpvdkeshggiafmbm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlodm9rcHZka2VzaGdnaWFmbWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTU2MzMsImV4cCI6MjA3MjIzMTYzM30.jRyFGjriD5EA7SbnXmvIvMgRUv-n-DYNXNH50M6QZEo";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});