import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
    <div className="bg-blue-50 p-6 rounded-full mb-8">
        <Search size={48} className="text-blue-600" />
    </div>
    
    <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
        404
    </h1>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Página no encontrada
    </h2>
    <p className="text-gray-500 max-w-md mx-auto mb-10">
        Parece que el producto o la página que buscas no existe, ha sido movida o ya no está disponible en nuestro catálogo.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4">
        <Link 
        href="/tech" 
        className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
        >
        Ver Catálogo Tech
        </Link>
        <Link 
        href="/" 
        className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
        >
        Volver al Inicio
        </Link>
    </div>
    </div>
);
}