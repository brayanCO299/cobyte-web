'use client';

import { useEffect, useState } from 'react';
import { Flame, Clock } from 'lucide-react';

export default function ScarcityTrigger({ productId }: { productId: number }) {
const [mounted, setMounted] = useState(false);
const [viewers, setViewers] = useState(0);
const [stock, setStock] = useState(0);

  // Usamos useEffect para que los números aleatorios solo se generen en el cliente 
  // y evitamos errores de hidratación con Next.js
useEffect(() => {
    // Generamos un número pseudo-aleatorio basado en el ID del producto
    // Así, si el producto es el #5, siempre mostrará que quedan, por ejemplo, 2 unidades.
    const randomStock = (productId % 3) + 1; // Dará 1, 2 o 3
    const randomViewers = (productId % 5) + 2; // Dará entre 2 y 6

    setStock(randomStock);
    setViewers(randomViewers);
    setMounted(true);
}, [productId]);

if (!mounted) return <div className="h-12 w-full animate-pulse bg-gray-100 rounded-lg mb-6"></div>;

return (
    <div className="flex flex-col gap-3 mb-8">
      {/* Gatillo de Prueba Social (Social Proof) */}
    <div className="flex items-center text-orange-600 bg-orange-50 px-4 py-2 rounded-lg border border-orange-100 w-fit">
        <Flame size={18} className="mr-2 animate-pulse" />
        <span className="text-sm font-semibold">
        Alta demanda: <span className="font-bold">{viewers} personas</span> están viendo este equipo.
        </span>
    </div>

      {/* Gatillo de Escasez (Scarcity) */}
    <div className="flex items-center text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-100 w-fit">
        <Clock size={18} className="mr-2" />
        <span className="text-sm font-semibold">
        Stock crítico: Solo quedan <span className="font-black text-red-700">{stock} unidades</span> disponibles.
        </span>
    </div>
    </div>
);
}