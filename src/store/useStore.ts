import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  category: string;
  origin: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  products: Product[];
  categories: string[];
  activeCategory: string;
  cart: CartItem[];
  cartDrawerOpen: boolean;
  
  // Actions
  setActiveCategory: (category: string) => void;
  setCategories: (categories: string[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setProducts: (products: Product[]) => void;
  setCartDrawerOpen: (open: boolean) => void;
}

// Initial Mock Data
export const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Ceremonial Grade Matcha", category: "Matcha", origin: "Uji, Japan", price: 45.00, image: "/tea_hero.png" },
  { id: 2, name: "Signature Earl Grey", category: "Loose Leaf", origin: "Assam, India", price: 28.00, image: "/matcha_tin.png" },
  { id: 3, name: "Jasmine Pearls", category: "Loose Leaf", origin: "Fujian, China", price: 34.00, image: "/tea_hero.png" },
  { id: 4, name: "Roasted Hojicha", category: "Loose Leaf", origin: "Kyoto, Japan", price: 22.00, image: "/matcha_tin.png" },
  { id: 5, name: "Sencha Green", category: "Loose Leaf", origin: "Shizuoka, Japan", price: 26.00, image: "/tea_hero.png" },
  { id: 6, name: "English Breakfast", category: "Loose Leaf", origin: "Blend", price: 20.00, image: "/matcha_tin.png" },
  { id: 7, name: "Chamomile Blossom", category: "Herbal", origin: "Egypt", price: 18.00, image: "/tea_hero.png" },
  { id: 8, name: "Peppermint Leaves", category: "Herbal", origin: "Washington, USA", price: 16.00, image: "/matcha_tin.png" },
  { id: 9, name: "Matcha Whisk (Chasen)", category: "Teaware", origin: "Japan", price: 30.00, image: "/tea_hero.png" },
];

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: [],
      categories: ["All"],
      activeCategory: "All",
      cart: [],
      cartDrawerOpen: false,
      
      setActiveCategory: (category) => set({ activeCategory: category }),
      setCategories: (categories) => set({ categories }),
      setProducts: (products) => set({ products }),
      setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
      
      addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            cartDrawerOpen: true
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }], cartDrawerOpen: true };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        cart: quantity > 0 
          ? state.cart.map(item => item.id === productId ? { ...item, quantity } : item)
          : state.cart.filter(item => item.id !== productId)
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'chai-wallah-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

