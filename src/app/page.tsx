import Link from 'next/link';
import { 
  Laptop, 
  Music, 
  Wrench, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Headphones 
} from 'lucide-react';
import Testimonials from '@/components/ui/Testimonials';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      
      {/* SECCIÓN HERO - IMPACTO INICIAL */}
      <section className="relative bg-white dark:bg-gray-950 pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Innovación </span>
              <span className="block text-blue-600 xl:inline">Tecnológica</span>
              <span className="block xl:inline"> y Pasión </span>
              <span className="block text-blue-600 xl:inline">Musical</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Encuentra los mejores equipos, accesorios musicales, clases particulares y soporte técnico especializado en Bagua. Todo en un solo lugar.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/tech" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all active:scale-95">
                  Ver Catálogo Tech
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/services" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-xl text-blue-600 bg-blue-50 dark:bg-gray-900 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition-all active:scale-95">
                  Solicitar Asistencia
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decoración de fondo suave */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* SECCIÓN DE CATEGORÍAS PRINCIPALES */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            
            {/* Tarjeta Tecnología */}
            <div className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                <Laptop size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Computo y Accesorios</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">Laptops, componentes, periféricos y repuestos de alta calidad con garantía local.</p>
              <Link href="/tech" className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                Explorar productos <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Tarjeta Música */}
            <div className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-4">
                <Music size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Instrumentos Musicales</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">Guitarras, teclados y accesorios. También ofrecemos clases personalizadas en Bagua.</p>
              <Link href="/music" className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                Ver instrumentos <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Tarjeta Soporte Técnico */}
            <div className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-4">
                <Wrench size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Servicio Técnico</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">Mantenimiento preventivo, reparación de hardware y optimización de sistemas operativos.</p>
              <Link href="/services" className="mt-4 flex items-center text-green-600 dark:text-green-400 font-bold text-sm">
                Conocer servicios <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS (POR QUÉ COBYTE) */}
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-blue-600 shrink-0" size={32} />
              <div>
                <h4 className="font-bold dark:text-white">Garantía Real</h4>
                <p className="text-sm text-gray-500">Respaldo total en Bagua</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Zap className="text-blue-600 shrink-0" size={32} />
              <div>
                <h4 className="font-bold dark:text-white">Entrega Rápida</h4>
                <p className="text-sm text-gray-500">Envios locales inmediatos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Headphones className="text-blue-600 shrink-0" size={32} />
              <div>
                <h4 className="font-bold dark:text-white">Soporte 24/7</h4>
                <p className="text-sm text-gray-500">Asesoría por WhatsApp</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Music className="text-blue-600 shrink-0" size={32} />
              <div>
                <h4 className="font-bold dark:text-white">Pasión Musical</h4>
                <p className="text-sm text-gray-500">Clases y asesoría experta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRUEBA SOCIAL - TESTIMONIOS */}
      <Testimonials />

      {/* CTA FINAL - LLAMADO A LA ACCIÓN */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Necesitas ayuda técnica o buscas un instrumento específico?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Estamos en Bagua para brindarte la mejor atención personalizada. Contáctanos ahora mismo.
          </p>
          <Link 
            href="https://wa.me/tu_numero" 
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-xl font-black text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            Chatear con un experto
          </Link>
        </div>
      </section>

    </div>
  );
}