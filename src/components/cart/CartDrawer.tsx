'use client';

import { useCartStore } from '@/store/cartStore';
import { X, Trash2, Plus, Minus, Send, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
const { isOpen, closeCart, items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  // === MOTOR DE WHATSAPP ===
const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    // 1. Aquí pon el número de COBYTE (Código de Perú 51 + tu celular sin espacios)
    const phoneNumber = "51945250393"; 

    // 2. Construimos el mensaje con saltos de línea (\n) y negritas de WhatsApp (*)
    let message = "Hola *COBYTE* 👋, me gustaría realizar el siguiente pedido:\n\n";

    items.forEach((item) => {
      const subtotal = item.price * item.quantity;
    message += `▪️ ${item.quantity}x ${item.name} - S/ ${subtotal.toLocaleString('es-PE')}\n`;
    });

    const total = getTotalPrice();
    message += `\n*Total a pagar: S/ ${total.toLocaleString('es-PE')}*\n\n`;
    message += "Quedo a la espera para coordinar la entrega en Bagua y el método de pago. 🚀";

    // 3. Codificamos el texto para que las URLs no se rompan con los espacios
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 4. Abrimos WhatsApp en una nueva pestaña
    window.open(whatsappUrl, '_blank');
};

if (!isOpen) return null;

return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Fondo oscuro transparente */}
    <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
    />

      {/* Panel del Carrito */}
    <div className="relative w-full max-w-md h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header del Carrito */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-black text-gray-900 dark:text-white">Tu Pedido</h2>
        <button 
            onClick={closeCart}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
        >
            <X size={24} />
        </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4">
            <ShoppingCart size={48} className="opacity-20" />
            <p>Tu carrito está vacío</p>
            </div>
        ) : (
            items.map((item) => (
            <div key={item.id} className="flex gap-4 border-b border-gray-50 dark:border-gray-800/50 pb-6 last:border-0">
                <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">{item.name}</h3>
                <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                    S/ {item.price.toLocaleString('es-PE')}
                </span>
                
                  {/* Controles de Cantidad */}
                <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm font-medium text-gray-900 dark:text-white border-x border-gray-200 dark:border-gray-700">
                        {item.quantity}
                    </span>
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                    </div>
                    <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Eliminar producto"
                    >
                    <Trash2 size={18} />
                    </button>
                </div>
                </div>
            </div>
            ))
        )}
        </div>

        {/* Footer del Carrito (Total y Botón) */}
        {items.length > 0 && (
        <div className="p-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Total Estimado</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white">
                S/ {getTotalPrice().toLocaleString('es-PE')}
            </span>
            </div>
            
            {/* Botón de Checkout */}
            <button 
            onClick={handleWhatsAppCheckout}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-[#25D366]/30 flex items-center justify-center gap-3 active:scale-95"
            >
            <Send size={20} />
            Pedir por WhatsApp
            </button>
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
            Pagas al recibir tu equipo en Bagua. Cero riesgo.
            </p>
        </div>
        )}
    </div>
    </div>
);
}