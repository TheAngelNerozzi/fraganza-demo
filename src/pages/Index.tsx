import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CartProvider } from "@/components/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { CartSummary } from "@/components/CartSummary";
import { PriceCalculator } from "@/components/PriceCalculator";
import { useCart } from "@/components/CartContext";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-perfume.jpg";

function MainContent() {
  const { addItem, getTotalPrice } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        {/* Hero Section */}
        <section className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-elegant shadow-premium">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
          <img
            src={heroImage}
            alt="Fraganza - Perfumes de Aceite"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center px-8">
            <div className="text-white max-w-lg">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Fraganza</h1>
              <p className="text-xl md:text-2xl mb-2 text-gold-light">Perfumes de Aceite Premium</p>
              <p className="text-lg opacity-90">Inspirados en las mejores fragancias del mundo</p>
              <Badge className="mt-4 bg-gradient-gold text-white px-4 py-2 text-sm">
                Desde $2.50 por unidad
              </Badge>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addItem} />
            ))}
          </div>
        </section>

        {/* Cart */}
        <section id="carrito" className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartSummary />
            </div>
            <div>
              <PriceCalculator totalUSD={getTotalPrice()} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const Index = () => {
  return (
    <CartProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <SidebarTrigger className="fixed top-4 left-4 z-50 bg-gradient-gold text-white" />
          <MainContent />
        </div>
      </SidebarProvider>
    </CartProvider>
  );
};

export default Index;
