import ProductCard from "@/components/ui/ProductCard";
import { supabase } from "@/lib/supabase";
// Agrega esta línea en page.tsx, tech/page.tsx y music/page.tsx
export const revalidate = 3600; // Revalida la caché cada 3600 segundos (1 hora)
export default async function MusicPage() {
  // Hacemos la consulta filtrando por las categorías musicales
  // Nota: Asegúrate de que los nombres de las categorías coincidan exactamente con tu base de datos
const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .in('category', ['Instrumentos', 'Accesorios Musicales', 'Servicios / Clases']) 
    .order('id', { ascending: false });

if (error) {
    console.error("Error cargando productos de música:", error);
}

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Zona Musical COBYTE</h1>
        <p className="mt-4 text-lg text-gray-500 max-w-3xl">
        Instrumentos, accesorios y formación musical. Todo lo que necesitas para llevar tu talento al siguiente nivel.
        </p>
    </div>

    {!products || products.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-gray-100">
        Aún no hay instrumentos disponibles. ¡Vuelve pronto!
        </div>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
            <ProductCard 
            key={product.id}
            product={product as any} 
            />
        ))}
        </div>
    )}
    </div>
);
}