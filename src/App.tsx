import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { DeliveryHeader } from './components/DeliveryHeader';
import { DeliveryTable } from './components/DeliveryTable';
import { DeliveryFooter } from './components/DeliveryFooter';
import { EditItemDialog } from './components/EditItemDialog';
import { DeliveryOverview } from './components/DeliveryOverview';
import { DeliverySignature } from './components/DeliverySignature';
import { CategoryDetails } from './components/CategoryDetails';
import { ErrorBoundary } from './components/ErrorBoundary';
import { deliveryItems, deliveryCategories } from './data/deliveryData';
import { DeliveryItem, DeliveryOrder } from '../backend/src/types/delivery';
import { toast } from 'sonner';

// Mock delivery orders for the overview
const mockDeliveryOrders: DeliveryOrder[] = [
  {
    id: 'DEL-001',
    supplier: 'Fresh Foods Distributor',
    deliveryDate: new Date(),
    orderDate: new Date(Date.now() - 172800000), // 2 days ago
    invoiceNumber: 'INV-FFD-2024-001',
    deliveryOrderNumber: 'DO-FFD-240103',
    category: 'frozen-products',
    items: deliveryItems.filter(item => item.category === 'frozen-products'),
    status: 'in_progress',
    totalItems: 5,
    acceptedItems: 2,
    rejectedItems: 2,
    driverName: 'Mike Johnson',
    vehicleNumber: 'FFD-2024',
    priority: 'high',
  },
  {
    id: 'DEL-002', 
    supplier: 'Dairy Express',
    deliveryDate: new Date(Date.now() + 86400000), // Tomorrow
    orderDate: new Date(Date.now() - 86400000), // Yesterday
    invoiceNumber: 'INV-DE-2024-089',
    deliveryOrderNumber: 'DO-DE-240104',
    category: 'dairy-products',
    items: deliveryItems.filter(item => item.category === 'dairy-products'),
    status: 'pending',
    totalItems: 2,
    acceptedItems: 0,
    rejectedItems: 0,
    driverName: 'Sarah Williams',
    vehicleNumber: 'DE-5671',
    estimatedArrival: new Date(Date.now() + 86400000 - 3600000),
    priority: 'medium',
  },
  {
    id: 'DEL-003',
    supplier: 'Premium Produce Co.',
    deliveryDate: new Date(Date.now() + 3600000), // 1 hour from now
    orderDate: new Date(Date.now() - 43200000), // 12 hours ago
    invoiceNumber: 'INV-PPC-2024-567',
    deliveryOrderNumber: 'DO-PPC-240103',
    category: 'fresh-produce',
    items: deliveryItems.filter(item => item.category === 'fresh-produce'),
    status: 'pending',
    totalItems: 8,
    acceptedItems: 0,
    rejectedItems: 0,
    driverName: 'Carlos Rodriguez',
    vehicleNumber: 'PPC-1834',
    estimatedArrival: new Date(Date.now() + 3600000 - 900000), // 45 min from now
    priority: 'urgent',
  },
  {
    id: 'DEL-004',
    supplier: 'Beverage Solutions Inc.',
    deliveryDate: new Date(Date.now() + 7200000), // 2 hours from now
    orderDate: new Date(Date.now() - 259200000), // 3 days ago
    invoiceNumber: 'INV-BSI-2024-234',
    deliveryOrderNumber: 'DO-BSI-240101',
    category: 'beverages',
    items: deliveryItems.filter(item => item.category === 'beverages'),
    status: 'pending',
    totalItems: 4,
    acceptedItems: 0,
    rejectedItems: 0,
    driverName: 'David Kim',
    vehicleNumber: 'BSI-9922',
    estimatedArrival: new Date(Date.now() + 7200000 - 1800000), // 1.5 hours from now
    priority: 'low',
  },
  {
    id: 'DEL-005',
    supplier: 'Wholesale Goods Network',
    deliveryDate: new Date(Date.now() + 10800000), // 3 hours from now
    orderDate: new Date(Date.now() - 345600000), // 4 days ago
    invoiceNumber: 'INV-WGN-2024-445',
    deliveryOrderNumber: 'DO-WGN-231230',
    category: 'dry-goods',
    items: deliveryItems.filter(item => item.category === 'dry-goods'),
    status: 'pending',
    totalItems: 12,
    acceptedItems: 0,
    rejectedItems: 0,
    driverName: 'Anna Thompson',
    vehicleNumber: 'WGN-4455',
    estimatedArrival: new Date(Date.now() + 10800000 - 1800000), // 2.5 hours from now
    priority: 'medium',
  },
  {
    id: 'DEL-006',
    supplier: 'Elite Supply Chain',
    deliveryDate: new Date(Date.now() + 5400000), // 1.5 hours from now
    orderDate: new Date(Date.now() - 21600000), // 6 hours ago
    invoiceNumber: 'INV-ESC-2024-778',
    deliveryOrderNumber: 'DO-ESC-240103',
    category: 'cleaning-supplies',
    items: deliveryItems.filter(item => item.category === 'cleaning-supplies'),
    status: 'pending',
    totalItems: 3,
    acceptedItems: 0,
    rejectedItems: 0,
    driverName: 'Robert Martinez',
    vehicleNumber: 'ESC-7788',
    estimatedArrival: new Date(Date.now() + 5400000 - 600000), // 1 hour 20 mins from now
    priority: 'high',
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'overview' | 'details' | 'signature' | 'category-details'>('home');
  const [selectedCategory, setSelectedCategory] = useState('frozen-products');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [items, setItems] = useState<DeliveryItem[]>(deliveryItems);
  const [editingItem, setEditingItem] = useState<DeliveryItem | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Get current order details
  const currentOrder = selectedOrder ? mockDeliveryOrders.find(o => o.id === selectedOrder) : undefined;
  const currentOrderInfo = currentOrder ? {
    id: currentOrder.id,
    supplier: currentOrder.supplier,
    invoiceNumber: currentOrder.invoiceNumber,
    deliveryOrderNumber: currentOrder.deliveryOrderNumber,
    orderDate: currentOrder.orderDate
  } : undefined;

  // Filter items based on selected category
  const filteredItems = items.filter(item => item.category === selectedCategory);
  
  // Calculate stats
  const totalItems = filteredItems.length;
  const acceptedItems = filteredItems.filter(item => item.status === 'accepted').length;
  const rejectedItems = filteredItems.filter(item => item.status === 'rejected').length;

  const handleUpdateItem = (itemId: string, updates: Partial<DeliveryItem>) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
    setHasChanges(true);
    
    // Show appropriate toast based on status
    const updatedItem = items.find(item => item.id === itemId);
    if (updatedItem && updates.status) {
      switch (updates.status) {
        case 'accepted':
          toast.success(`${updatedItem.description} accepted`);
          break;
        case 'rejected':
          toast.error(`${updatedItem.description} rejected`);
          break;
        case 'variance':
          toast.warning(`${updatedItem.description} accepted with variance`);
          break;
      }
    }
  };

  const handleSave = () => {
    // Simulate saving to backend
    setTimeout(() => {
      toast.success('Changes saved successfully');
      setHasChanges(false);
    }, 500);
  };

  const handleComplete = () => {
    if (totalItems - acceptedItems - rejectedItems > 0) {
      toast.error('Please process all items before completing delivery');
      return;
    }
    
    // Go to signature screen instead of completing immediately
    setCurrentView('signature');
  };

  const handleSignComplete = () => {
    toast.success('Delivery signed and completed successfully');
    setCurrentView('home');
    setSelectedOrder(null);
    setHasChanges(false);
  };

  const handleViewOrderDetails = () => {
    setCurrentView('details');
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrder(orderId);
    setCurrentView('details');
    const order = mockDeliveryOrders.find(o => o.id === orderId);
    if (order) {
      setSelectedCategory(order.category);
    }
  };

  const handleBackToOverview = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    setCurrentView('overview');
    setSelectedOrder(null);
    setHasChanges(false);
  };

  const handleNavigateToDelivery = () => {
    setCurrentView('overview');
  };

  const handleBackToHome = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    setCurrentView('home');
    setSelectedOrder(null);
    setHasChanges(false);
  };

  const handleViewCategoryDetails = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('category-details');
  };

  const handleBackFromCategoryDetails = () => {
    // Check if we came from delivery details or home
    if (selectedOrder) {
      setCurrentView('details');
    } else {
      setCurrentView('home');
    }
  };

  const handleViewCategoryDetailsFromHome = () => {
    setCurrentView('category-details');
  };

  if (currentView === 'home') {
    return (
      <ErrorBoundary>
        <HomePage onNavigateToDelivery={handleNavigateToDelivery} onViewCategoryDetails={handleViewCategoryDetailsFromHome} />
      </ErrorBoundary>
    );
  }

  if (currentView === 'overview') {
    return (
      <ErrorBoundary>
        <DeliveryOverview orders={mockDeliveryOrders} onSelectOrder={handleSelectOrder} onBackToHome={handleBackToHome} />
      </ErrorBoundary>
    );
  }

  if (currentView === 'signature') {
    return (
      <ErrorBoundary>
        <DeliverySignature
          items={items}
          onBack={() => setCurrentView('details')}
          onViewDetails={handleViewOrderDetails}
          onSign={handleSignComplete}
          currentOrder={currentOrder}
        />
      </ErrorBoundary>
    );
  }

  if (currentView === 'category-details') {
    return (
      <ErrorBoundary>
        <CategoryDetails
          categoryId={selectedCategory}
          onBack={handleBackFromCategoryDetails}
          onSelectCategory={setSelectedCategory}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-gray-100">
        <DeliveryHeader
          selectedCategory={selectedCategory}
          categories={deliveryCategories}
          onCategoryChange={setSelectedCategory}
          onBack={handleBackToOverview}
          onViewCategoryDetails={handleViewCategoryDetails}
          currentOrder={currentOrderInfo}
        />
        
        <DeliveryTable
          items={filteredItems}
          onUpdateItem={handleUpdateItem}
          onEditItem={setEditingItem}
        />
        
        <DeliveryFooter
          onBack={handleBackToOverview}
          onSave={handleSave}
          onComplete={handleComplete}
          totalItems={totalItems}
          acceptedItems={acceptedItems}
          rejectedItems={rejectedItems}
          hasChanges={hasChanges}
        />

        <EditItemDialog
          item={editingItem}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleUpdateItem}
        />
      </div>
    </ErrorBoundary>
  );
}