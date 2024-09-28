import dotenv from 'dotenv';

dotenv.config();

console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase ANON KEY:', process.env.SUPABASE_ANON_KEY);
