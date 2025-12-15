import { Order } from '../types';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, Clock, Receipt } from 'lucide-react';
import { Badge } from './ui/badge';

interface OrderConfirmationProps {
  order: Order;
  onNewOrder: () => void;
}

export function OrderConfirmation({ order, onNewOrder }: OrderConfirmationProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'preparing':
      case 'ready':
        return <Clock className="h-4 w-4" />;
      default:
        return <Receipt className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2>Order Confirmed!</h2>
          <p className="text-muted-foreground">Thank you for your order</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-lg font-mono">{order.id}</p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Badge className={getStatusColor(order.status)}>
              {getStatusIcon(order.status)}
              <span className="ml-1 capitalize">{order.status}</span>
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Order Summary</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>Estimated preparation time: 15-20 minutes</p>
              <p>You will be notified when your order is ready</p>
            </div>

            <Button onClick={onNewOrder} className="w-full">
              Place New Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}