import Link from 'next/link';

export default function Footer() {
return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
        
          {/* Columna 1: Marca */}
        <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter text-gray-900 inline-block mb-4">
            COBYTE<span className="text-blue-600">.</span>
            </Link>
            <p className="text-sm text-gray-500 mb-6">
            Innovación tecnológica, pasión musical y soporte técnico especializado a tu alcance.
            </p>
        </div>

          {/* Columna 2: Enlaces Rápidos */}
        <div>
            <h4 className="font-bold text-gray-900 mb-4">Explorar</h4>
            <ul className="space-y-3 text-sm text-gray-500">
            <li><Link href="/tech" className="hover:text-blue-600 transition-colors">Tecnología</Link></li>
            <li><Link href="/music" className="hover:text-blue-600 transition-colors">Zona Musical</Link></li>
            <li><Link href="/services" className="hover:text-blue-600 transition-colors">Servicios y Delivery</Link></li>
            </ul>
        </div>

          {/* Columna 3: Servicios */}
        <div>
            <h4 className="font-bold text-gray-900 mb-4">Servicios</h4>
            <ul className="space-y-3 text-sm text-gray-500">
            <li>Soporte Técnico</li>
            <li>Instalación de Software</li>
            <li>Clases de Música</li>
            <li>Asesoría Personalizada</li>
            </ul>
        </div>

          {/* Columna 4: Contacto */}
        <div>
            <h4 className="font-bold text-gray-900 mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-500">
            <li>Bagua, Amazonas - Perú</li>
            <li>Atención Delivery</li>
            <li>Lunes a Sábado: 9am - 7pm</li>
            </ul>
        </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
            © 2026 COBYTE. Todos los derechos reservados.
        </p>
        <div className="text-sm text-gray-400">
            Desarrollado con Next.js y Tailwind CSS
        </div>
        </div>
    </div>
    </footer>
);
}