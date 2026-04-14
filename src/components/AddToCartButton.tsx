"use client";

import { useStore, Product } from "@/store/useStore";

export function AddToCartButton({ product, className }: { product: Product, className?: string }) {
  const { addToCart } = useStore();

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
      }}
      className={`text-xs uppercase tracking-widest font-semibold text-tea-dark group-hover:text-tea-green transition-colors ${className}`}
    >
      Add to Cart &rarr;
    </button>
  );
}
