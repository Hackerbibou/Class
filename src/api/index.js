import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://olrfgwsbgyajiicxsnhz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
console.log(supabaseKey)
console.log(supabaseUrl)
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;