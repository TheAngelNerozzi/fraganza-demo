import { useState } from "react";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, MessageCircle, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(12);
  const { toast } = useToast();

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 12 && num <= 500) {
      setQuantity(num);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 500) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 12) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast({
      title: "Agregado al carrito",
      description: `${quantity} unidades de ${product.name}`,
    });
  };

  const handleWhatsAppOrder = () => {
    const message = `¡Hola Natacha! Me interesa el perfume: ${product.name} - Cantidad: ${quantity} unidades`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/584241234567?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <Card className="group hover:shadow-premium transition-all duration-300 bg-card border-gold/20 overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-2 right-2 bg-gradient-gold text-white"
        >
          ${product.price}
        </Badge>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Agotado</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-muted-foreground text-sm mb-3">
            {product.description}
          </p>
        )}

        {/* Quantity Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Cantidad (mín. 12 - máx. 500)
          </label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gold/30"
              onClick={decrementQuantity}
              disabled={quantity <= 12}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <Input
              type="number"
              min="12"
              max="500"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="text-center border-gold/30 w-20"
            />
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gold/30"
              onClick={incrementQuantity}
              disabled={quantity >= 500}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="text-right">
            <span className="text-lg font-bold text-gold">
              Total: ${totalPrice}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 bg-gradient-gold hover:bg-gradient-premium text-white shadow-elegant"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar
        </Button>
        
        <Button
          onClick={handleWhatsAppOrder}
          disabled={!product.inStock}
          variant="outline"
          className="flex-1 border-gold text-gold hover:bg-gold hover:text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}