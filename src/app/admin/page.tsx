import Link from 'next/link';
import { PlusCircle, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
        <LayoutDashboard className="text-blue-600" size={32} /> 
        Panel de Control
        </h1>
        
        {/* Botón que te lleva al formulario */}
        <Link 
        href="/admin/nuevo" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
        >
        <PlusCircle size={20} />
        Nuevo Artículo
        </Link>
    </div>
    
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 border border-gray-100 dark:border-gray-800 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Bienvenido a la central de COBYTE</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
        Aquí construiremos la tabla maestra para gestionar todo tu inventario en tiempo real. Por ahora, utiliza el botón superior para ingresar nuevos celulares, audífonos o tecnología.
        </p>
    </div>
    </div>
);
}