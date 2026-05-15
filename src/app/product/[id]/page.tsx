import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ScarcityTrigger from "@/components/ui/ScarcityTrigger";
import { ArrowLeft, CheckCircle, Shield } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";

// 1. Importamos Metadata de Next
import { Metadata } from 'next';

// ... (tus otros imports quedan igual: Image, Link, notFound, supabase, etc.) ...

// 2. Agregamos esta función para generar el SEO dinámico
export async function generateMetadata({ 
params 
}: { 
params: Promise<{ id: string }> 
}): Promise<Metadata> {
const { id } = await params;

  // Buscamos el producto (Next.js es inteligente y compartirá esta consulta con la principal)
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

// 1. Cambio aquí: Le decimos a TypeScript que params es una Promesa
export default async function ProductDetailPage({ 
params 
}: { 
params: Promise<{ id: string }> 
}) {
  // 2. Cambio clave: Usamos await para extraer el ID de la promesa
const { id } = await params;

  // 3. Ahora usamos ese 'id' extraído para buscar en Supabase
const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

if (!product) {
    notFound();
}

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Botón de volver */}
    {/* Botón de volver */}
<Link href="/tech" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-6">
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
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />
            ) : (
            <span className="text-gray-400">Imagen no disponible</span>
            )}
        </div>

          {/* Columna Derecha: Información */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">
            {product.category}
            </span>
            
            {/* INYECTAMOS EL GATILLO MENTAL AQUÍ */}
            <ScarcityTrigger productId={product.id} />
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {product.name}
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 whitespace-pre-line">
            {product.description}
            </p>

            <div className="space-y-4 mb-10">
            <div className="flex items-center text-gray-700">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span>Stock disponible para delivery local</span>
            </div>
            <div className="flex items-center text-gray-700">
                <Shield className="text-blue-500 mr-3" size={20} />
                <span>Garantía y soporte técnico directo con COBYTE</span>
            </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
            <AddToCartButton product={{ id: product.id, name: product.name, price: product.price }} />
            </div>
        </div>

        </div>
    </div>
    </div>
);
}