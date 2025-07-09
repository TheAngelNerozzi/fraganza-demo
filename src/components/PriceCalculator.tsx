import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign } from "lucide-react";

interface PriceCalculatorProps {
  totalUSD: number;
}

export function PriceCalculator({ totalUSD }: PriceCalculatorProps) {
  const [exchangeRate, setExchangeRate] = useState(36.50); // Tasa BCV aproximada

  const totalBs = (totalUSD * exchangeRate).toFixed(2);

  return (
    <Card className="bg-gradient-elegant border-gold/20 shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-gold">
          <Calculator className="w-5 h-5" />
          Calculadora de Precios
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-foreground">
              Total USD
            </Label>
            <div className="text-2xl font-bold text-gold flex items-center">
              <DollarSign className="w-5 h-5" />
              {totalUSD.toFixed(2)}
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-foreground">
              Tasa BCV
            </Label>
            <Input
              type="number"
              step="0.01"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 0)}
              className="text-lg font-semibold border-gold/30"
            />
          </div>
        </div>
        
        <div className="pt-2 border-t border-gold/20">
          <Label className="text-sm font-medium text-foreground">
            Total en Bolívares
          </Label>
          <div className="text-3xl font-bold text-gold">
            Bs. {totalBs.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </div>
        
        <div className="bg-champagne/30 p-3 rounded-lg text-sm text-muted-foreground">
          💡 La tasa BCV se actualiza diariamente. Puedes editarla manualmente.
        </div>
      </CardContent>
    </Card>
  );
}