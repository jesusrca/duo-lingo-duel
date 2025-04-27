
import { createClient } from '@supabase/supabase-js';

// Obtén las variables de entorno de Supabase (ya configuradas en el proyecto conectado a Supabase)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
