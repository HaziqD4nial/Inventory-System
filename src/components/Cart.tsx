import { CartItem as CartItemType } from '../../backend/src/types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { CartItem } from './CartItem';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { Separator } from './ui/separator';

interface CartProps {
  items: CartItemType[];
  totalPrice: number;
  totalItems: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function Cart({
  items,
  totalPrice,
  totalItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClearCart,
}: CartProps) {
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + tax;

  return (
    <Card className="w-80 h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <h2>Order Summary</h2>
          {totalItems > 0 && (
            <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add items from the menu to get started
            </p>
          </div>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1">
            <div className="p-1">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={onCheckout} 
                className="w-full h-12"
                disabled={items.length === 0}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Checkout
              </Button>
              
              {items.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={onClearCart}
                  className="w-full"
                >
                  Clear Cart
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </Card>
  );
}