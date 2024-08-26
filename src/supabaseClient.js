import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseUrl = "https://ruktckfzypvxzmlotzeb.supabase.co";
console.log({supabaseUrl});
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1a3Rja2Z6eXB2eHptbG90emViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2NTUyMTksImV4cCI6MjAzOTIzMTIxOX0.QNn0ZnI0FeQ0Cw0SPIjZOinQHPoVj8-kDKWo109XJec";
export const supabase = createClient(supabaseUrl, supabaseKey);