const conn = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = conn.createClient(supabaseUrl, supabaseAnonKey);

// Test connection
async function testConnection() {
    const { data, error } = await supabase
        .from('contacts')
        .select('*');

    if (error) {
        console.error("Connection failed:", error);
    } else {
        console.log("Successfully Connected To Database!");
    }
}

testConnection();

module.exports = supabase;
