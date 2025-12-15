import { CartItem as CartItemType } from '../types';
import { Button } from './ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const totalPrice = product.price * quantity;

  return (
    <div className="flex gap-3 p-3 border-b last:border-b-0">
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)} each</p>
        <p className="font-medium text-sm mt-1">${totalPrice.toFixed(2)}</p>
      </div>
      
      <div className="flex flex-col gap-2 items-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(product.id)}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            className="h-7 w-7 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="text-sm font-medium min-w-[2rem] text-center">
            {quantity}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            className="h-7 w-7 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}