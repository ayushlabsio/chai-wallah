import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import { INITIAL_PRODUCTS } from "@/store/useStore";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-tea-light selection:text-tea-dark">

      {/* Hero Section */}
      <section className="relative w-full h-[100svh] flex items-center justify-center bg-paper overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 z-0 bg-tea-dark/5" />

        <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-12 z-10 pt-20">

          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-12 md:pt-0 max-w-xl xl:max-w-2xl">
            <h2 className="text-tea-green font-semibold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 md:mb-6 animate-fade-in opacity-80">
              The Essence of Nature
            </h2>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 md:mb-8 text-tea-dark">
              Calm in <br /><span className="italic text-tea-green">every cup</span>.
            </h1>
            <p className="text-warm-gray text-base sm:text-lg mb-8 md:mb-12 max-w-md font-light leading-relaxed">
              Discover our curated selection of premium, ethically sourced matcha and loose-leaf teas designed to elevate your daily rituals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/shop/products" className="bg-tea-dark hover:bg-tea-green text-cream px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-widest text-xs font-semibold group relative overflow-hidden flex items-center justify-center">
                <span className="relative z-10">Explore Blends</span>
                <div className="absolute inset-0 h-full w-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </Link>
              <button className="border border-tea-dark/20 hover:border-tea-dark text-tea-dark px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-widest text-xs font-semibold">
                Our Story
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg md:max-w-xl h-[45vh] md:h-[70vh] relative mt-8 md:mt-0 shadow-2xl shadow-tea-dark/10">
            <div className="absolute inset-0 w-full h-full transform transition-transform duration-1000 hover:scale-[1.02]">
              <Image
                src="/tea_hero.png"
                alt="Premium Matcha in a ceramic cup"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Subtle overlay to soften image slightly */}
            <div className="absolute inset-0 bg-tea-dark/5 mix-blend-multiply pointer-events-none" />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-tea-dark/50">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-8 bg-tea-dark/30" />
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="py-24 bg-paper w-full overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-tea-green font-semibold uppercase tracking-[0.3em] text-xs sm:text-sm mb-2">
              Curated Selection
            </h2>
            <h3 className="font-serif text-4xl sm:text-5xl text-tea-dark">
              Daily Rituals
            </h3>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-10 h-10 rounded-full border border-tea-dark/20 flex items-center justify-center text-tea-dark hover:bg-tea-dark hover:text-cream transition-colors">
              &larr;
            </button>
            <button className="w-10 h-10 rounded-full border border-tea-dark/20 flex items-center justify-center text-tea-dark hover:bg-tea-dark hover:text-cream transition-colors">
              &rarr;
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="w-full pl-6 md:pl-[max(1.5rem,calc((100vw-1536px)/2+1.5rem))]">
          <div className="flex gap-8 overflow-x-auto pb-12 pr-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

            {/* Product Card 1 */}
            <div className="min-w-[300px] w-[300px] sm:min-w-[400px] sm:w-[400px] shrink-0 snap-start group cursor-pointer flex flex-col">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-tea-dark/5 mb-6">
                <Image
                  src="/tea_hero.png"
                  alt="Ceremonial Grade Matcha"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-tea-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <h4 className="font-serif text-2xl text-tea-dark mb-1">Ceremonial Matcha</h4>
                <p className="text-warm-gray text-sm mb-4">First harvest, stone-milled</p>
                <div className="mt-auto flex items-center justify-between border-t border-tea-dark/10 pt-4">
                  <span className="text-tea-dark font-medium">₹45.00</span>
                  <AddToCartButton product={INITIAL_PRODUCTS[0]} />
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="min-w-[300px] w-[300px] sm:min-w-[400px] sm:w-[400px] shrink-0 snap-start group cursor-pointer flex flex-col">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-tea-dark/5 mb-6">
                <Image
                  src="/matcha_tin.png"
                  alt="Signature Earl Grey"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Fallback pattern in case image isn't loaded yet */}
                <div className="absolute inset-0 border border-tea-dark/5 bg-[#ebe6e1] mix-blend-multiply flex items-center justify-center" />
                <div className="absolute inset-0 bg-tea-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <h4 className="font-serif text-2xl text-tea-dark mb-1">Signature Earl Grey</h4>
                <p className="text-warm-gray text-sm mb-4">Bergamot infused black tea</p>
                <div className="mt-auto flex items-center justify-between border-t border-tea-dark/10 pt-4">
                  <span className="text-tea-dark font-medium">₹28.00</span>
                  <AddToCartButton product={INITIAL_PRODUCTS[1]} />
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="min-w-[300px] w-[300px] sm:min-w-[400px] sm:w-[400px] shrink-0 snap-start group cursor-pointer flex flex-col">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-tea-dark/5 mb-6">
                <Image
                  src="/tea_hero.png"
                  alt="Jasmine Pearl Green"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-tea-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <h4 className="font-serif text-2xl text-tea-dark mb-1">Jasmine Pearls</h4>
                <p className="text-warm-gray text-sm mb-4">Hand-rolled green tea</p>
                <div className="mt-auto flex items-center justify-between border-t border-tea-dark/10 pt-4">
                  <span className="text-tea-dark font-medium">₹34.00</span>
                  <AddToCartButton product={INITIAL_PRODUCTS[2]} />
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="min-w-[300px] w-[300px] sm:min-w-[400px] sm:w-[400px] shrink-0 snap-start group cursor-pointer flex flex-col">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-tea-dark/5 mb-6">
                <div className="absolute inset-0 border border-tea-dark/5 bg-tea-light/20 flex items-center justify-center">
                  <div className="font-serif text-tea-dark/40 text-xl">More soon</div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <h4 className="font-serif text-xl text-tea-dark mb-1">View Full Collection</h4>
                <Link href="/shop/products" className="mt-4 px-6 py-2 border border-tea-dark text-tea-dark text-xs uppercase tracking-widest hover:bg-tea-dark hover:text-cream transition-colors">
                  See All
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="collection" className="py-24 md:py-32 bg-tea-dark text-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Uncompromising Quality</h2>
            <div className="w-16 h-[1px] bg-tea-light mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full border border-tea-light/30 flex items-center justify-center mb-6 text-tea-light group-hover:bg-tea-light group-hover:text-tea-dark transition-all duration-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3 text-tea-light">Ethically Sourced</h3>
              <p className="text-cream/70 text-sm leading-relaxed max-w-xs font-light">
                Direct partnerships with independent organic farmers preserving traditional harvesting methods.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full border border-tea-light/30 flex items-center justify-center mb-6 text-tea-light group-hover:bg-tea-light group-hover:text-tea-dark transition-all duration-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3 text-tea-light">Artisan Crafted</h3>
              <p className="text-cream/70 text-sm leading-relaxed max-w-xs font-light">
                Small-batch processing ensures optimal flavor profile and unmatched freshness in every yield.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full border border-tea-light/30 flex items-center justify-center mb-6 text-tea-light group-hover:bg-tea-light group-hover:text-tea-dark transition-all duration-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3 text-tea-light">Mindful Rituals</h3>
              <p className="text-cream/70 text-sm leading-relaxed max-w-xs font-light">
                Elevating your daily routine into a moment of mindful presence and deep tranquility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-paper border-t border-tea-dark/10 py-12 text-center text-tea-dark/60">
        <div className="font-serif text-2xl text-tea-dark mb-6">CHAI WALLAH</div>
        <div className="flex justify-center gap-6 mb-8 text-xs uppercase tracking-widest">
          <a href="#" className="hover:text-tea-dark transition-colors">Instagram</a>
          <a href="#" className="hover:text-tea-dark transition-colors">Journal</a>
          <a href="#" className="hover:text-tea-dark transition-colors">Stockists</a>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Chai Wallah. Crafted with care.</p>
      </footer>
    </div>
  );
}