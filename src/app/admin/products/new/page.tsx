"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addProduct } from "@/lib/firebase/products";
import { getCategoriesFromDB, Category } from "@/lib/firebase/categories";
import { useStore } from "@/store/useStore";

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "", // will be set once fetched
    origin: "",
    price: "",
    image: "/tea_hero.png" // default placeholder
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const catDocs = await getCategoriesFromDB();
        setCategories(catDocs);
        if (catDocs.length > 0) {
          setFormData(prev => ({ ...prev, category: catDocs[0].name }));
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }
    loadCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProduct({
        name: formData.name,
        category: formData.category,
        origin: formData.origin,
        price: parseFloat(formData.price) || 0,
        image: formData.image
      });
      
      router.push("/admin");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex-1 flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto">
      
      <div className="w-full mb-8 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-xs uppercase tracking-widest text-warm-gray font-semibold hover:text-tea-green transition-colors flex items-center gap-2 mb-4">
            ← Back to Inventory
          </Link>
          <h1 className="font-serif text-4xl text-tea-dark mb-2">New Product</h1>
          <p className="text-warm-gray text-sm">Add a new premium tea to your collection.</p>
        </div>
      </div>

      <div className="w-full bg-white/60 backdrop-blur-xl border border-tea-dark/10 rounded-sm shadow-xl shadow-tea-dark/5 p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs uppercase tracking-widest font-semibold text-tea-dark">Product Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Imperial Jasmine Pearls"
                className="w-full bg-transparent border-b border-tea-dark/20 py-3 text-sm text-tea-dark focus:outline-none focus:border-tea-green transition-colors placeholder:text-warm-gray/50"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-xs uppercase tracking-widest font-semibold text-tea-dark">Category</label>
              <select 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-tea-dark/20 py-3 text-sm text-tea-dark focus:outline-none focus:border-tea-green cursor-pointer transition-colors"
                disabled={categories.length === 0}
              >
                {categories.length === 0 && <option value="">Loading...</option>}
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Origin */}
            <div className="flex flex-col gap-2">
              <label htmlFor="origin" className="text-xs uppercase tracking-widest font-semibold text-tea-dark">Origin</label>
              <input 
                type="text" 
                id="origin"
                name="origin"
                required
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g. Fujian, China"
                className="w-full bg-transparent border-b border-tea-dark/20 py-3 text-sm text-tea-dark focus:outline-none focus:border-tea-green transition-colors placeholder:text-warm-gray/50"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="text-xs uppercase tracking-widest font-semibold text-tea-dark">Price (₹)</label>
              <input 
                type="number" 
                id="price"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-transparent border-b border-tea-dark/20 py-3 text-sm text-tea-dark focus:outline-none focus:border-tea-green transition-colors placeholder:text-warm-gray/50"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-xs uppercase tracking-widest font-semibold text-tea-dark">Image URL</label>
            <input 
              type="text" 
              id="image"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="e.g. /tea_hero.png or https://example.com/image.jpg"
              className="w-full bg-transparent border-b border-tea-dark/20 py-3 text-sm text-tea-dark focus:outline-none focus:border-tea-green transition-colors placeholder:text-warm-gray/50"
            />
            <span className="text-[10px] text-warm-gray mt-1">For now, provide a relative path or an absolute external URL.</span>
          </div>

          {/* Image Preview (Optional flair) */}
          {formData.image && (
            <div className="w-full h-48 bg-tea-dark/5 border border-tea-dark/10 rounded-sm overflow-hidden flex items-center justify-center relative">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="max-h-full object-contain mix-blend-multiply opacity-80"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="absolute text-xs font-semibold uppercase tracking-widest text-warm-gray pointer-events-none mix-blend-difference">Image Preview</span>
            </div>
          )}

          {/* Submit */}
          <div className="pt-6 flex justify-end">
            <button 
              type="submit"
              disabled={loading}
              className="bg-tea-dark text-cream px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-black transition-all shadow-xl shadow-tea-dark/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Product..." : "Create Product"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
