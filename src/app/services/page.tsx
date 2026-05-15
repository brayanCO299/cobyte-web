import { Wrench, MonitorUp, Cpu, Music, CheckCircle2, MessageCircle } from 'lucide-react';

export const metadata = {
title: 'Servicios | COBYTE',
description: 'Soporte técnico, ensamblaje de computadoras y clases de música en Bagua.',
};

export default function ServicesPage() {
  // 1. Pon tu número real aquí (Código 51 + tu celular sin espacios)
const phoneNumber = "51945250393"; 

const services = [
    {
    id: 'soporte',
    title: 'Soporte Técnico Especializado',
    icon: <Wrench className="text-blue-600 dark:text-blue-400" size={32} />,
    description: 'Mantenimiento preventivo y correctivo para laptops y PCs. Solución a lentitud, virus y fallas de hardware en general.',
    features: ['Diagnóstico preciso', 'Limpieza interna y cambio de pasta térmica', 'Reparación de placas y componentes', 'Servicio a domicilio en Bagua'],
    whatsappMessage: 'Hola COBYTE, necesito información sobre el servicio de Soporte Técnico para mi equipo.'
    },
    {
    id: 'software',
    title: 'Instalación de Software',
    icon: <MonitorUp className="text-blue-600 dark:text-blue-400" size={32} />,
    description: 'Instalación y formateo de sistemas operativos, paquetes de ofimática, programas de diseño gráfico y arquitectura.',
    features: ['Windows 10 / 11', 'Microsoft Office (Word, Excel, PowerPoint)', 'Adobe CC, AutoCAD, CorelDRAW', 'Respaldo de información (Backup)'],
    whatsappMessage: 'Hola COBYTE, deseo cotizar la instalación de algunos programas/software.'
    },
    {
    id: 'ensamblaje',
    title: 'Ensamblaje de PCs',
    icon: <Cpu className="text-blue-600 dark:text-blue-400" size={32} />,
    description: 'Armado de computadoras a medida según tu presupuesto y necesidades. Equipos para diseño, ingeniería, gaming u oficina.',
    features: ['Asesoría en compra de componentes', 'Ensamblaje profesional y gestión de cables', 'Instalación de sistema y drivers', 'Pruebas de estrés y rendimiento'],
    whatsappMessage: 'Hola COBYTE, me interesa el servicio de Ensamblaje de PC a medida. Mi presupuesto/necesidad es...'
    },
    {
    id: 'musica',
    title: 'Clases de Música',
    icon: <Music className="text-blue-600 dark:text-blue-400" size={32} />,
    description: 'Aprende a tocar tu instrumento favorito con nuestra metodología práctica. Clases personalizadas para todas las edades.',
    features: ['Guitarra Acústica y Eléctrica', 'Teclado / Piano', 'Teoría musical y lectura de partituras', 'Horarios flexibles'],
    whatsappMessage: 'Hola COBYTE, me gustaría recibir información sobre las clases de música y horarios disponibles.'
    }
];

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    
      {/* Cabecera de la página */}
    <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
        Servicios Profesionales en Bagua
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
        Soluciones integrales para tus equipos tecnológicos y desarrollo de tu talento musical. Calidad, garantía y confianza.
        </p>
    </div>

      {/* Cuadrícula de Servicios */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((service) => (
        <div 
            key={service.id} 
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                {service.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
            {service.description}
            </p>

            <ul className="space-y-3 mb-8">
            {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
            ))}
            </ul>

            <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(service.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gray-900 hover:bg-blue-600 dark:bg-white dark:text-gray-900 dark:hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
            <MessageCircle size={20} />
            Solicitar Cotización
            </a>
        </div>
        ))}
    </div>

      {/* Banner inferior de confianza */}
    <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-4">¿Tienes un requerimiento especial?</h3>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
        También ofrecemos ventas al por mayor, implementación de redes para negocios y asesorías personalizadas. Escríbenos y te daremos la mejor solución.
        </p>
        <a
        href={`https://wa.me/${phoneNumber}?text=Hola%20COBYTE,%20tengo%20un%20requerimiento%20especial%20para%20mi%20negocio/proyecto.`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-50 font-black py-3 px-8 rounded-full transition-colors shadow-md"
        >
        <MessageCircle size={20} />
        Contáctanos Directamente
        </a>
    </div>

    </div>
);
}