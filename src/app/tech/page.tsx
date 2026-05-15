import ProductCard from "@/components/ui/ProductCard";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600; 

export default async function TechPage() {
const { data: products, error } = await supabase
    .from('products')
    .select('*')
    // Mantenemos tu filtro para que solo traiga tecnología
    .in('category', ['Laptops', 'Accesorios Tech', 'Monitores', 'Smartphones', 'Tecnología']) 
    .order('id', { ascending: false });

if (error) console.error("Error cargando productos:", error);

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Catálogo de Tecnología</h1>
        <p className="mt-4 text-lg text-gray-500 max-w-3xl">
        Equipos seleccionados y optimizados para el máximo rendimiento. Todo con la garantía y el soporte directo de COBYTE.
        </p>
    </div>

    {!products || products.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-gray-100">
        No hay productos disponibles en este momento.
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