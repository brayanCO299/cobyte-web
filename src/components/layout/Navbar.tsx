'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Headphones,
  Laptop,
  Music,
  Menu,
  X,
  LayoutDashboard,
  ShoppingCart
} from 'lucide-react';

// IMPORTAMOS TU TIENDA GLOBAL (Ajusta la ruta si tu archivo no está en src/store/cartStore)
import { useCartStore } from '@/store/cartStore'; 

const navLinks = [
  { name: 'Celulares', href: '/category/celulares', icon: <Smartphone size={18} /> },
  { name: 'Audio', href: '/category/audio', icon: <Headphones size={18} /> },
  { name: 'Tecnología', href: '/tech', icon: <Laptop size={18} /> },
  { name: 'Música', href: '/music', icon: <Music size={18} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // CONECTAMOS CON ZUSTAND: Extraemos los items y la función para abrir el carrito
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  
  // Calculamos el total de artículos en tiempo real para la burbuja
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LADO IZQUIERDO: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">
              COBYTE
            </Link>
          </div>

          {/* CENTRO: Enlaces de navegación */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* LADO DERECHO: Carrito, Admin y Menú Móvil */}
          <div className="flex items-center gap-4 sm:gap-6">

            {/* BOTÓN DINÁMICO DEL CARRITO */}
            <button 
              onClick={openCart} 
              className="relative p-2 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors focus:outline-none"
            >
              <ShoppingCart size={24} />
              {/* La burbuja solo aparece si hay más de 0 artículos */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full transform translate-x-1/4 -translate-y-1/4">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón Admin */}
            <Link
              href="/admin"
              className="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
              title="Panel de Administración"
            >
              <LayoutDashboard size={24} />
            </Link>

            {/* Botón de Menú Móvil */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}