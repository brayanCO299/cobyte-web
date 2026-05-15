import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import { Smartphone, Headphones, Laptop, Music, PackageSearch } from 'lucide-react';

// 1. Diccionario de categorías dinámicas de COBYTE
const categoryConfig = {
celulares: { title: 'Celulares y Smartphones', icon: <Smartphone size={32} className="text-blue-600" /> },
audio: { title: 'Audio y Parlantes JBL', icon: <Headphones size={32} className="text-blue-600" /> },
tecnologia: { title: 'Computo y Tecnología', icon: <Laptop size={32} className="text-blue-600" /> },
musica: { title: 'Instrumentos Musicales', icon: <Music size={32} className="text-blue-600" /> },
};

// 1. Tipamos 'params' como una Promesa que contiene el slug
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {

  // 2. Esperamos (await) a que Next.js resuelva los parámetros de la URL
const resolvedParams = await params;

  // 3. Ahora sí podemos extraer el texto seguro y pasarlo a minúsculas
const slug = resolvedParams.slug.toLowerCase();

  // ... (el resto de tu código de categoryConfig y Supabase queda exactamente igual)

if (!categoryConfig[slug as keyof typeof categoryConfig]) {
    notFound();
}

const { title, icon } = categoryConfig[slug as keyof typeof categoryConfig];

  // 2. Cliente de Supabase Seguro
const cookieStore = await cookies();
const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
    cookies: {
        get(name: string) {
        return cookieStore.get(name)?.value;
        },
    },
    }
);

  // 3. Consulta SQL dinámica
const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', slug) 
    .eq('is_active', true)
    .order('created_at', { ascending: false });

if (error) {
    console.error('Error cargando categoría:', error);
}

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh] transition-colors duration-300">
    
    <div className="mb-10 flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="p-4 bg-blue-50 dark:bg-gray-900 rounded-2xl">
        {icon}
        </div>
        <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Encuentra los mejores productos disponibles en Bagua.
        </p>
        </div>
    </div>

    {!products || products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800">
        <PackageSearch size={64} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Aún no hay productos aquí</h3>
        <p className="text-gray-500 mt-2 text-center max-w-md">
            Estamos actualizando nuestro catálogo de {title}. ¡Vuelve pronto!
        </p>
        </div>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
        ))}
        </div>
    )}
    </div>
);
}