"use client";

import { useEffect, useState } from "react";
import { getCategoriesFromDB, addCategory, deleteCategory, Category } from "@/lib/firebase/categories";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategoriesFromDB();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    
    setIsAdding(true);
    try {
      const newCat = await addCategory(newCatName.trim());
      setCategories(prev => [...prev, newCat].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCatName("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category? (Products with this category won't be deleted, but they'll keep the category name string).")) return;
    
    try {
      await deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="p-10 flex-1 flex flex-col items-start w-full animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      <div className="flex justify-between items-end w-full mb-12">
        <div>
          <h1 className="font-serif text-4xl text-tea-dark mb-2">Categories</h1>
          <p className="text-warm-gray text-sm">Manage the dynamic categories for your storefront filters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
        
        {/* Add Category Form */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white/60 backdrop-blur-xl border border-tea-dark/10 rounded-sm shadow-sm p-6">
            <h3 className="font-serif text-xl text-tea-dark mb-4">Add New</h3>
            <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="catName" className="text-[10px] uppercase tracking-widest font-semibold text-tea-dark">Category Name</label>
                <input 
                  type="text" 
                  id="catName"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Wellness Blends"
                  required
                  className="w-full bg-transparent border-b border-tea-dark/20 py-2 text-sm text-tea-dark focus:outline-none focus:border-tea-green transition-colors placeholder:text-warm-gray/50"
                />
              </div>
              <button 
                type="submit"
                disabled={isAdding || !newCatName.trim()}
                className="w-full mt-2 bg-tea-dark text-cream py-3 text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? "Adding..." : "Add Category"}
              </button>
            </form>
          </div>
          
          <div className="text-xs text-warm-gray leading-relaxed p-4 bg-tea-green/5 border border-tea-green/20 rounded-sm">
            <p className="font-semibold mb-1 text-tea-dark">Note on "All"</p>
            <p>The "All" category is automatically injected on the storefront. You do not need to add it here.</p>
          </div>
        </div>

        {/* Categories List */}
        <div className="md:col-span-2">
          <div className="w-full bg-white border border-tea-dark/10 rounded-sm shadow-sm overflow-hidden min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-tea-dark/5 text-xs uppercase tracking-wider text-warm-gray font-semibold border-b border-tea-dark/10">
                  <th className="px-6 py-4 font-medium">Category Name</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tea-dark/5 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-12 text-center text-warm-gray">Loading categories...</td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-12 text-center text-warm-gray">No custom categories found. Add one on the left.</td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-tea-dark/[0.02] transition-colors group">
                      <td className="px-6 py-4 font-serif text-tea-dark font-medium text-base">{cat.name}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="text-xs uppercase tracking-widest text-red-500 hover:text-red-700 font-semibold transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
