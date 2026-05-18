import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ScarcityTrigger from "@/components/ui/ScarcityTrigger";
import AddToCartButton from "@/components/ui/AddToCartButton";
// Importaciones unificadas de Lucide
import { ArrowLeft, CheckCircle, Shield, Info, CheckCircle2, Zap, ShieldCheck, Tag } from "lucide-react";
import { Metadata } from 'next';

export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params;

    const { data: product } = await supabase
        .from('products')
        .select('name, description, image_url')
        .eq('id', id)
        .single();

    if (!product) {
        return { title: 'Producto no encontrado | COBYTE' };
    }

    return {
        title: `${product.name} | COBYTE`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.image_url ? [product.image_url] : [],
        },
    };
}

export default async function ProductDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (!product) {
        notFound();
    }

    // LÓGICA DE INGENIERO: Parseo del texto plano a formato lista
    // Usamos un fallback a string vacío en caso de que un producto no tenga descripción
    const caracteristicas = (product.description || '')
        .split(/[,\n]+/)
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 2);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Botón de volver */}
            <Link href="/tech" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-6 font-medium">
                <ArrowLeft size={20} className="mr-2" />
                Volver al catálogo
            </Link>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

                    {/* Columna Izquierda: Imagen */}
                    <div className="relative h-96 md:h-full min-h-[400px] bg-gray-50 flex items-center justify-center p-8 border-r border-gray-100">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-contain p-8 mix-blend-multiply"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <span className="text-gray-400 font-medium">Imagen no disponible</span>
                        )}
                    </div>

                    {/* Columna Derecha: Información */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">
                            {product.category}
                        </span>

                        {/* GATILLO MENTAL */}
                        <ScarcityTrigger productId={product.id} />

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="text-3xl font-black text-gray-900 mb-8">
                            S/ {product.price}
                        </div>

                        {/* --- BLOQUE DE DESGLOSE VISUAL --- */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-blue-50 rounded-xl">
                                    <Info className="text-blue-600" size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                                    Especificaciones Técnicas
                                </h3>
                            </div>

                            {caracteristicas.length > 1 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {caracteristicas.map((caracteristica: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100"
                                        >
                                            <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={18} />
                                            <span className="text-gray-700 text-sm font-medium leading-relaxed">
                                                {caracteristica.charAt(0).toUpperCase() + caracteristica.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-700 leading-relaxed font-medium text-sm">
                                    {product.description}
                                </div>
                            )}
                        </div>
                        {/* --- FIN DEL BLOQUE --- */}

                        {/* Badges de Confianza */}
                        <div className="space-y-3 mb-10 bg-gradient-to-br from-blue-50/50 to-white p-5 rounded-2xl border border-blue-100/50">
                            <div className="flex items-center text-gray-700 text-sm font-medium">
                                <Zap className="text-yellow-500 mr-3 shrink-0" size={18} />
                                <span>Disponibilidad inmediata en Bagua</span>
                            </div>
                            <div className="flex items-center text-gray-700 text-sm font-medium">
                                <ShieldCheck className="text-blue-500 mr-3 shrink-0" size={18} />
                                <span>Garantía y soporte técnico directo con COBYTE</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-100">
                            {/* Le pasamos image_url al carrito para que la muestre en el panel lateral */}
                            <AddToCartButton product={{ id: product.id, name: product.name, price: product.price }} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}