'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Lock, User, Loader2, ShieldCheck } from 'lucide-react';

// Solución técnica para el Build: Inicializar solo si las variables existen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Nuestro chivato para la consola del navegador
console.log("URL LEÍDA POR NEXT.JS:", supabaseUrl || "¡ESTÁ VACÍA!");

const supabase = createClient(
supabaseUrl || 'https://dummy.supabase.co', 
supabaseAnonKey || 'dummy'
);

export default function LoginPage() {
// ... todo el resto de tu código del componente sigue EXACTAMENTE IGUAL
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
    });

    if (error) {
        alert("Error de autenticación: " + error.message);
    } else if (data.session) {
        // EL TRUCO: Plantar una cookie que el Middleware sí pueda ver
        document.cookie = `sb-access=${data.session.access_token}; path=/; max-age=86400`; // Dura 1 día
        
        // Ahora sí, nos movemos al panel
        window.location.replace('/admin');
    }
    } catch (err) {
    console.error("Error crítico:", err);
    alert("Error de red: Verifica tu conexión a internet.");
    } finally {
    setLoading(false);
    }
};

  // IMPORTANTE: Aquí estaba el error, faltaba el RETURN con el diseño
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
    <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl">
        
        <div className="text-center">
        <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <ShieldCheck className="text-blue-600" size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            COBYTE ADMIN
        </h2>
        <p className="mt-2 text-sm text-gray-500">
            Panel de Gestión de Inventario
        </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="space-y-4">
            <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
                type="email"
                required
                className="w-full pl-10 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="usuario@cobyte.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
                type="password"
                required
                className="w-full pl-10 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
        </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all active:scale-95 shadow-lg shadow-blue-600/20 disabled:bg-gray-400"
        >
            {loading ? (
            <Loader2 className="animate-spin" size={24} />
            ) : (
            'ACCEDER AL PANEL'
            )}
        </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
        Acceso restringido solo para administradores de COBYTE
        </p>
    </div>
    </div>
);
}