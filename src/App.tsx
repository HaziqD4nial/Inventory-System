import { useState, useEffect } from 'react';
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
import { toast, Toaster } from 'sonner';
import { fetchDeliveries, createDelivery, fetchDeliveryById } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'overview' | 'details' | 'signature' | 'category-details'>('home');
  const [selectedCategory, setSelectedCategory] = useState('frozen-products');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [items, setItems] = useState<DeliveryItem[]>(deliveryItems);
  const [editingItem, setEditingItem] = useState<DeliveryItem | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      setLoading(true);
      const data = await fetchDeliveries();
      const formattedOrders = data.map((d: any) => ({
        ...d,
        deliveryDate: new Date(d.DeliveryDate),
        id: d.DeliveryID ? d.DeliveryID.toString() : 'DEL-XXX',
        supplier: d.SupplierName || 'Unknown Supplier',
        invoiceNumber: d.InvoiceNo,
        deliveryOrderNumber: d.DONumber,
        status: d.Status ? d.Status.toLowerCase().replace(' ', '_') : 'pending',
        priority: 'medium',
        totalItems: 0,
        acceptedItems: 0,
        rejectedItems: 0,
        category: 'frozen-products',
        orderDate: new Date() // fallback
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.error('Failed to load deliveries', error);
      toast.error('Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  const currentOrder = selectedOrder ? orders.find(o => o.id === selectedOrder) : undefined;

  const currentOrderInfo = currentOrder ? {
    id: currentOrder.id,
    supplier: currentOrder.supplier,
    invoiceNumber: currentOrder.invoiceNumber,
    deliveryOrderNumber: currentOrder.deliveryOrderNumber,
    orderDate: currentOrder.orderDate
  } : undefined;

  const filteredItems = items.filter(item => item.category === selectedCategory);
  const totalItems = filteredItems.length;
  const acceptedItems = filteredItems.filter(item => item.status === 'accepted').length;
  const rejectedItems = filteredItems.filter(item => item.status === 'rejected').length;

  const handleUpdateItem = (itemId: string, updates: Partial<DeliveryItem>) => {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    ));
    setHasChanges(true);

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

  const handleSelectOrder = async (orderId: string) => {
    try {
      setLoading(true);
      const orderDetails = await fetchDeliveryById(orderId);

      // Map API response to internal types
      const mappedOrder: DeliveryOrder = {
        ...orderDetails,
        deliveryDate: new Date(orderDetails.DeliveryDate),
        id: orderDetails.DeliveryID.toString(),
        supplier: orderDetails.SupplierName,
        invoiceNumber: orderDetails.InvoiceNo,
        deliveryOrderNumber: orderDetails.DONumber,
        status: orderDetails.Status ? orderDetails.Status.toLowerCase().replace(' ', '_') : 'pending',
        priority: 'medium',
        totalItems: orderDetails.items ? orderDetails.items.length : 0,
        acceptedItems: 0,
        rejectedItems: 0,
        category: 'frozen-products', // default or derived
        orderDate: new Date()
      };

      // Map items
      const mappedItems: DeliveryItem[] = (orderDetails.items || []).map((item: any) => ({
        id: item.AssetID.toString(),
        description: item.AssetName,
        quantity: 1, // Assets are individual items usually
        category: 'frozen-products',
        status: item.Status === 'Available' ? 'pending' : item.Status.toLowerCase(),
        temperature: 0,
        humidity: 0,
        requiredTemp: -18,
        requiredHumidity: 45
      }));

      setSelectedOrder(orderId);
      setItems(mappedItems);
      setCurrentView('details');
      // Update selected category if needed based on order contents or metadata
      // setSelectedCategory(...)
    } catch (error) {
      console.error('Failed to load delivery details', error);
      toast.error('Failed to load delivery details');
    } finally {
      setLoading(false);
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
    if (selectedOrder) {
      setCurrentView('details');
    } else {
      setCurrentView('home');
    }
  };

  const handleViewCategoryDetailsFromHome = () => {
    setCurrentView('category-details');
  };

  const handleAddDelivery = async () => {
    console.log('Add Delivery button clicked');
    const newDelivery = {
      InvoiceNo: `INV-${Date.now()}`,
      DONumber: `DO-${Date.now()}`,
      SupplierID: 1,
      DriverName: 'New Driver',
      DeliveryDate: new Date().toISOString().split('T')[0]
    };
    try {
      console.log('Sending delivery data:', newDelivery);
      await createDelivery(newDelivery);
      console.log('Delivery created successfully');
      toast.success('New delivery created');
      loadDeliveries();
    } catch (e: any) {
      console.error('Error creating delivery:', e);
      toast.error(`Failed to create delivery: ${e.message}`);
    }
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
        <DeliveryOverview
          orders={orders}
          onSelectOrder={handleSelectOrder}
          onBackToHome={handleBackToHome}
          onAddDelivery={handleAddDelivery}
        />
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
        <Toaster position="top-right" richColors />
      </div>
    </ErrorBoundary>
  );
}