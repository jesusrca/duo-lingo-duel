
import { createClient } from '@supabase/supabase-js';

// Obtén las variables de entorno de Supabase (ya configuradas en el proyecto conectado a Supabase)
// Provide fallback values to avoid the "supabaseUrl is required" error
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Key Present' : 'Key Missing');

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Prueba básica de conexión
supabase.auth.onAuthStateChange((_event, session) => {
  console.log('Supabase Auth State Change Test:', session);
});
