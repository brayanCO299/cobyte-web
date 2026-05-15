'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface Props {
product: {
    id: number;
    name: string;
    price: number;
}
}

export default function AddToCartButton({ product }: Props) {
const addToCart = useCartStore((state) => state.addToCart);

return (
    <button 
    onClick={() => addToCart(product)}
    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-95"
    >
    <ShoppingCart size={24} />
    Añadir al Carrito - S/ {product.price.toLocaleString('es-PE')}
    </button>
);
}