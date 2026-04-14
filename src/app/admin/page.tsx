"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProductsFromDB, deleteProduct } from "@/lib/firebase/products";
import { Product } from "@/store/useStore";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductsFromDB();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-10 flex-1 flex flex-col items-start w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end w-full mb-12">
        <div>
          <h1 className="font-serif text-4xl text-tea-dark mb-2">Inventory</h1>
          <p className="text-warm-gray text-sm">Manage your store's products, pricing, and availability.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-tea-dark text-cream px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors shadow-lg shadow-tea-dark/20"
        >
          + Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 w-full mb-12">
        <div className="bg-white p-6 rounded-sm shadow-sm border border-tea-dark/5 flex flex-col">
          <span className="text-xs uppercase tracking-widest text-warm-gray font-semibold mb-2">Total Products</span>
          <span className="text-4xl font-serif text-tea-dark">{products.length}</span>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-sm border border-tea-dark/5 flex flex-col">
          <span className="text-xs uppercase tracking-widest text-warm-gray font-semibold mb-2">Total Value</span>
          <span className="text-4xl font-serif text-tea-dark">
            ₹{products.reduce((acc, p) => acc + p.price, 0).toFixed(2)}
          </span>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-sm border border-tea-dark/5 flex flex-col">
          <span className="text-xs uppercase tracking-widest text-warm-gray font-semibold mb-2">Categories</span>
          <span className="text-4xl font-serif text-tea-dark">
            {new Set(products.map(p => p.category)).size}
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="w-full bg-white border border-tea-dark/10 rounded-sm shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-tea-dark/5 text-xs uppercase tracking-wider text-warm-gray font-semibold border-b border-tea-dark/10">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Origin</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tea-dark/5 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-warm-gray">Loading inventory...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-warm-gray">No products found. Add one to get started.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-tea-dark/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-tea-dark/5 rounded-sm overflow-hidden relative shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-serif text-tea-dark font-medium text-base group-hover:text-tea-green transition-colors">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-warm-gray">{product.category}</td>
                    <td className="px-6 py-4 text-warm-gray">{product.origin}</td>
                    <td className="px-6 py-4 font-medium text-tea-dark">₹{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(product.id)}
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
  );
}
