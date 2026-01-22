import { DeliveryOrder } from '../../backend/src/types/delivery';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Package, Truck, Calendar, Building, ArrowLeft, User, Hash, Clock, AlertTriangle, FileText, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeliveryOverviewProps {
  orders: DeliveryOrder[];
  onSelectOrder: (orderId: string) => void;
  onBackToHome?: () => void;
  onAddDelivery?: () => void;
}

export function DeliveryOverview({ orders, onSelectOrder, onBackToHome, onAddDelivery }: DeliveryOverviewProps) {
  const getStatusColor = (status: DeliveryOrder['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: DeliveryOrder['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: DeliveryOrder['priority']) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="h-3 w-3" />;
      case 'high':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBackToHome && (
              <Button
                variant="ghost"
                onClick={onBackToHome}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold mb-2">Delivery Management</h1>
              <p className="text-muted-foreground">Manage incoming deliveries and verify items</p>
            </div>
          </div>
          {onAddDelivery && (
            <Button onClick={onAddDelivery} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Add Delivery
            </Button>
          )}
        </div>

        <div className="grid gap-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {order.supplierLogo && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={order.supplierLogo}
                            alt={`${order.supplier} logo`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.warn('Failed to load supplier logo:', order.supplierLogo);
                              e.currentTarget.parentElement!.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          Delivery #{order.id}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.category.replace('-', ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.priority && (
                        <Badge className={`${getPriorityColor(order.priority)} flex items-center gap-1`}>
                          {getPriorityIcon(order.priority)}
                          {order.priority.toUpperCase()}
                        </Badge>
                      )}
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Document Information Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <Receipt className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Invoice No.</p>
                        <p className="text-sm font-medium text-blue-800">{order.invoiceNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">DO No.</p>
                        <p className="text-sm font-medium text-blue-800">{order.deliveryOrderNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Main Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Supplier</p>
                        <p className="font-medium text-sm">{order.supplier}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Order Date</p>
                        <p className="font-medium text-sm">{order.orderDate.toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">Ordered {Math.ceil((Date.now() - order.orderDate.getTime()) / (1000 * 60 * 60 * 24))} days ago</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Delivery Date</p>
                        <p className="font-medium text-sm">{order.deliveryDate.toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">{order.deliveryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Items</p>
                        <p className="font-medium text-sm">{order.totalItems}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${(order.acceptedItems + order.rejectedItems) / order.totalItems * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">
                            {Math.round((order.acceptedItems + order.rejectedItems) / order.totalItems * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver and Vehicle Info */}
                  {(order.driverName || order.vehicleNumber) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      {order.driverName && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Driver</p>
                            <p className="text-sm font-medium">{order.driverName}</p>
                          </div>
                        </div>
                      )}

                      {order.vehicleNumber && (
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Vehicle</p>
                            <p className="text-sm font-medium">{order.vehicleNumber}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Estimated Arrival */}
                  {order.estimatedArrival && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Estimated Arrival</p>
                          <p className="text-sm font-medium text-blue-800">
                            {order.estimatedArrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            {order.estimatedArrival.toDateString() !== new Date().toDateString() &&
                              ` on ${order.estimatedArrival.toLocaleDateString()}`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span>Accepted: {order.acceptedItems}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span>Rejected: {order.rejectedItems}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span>Pending: {order.totalItems - order.acceptedItems - order.rejectedItems}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => onSelectOrder(order.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {order.status === 'pending' ? 'Start Processing' : 'Continue Processing'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}