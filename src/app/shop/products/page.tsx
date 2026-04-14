

"use client";

import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useEffect, useState, useMemo } from "react";
import { getProductsFromDB, seedInitialProducts } from "@/lib/firebase/products";
import { getCategoriesFromDB } from "@/lib/firebase/categories";
import { INITIAL_PRODUCTS } from "@/store/useStore";

export default function Products() {
  const {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    addToCart,
    setProducts,
    setCategories
  } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [docs, catDocs] = await Promise.all([
          getProductsFromDB(),
          getCategoriesFromDB()
        ]);
        
        // Products setup
        let fetchedProducts = docs;
        if (fetchedProducts.length === 0) {
          console.log("No products found, seeding DB...");
          await seedInitialProducts(INITIAL_PRODUCTS);
          fetchedProducts = await getProductsFromDB();
        }
        
        // Categories setup - ensure "All" is unshifted
        const dynamicCats = ["All", ...catDocs.map(c => c.name)];
        
        setCategories(dynamicCats);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [setProducts, setCategories]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);
  return (
    <div className="flex flex-col min-h-screen bg-paper selection:bg-tea-light selection:text-tea-dark">
      {/* Page Heading Minimal */}
      <div className="pt-32 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-tea-green font-semibold mb-3">Shop</div>
            <h1 className="font-serif text-5xl md:text-6xl text-tea-dark">Full Collection</h1>
          </div>
          <p className="text-warm-gray max-w-sm md:text-right text-sm">
            Explore our curated selection of premium, ethically sourced loose-leaf teas and matcha. Crafted for moments of pause.
          </p>
        </div>
        <div className="w-full h-px bg-tea-dark/10 mt-12" />
      </div>

      {/* Main Shop Layout */}
      <main className="flex-1 px-6 md:px-12 pb-24 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-12">

        {/* Sidebar Fillters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-10">
          <div>
            <h3 className="font-serif text-xl text-tea-dark mb-4">Categories</h3>
            <ul className="flex flex-col gap-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm tracking-wide transition-colors ${activeCategory === cat ? 'text-tea-dark font-medium' : 'text-warm-gray hover:text-tea-green'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-tea-dark mb-4">Sort By</h3>
            <select className="w-full bg-transparent border-b border-tea-dark/20 py-2 text-sm text-tea-dark focus:outline-none focus:border-tea-dark cursor-pointer rounded-none">
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <div className="hidden lg:block">
            <h3 className="font-serif text-xl text-tea-dark mb-4">Our Promise</h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              Every blend is thoughtfully sourced in small batches to preserve its natural essence. No artificial flavors, ever.
            </p>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="py-20 text-center text-warm-gray">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-warm-gray">No products found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-[4/5] w-full rounded-none overflow-hidden bg-tea-dark/5 mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-tea-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover Add to Cart Button Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full bg-cream text-tea-dark py-3 text-xs uppercase tracking-widest font-semibold hover:bg-tea-dark hover:text-cream transition-colors shadow-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="text-xs uppercase tracking-widest text-tea-green mb-1.5">{product.category} · {product.origin}</div>
                    <h4 className="font-serif text-2xl text-tea-dark mb-2 group-hover:text-tea-green transition-colors">{product.name}</h4>
                    <div className="mt-auto">
                      <span className="text-tea-dark text-lg font-medium">₹{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-tea-dark py-12 text-center text-cream mt-auto">
        <div className="font-serif text-2xl mb-6 text-tea-light">CHAI WALLAH</div>
        <div className="flex justify-center gap-6 mb-8 text-xs uppercase tracking-widest">
          <a href="#" className="hover:text-tea-light transition-colors">Instagram</a>
          <a href="#" className="hover:text-tea-light transition-colors">Journal</a>
          <a href="#" className="hover:text-tea-light transition-colors">Stockists</a>
        </div>
        <p className="text-xs text-cream/50">&copy; {new Date().getFullYear()} Chai Wallah. Crafted with care.</p>
      </footer>
    </div>
  );
}