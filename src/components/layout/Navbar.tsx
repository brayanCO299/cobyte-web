'use client';

import Link from 'next/link';
import { 
  Smartphone, 
  Headphones, 
  Laptop, 
  Music, 
  Menu, 
  X,
  LayoutDashboard
} from 'lucide-react';
import { useState } from 'react';

// 1. Aquí es donde agregamos las nuevas categorías de COBYTE
const navLinks = [
  { name: 'Celulares', href: '/category/celulares', icon: <Smartphone size={18} /> },
  { name: 'Audio', href: '/category/audio', icon: <Headphones size={18} /> },
  { name: 'Tecnología', href: '/tech', icon: <Laptop size={18} /> },
  { name: 'Música', href: '/music', icon: <Music size={18} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo de COBYTE */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-blue-600">COBYTE</span>
          </Link>

          {/* Navegación para Computadoras (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {/* Botón directo al Administrador */}
            <Link 
              href="/admin" 
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-blue-600 transition-all"
              title="Panel de Control"
            >
              <LayoutDashboard size={20} />
            </Link>
          </div>

          {/* Botón de Menú para Celulares (Hamburguesa) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para vista Móvil */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-900 font-bold text-gray-700 dark:text-gray-200"
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