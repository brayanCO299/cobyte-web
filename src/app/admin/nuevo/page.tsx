'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Upload, Save, ArrowLeft, PackagePlus } from 'lucide-react';
import Link from 'next/link';

// Configuración directa de Supabase (Cliente)
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NuevoProducto() {
const router = useRouter();
const [loading, setLoading] = useState(false);
const [imageFile, setImageFile] = useState<File | null>(null);
const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'celulares', // Por defecto
    stock: '10'
});

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
    let image_url = '';

      // 1. Subida de imagen al Bucket 'productos'
    if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
        .from('productos')
        .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
        .from('productos')
        .getPublicUrl(filePath);
        
        image_url = publicUrlData.publicUrl;
    }

      // 2. Insertar en la tabla 'products' (como verificamos antes)
    const { error: insertError } = await supabase
        .from('products') 
        .insert([{
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image_url,
        is_active: true
        }]);

    if (insertError) throw insertError;

    alert('¡Producto registrado con éxito en COBYTE!');
      router.push('/admin'); // Regresa al panel
    router.refresh();

    } // Modifica tu bloque catch para que se vea así:
catch (err: any) {
  // Desenmascaramos el error real
console.error("Detalle completo del error:", JSON.stringify(err, null, 2));
console.error("Mensaje directo:", err.message);

alert(`Fallo en el servidor: ${err.message || 'Revisa la consola'}`);
}
};

return (
    <div className="max-w-3xl mx-auto px-4 py-12">
    <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft size={20} /> Volver al panel
    </Link>

    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <PackagePlus className="text-blue-600" size={28} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Nuevo Artículo</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre y Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nombre del producto</label>
            <input 
                required
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: iPhone 15 Pro Max"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            </div>
            <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Categoría</label>
            <select 
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
                <option value="celulares">Celulares</option>
                <option value="audio">Audio / Parlantes</option>
                <option value="tecnologia">Tecnología</option>
                <option value="musica">Música</option>
            </select>
            </div>
        </div>

          {/* Precio y Stock */}
        <div className="grid grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Precio (S/)</label>
            <input 
                type="number" required
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
            </div>
            <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Stock disponible</label>
            <input 
                type="number" required
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="10"
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
            </div>
        </div>
        {/* Descripción detallada */}
<div>
<label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
    Descripción del producto
</label>
<textarea 
    required
    rows={4}
    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
    placeholder="Ej: iPhone 15 Pro de 256GB, color Titanio Natural. Incluye cable original y garantía de 1 año..."
    onChange={(e) => setFormData({...formData, description: e.target.value})}
></textarea>
</div>

          {/* Imagen */}
        <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Imagen del producto</label>
            <div className="relative group border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
            <Upload className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2" size={32} />
            <p className="text-sm text-gray-500">
                {imageFile ? imageFile.name : "Haz clic o arrastra una imagen aquí"}
            </p>
            </div>
        </div>

          {/* Botón Guardar */}
        <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
            {loading ? "Registrando..." : <><Save size={20} /> Guardar Producto</>}
        </button>
        </form>
    </div>
    </div>
);
}