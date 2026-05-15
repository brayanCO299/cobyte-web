'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, XCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

// 1. Tipamos correctamente el objeto completo que viene de Supabase
interface Product {
id: number;
name: string;
price: number;
description: string;
category: string;
image_url?: string;
stock?: number;
is_active?: boolean;
}

interface ProductCardProps {
product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
const addToCart = useCartStore((state) => state.addToCart);

  // 2. Evaluamos la disponibilidad real del producto
const isOutOfStock = product.stock !== undefined && product.stock <= 0;
const isInactive = product.is_active === false;
const isDisabled = isOutOfStock || isInactive;

  // Truco de ingeniero: e.preventDefault() evita propagación al Link padre
const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (isDisabled) return; // Capa extra de seguridad
    addToCart({ id: product.id, name: product.name, price: product.price });
};

return (
    <Link 
    href={`/product/${product.id}`} 
    className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
    >
    
      {/* Contenedor de la Imagen */}
    <div className="relative h-64 w-full bg-white dark:bg-gray-800 p-4 flex items-center justify-center overflow-hidden border-b border-gray-50 dark:border-gray-800">
        
        {/* Etiqueta de Agotado (Sobre la imagen) */}
        {isDisabled && (
        <div className="absolute inset-0 bg-white/60 dark:bg-black/60 z-10 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-red-600 text-white font-black px-4 py-2 rounded-xl transform -rotate-12 shadow-lg">
            AGOTADO
            </span>
        </div>
        )}

        {product.image_url ? (
        <Image
            src={product.image_url}
            alt={`Imagen de ${product.name}`}
            fill
            className={`object-contain group-hover:scale-105 transition-transform duration-500 ${isDisabled ? 'grayscale' : ''}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true} // <-- SOLUCIÓN AL ERROR LCP (Letras amarillas de Next.js)
        />
        ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <span className="text-gray-400 dark:text-gray-500 font-medium text-sm">Sin imagen</span>
        </div>
        )}
    </div>
    
      {/* Contenido y Textos */}
    <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
        {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow line-clamp-3 min-h-[4.5rem]">
        {product.description}
        </p>
        
        {/* Pie de Tarjeta: Precio y Botón Carrito */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
        <span className="text-xl font-black text-gray-900 dark:text-white">
            S/ {product.price.toLocaleString('es-PE')}
        </span>
        <button 
            disabled={isDisabled}
            onClick={handleBuy}
            className={`p-2 rounded-lg transition-colors shadow-md z-20 relative ${
            isDisabled 
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none' 
            : 'bg-gray-900 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-500 active:scale-95'
            }`}
        >
            {isDisabled ? <XCircle size={20} /> : <ShoppingCart size={20} />}
        </button>
        </div>
    </div>
    </Link>
);
}