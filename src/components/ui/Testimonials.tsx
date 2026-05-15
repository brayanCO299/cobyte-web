import { Star } from 'lucide-react';

const testimonials = [
{
    id: 1,
    name: "Carlos M.",
    role: "Cliente de Soporte Técnico",
    location: "Centro de Bagua",
    content: "Cesar me salvó la laptop justo antes de un informe importante. Servicio rápido, transparente y muy profesional. 100% recomendado.",
    rating: 5,
},
{
    id: 2,
    name: "Ana Lucía",
    role: "Alumna de Guitarra",
    location: "Bagua Capital",
    content: "Empecé desde cero y la paciencia que tienen en COBYTE para enseñar música es increíble. Además, compré mi primera guitarra acústica aquí mismo a muy buen precio.",
    rating: 5,
},
{
    id: 3,
    name: "Ing. Roberto",
    role: "Actualización de Hardware",
    location: "Sector El Milagro",
    content: "Le instalaron un SSD y más memoria RAM a mi equipo. Quedó volando. Excelente trato y te explican todo el proceso técnico con claridad.",
    rating: 5,
}
];

export default function Testimonials() {
return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Confianza respaldada por nuestra comunidad
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Descubre por qué COBYTE es la opción #1 en tecnología y música en Bagua.
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
            <div 
            key={testimonial.id} 
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
            >
            <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
                ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                "{testimonial.content}"
            </p>
            <div>
                <p className="text-base font-bold text-gray-900 dark:text-white">
                {testimonial.name}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {testimonial.role}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                📍 {testimonial.location}
                </p>
            </div>
            </div>
        ))}
        </div>
    </div>
    </section>
);
}