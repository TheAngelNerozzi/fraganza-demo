import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Trash2, MessageCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CartSummary() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const [customerData, setCustomerData] = useState({
    name: "",
    cedula: "",
    phone: "",
    address: ""
  });

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 12 && newQuantity <= 500) {
      updateQuantity(productId, newQuantity);
    }
  };

  const generateWhatsAppOrder = () => {
    if (!customerData.name || !customerData.phone) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa al menos tu nombre y teléfono",
        variant: "destructive"
      });
      return;
    }

    const orderDetails = items.map(item => 
      `• ${item.product.name} - ${item.quantity} unidades - $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `¡Hola Natacha! Quiero hacer un pedido:

DATOS DEL CLIENTE:
Nombre: ${customerData.name}
Cédula: ${customerData.cedula}
Teléfono: ${customerData.phone}
Dirección: ${customerData.address}

PRODUCTOS:
${orderDetails}

TOTAL: $${getTotalPrice().toFixed(2)}

¡Espero su confirmación!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/584241234567?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <Card className="bg-gradient-elegant border-gold/20">
        <CardContent className="p-8 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tu carrito está vacío
          </h3>
          <p className="text-muted-foreground">
            Agrega algunos productos para comenzar tu pedido
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <Card className="bg-gradient-elegant border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Mi Carrito ({getTotalItems()} items)
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-destructive border-destructive hover:bg-destructive hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-4 p-3 bg-card rounded-lg border border-gold/10">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{item.product.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ${item.product.price} por unidad
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Label className="text-xs">Cantidad:</Label>
                  <Input
                    type="number"
                    min="12"
                    max="500"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                    className="w-20 h-8 text-sm border-gold/30"
                  />
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item.product.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Separator className="bg-gold/20" />
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gold">
              Total: ${getTotalPrice().toFixed(2)}
            </div>
            <Badge variant="secondary" className="bg-champagne text-foreground">
              {getTotalItems()} productos
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Customer Form */}
      <Card className="bg-gradient-elegant border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Datos del Comprador
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                value={customerData.name}
                onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                className="border-gold/30"
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <Label htmlFor="cedula">Cédula</Label>
              <Input
                id="cedula"
                value={customerData.cedula}
                onChange={(e) => setCustomerData({...customerData, cedula: e.target.value})}
                className="border-gold/30"
                placeholder="V-12345678"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={customerData.phone}
                onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                className="border-gold/30"
                placeholder="0424-1234567"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={customerData.address}
                onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                className="border-gold/30"
                placeholder="Tu dirección"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card className="bg-gradient-elegant border-gold/20">
        <CardHeader>
          <CardTitle>Métodos de Pago</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="bg-champagne/30 p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Pago Móvil</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Realiza tu pago a través de Pago Móvil con los siguientes datos:
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Banco:</strong> Banesco</li>
              <li><strong>Cédula:</strong> V-12345678</li>
              <li><strong>Teléfono:</strong> 0424-1234567</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Order Button */}
      <Button
        onClick={generateWhatsAppOrder}
        className="w-full bg-green-600 hover:bg-green-700 text-white shadow-elegant py-3 text-lg"
        size="lg"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Hacer Pedido por WhatsApp
      </Button>
    </div>
  );
}