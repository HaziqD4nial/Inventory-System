export interface DeliveryItem {
  id: string;
  wrin: string;
  description: string;
  casePack: string;
  uom: string;
  orderQty: number;
  acceptQty: number;
  codeDate?: string;
  reasonCode?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'variance';
  category: string;
}

export interface DeliveryOrder {
  id: string;
  supplier: string;
  deliveryDate: Date;
  orderDate: Date;
  invoiceNumber: string;
  deliveryOrderNumber: string;
  category: string;
  items: DeliveryItem[];
  status: 'pending' | 'in_progress' | 'completed';
  totalItems: number;
  acceptedItems: number;
  rejectedItems: number;
  supplierLogo?: string;
  driverName?: string;
  vehicleNumber?: string;
  estimatedArrival?: Date;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
}