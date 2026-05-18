'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Información de las diapositivas
const slides = [
    {
        id: 1,
        title: 'El Ecosistema Premium',
        description: 'Encuentra los modelos iPhone 14 Pro y 15 Pro con la mejor garantía en Bagua.',
        buttonText: 'Ver Celulares',
        link: '/category/celulares',
        // Usamos colores de fondo por si la imagen tarda en cargar, y una imagen real de internet para que pruebes
        bgColor: 'bg-gradient-to-r from-blue-900 to-blue-700',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Pasión por la Música',
        description: 'Saxofones, instrumentos y accesorios de nivel profesional para potenciar tu talento.',
        buttonText: 'Explorar Audio',
        link: '/category/audio',
        bgColor: 'bg-gradient-to-r from-amber-800 to-amber-600',
        image: 'https://images.unsplash.com/photo-1573871666457-7c7329118cf9?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Potencia tu Productividad',
        description: 'Laptops Lenovo, HP y Huawei de última generación para ingenieros y estudiantes.',
        buttonText: 'Ver Tecnología',
        link: '/tech',
        bgColor: 'bg-gradient-to-r from-gray-900 to-gray-700',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop'
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    // Lógica para que cambie solo cada 5 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-xl group">

            {/* Contenedor de las diapositivas */}
            <div
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className={`min-w-full h-full relative ${slide.bgColor}`}>
                        {/* Imagen de fondo con opacidad para que el texto resalte */}
                        <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        ></div>

                        {/* Contenido (Texto y Botón) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md transform transition-all duration-500 translate-y-0">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl drop-shadow">
                                {slide.description}
                            </p>
                            <Link
                                href={slide.link}
                                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
                            >
                                {slide.buttonText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botones de Control (Flechas) - Solo aparecen al pasar el mouse en PC */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronLeft size={28} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronRight size={28} />
            </button>

            {/* Indicadores (Puntitos abajo) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`transition-all duration-300 rounded-full ${current === index ? 'bg-white w-8 h-2.5' : 'bg-white/50 w-2.5 h-2.5 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}