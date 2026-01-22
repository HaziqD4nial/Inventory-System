import { ArrowLeft, Info, Receipt, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Category } from '../../backend/src/types/delivery';

interface DeliveryHeaderProps {
  selectedCategory: string;
  categories: Category[];
  onCategoryChange: (category: string) => void;
  onBack: () => void;
  onViewCategoryDetails?: (categoryId: string) => void;
  currentOrder?: {
    id: string;
    supplier: string;
    invoiceNumber: string;
    deliveryOrderNumber: string;
    orderDate: Date;
  };
}

export function DeliveryHeader({
  selectedCategory,
  categories,
  onCategoryChange,
  onBack,
  onViewCategoryDetails,
  currentOrder
}: DeliveryHeaderProps) {
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="flex items-center gap-4 max-w-6xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-blue-700 p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-xl font-medium">
            {currentOrder ? `Delivery #${currentOrder.id}` : 'Category Details'}
          </h1>
          {currentOrder && (
            <p className="text-blue-100 text-sm mt-1">
              {currentOrder.supplier} • Order Date: {currentOrder.orderDate.toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="ml-auto flex items-center">
          <span className="text-sm mr-2"></span>
        </div>
      </div>

      <div className="mt-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">Category</span>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-64 bg-white text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-blue-200 ml-2">
              {currentCategory?.itemCount || 0} items
            </span>
            {onViewCategoryDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewCategoryDetails(selectedCategory)}
                className="text-white hover:bg-blue-700 ml-2"
              >
                <Info className="h-4 w-4 mr-1" />
                Details
              </Button>
            )}
          </div>

          {/* Document Information */}
          {currentOrder && (
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Receipt className="h-3 w-3" />
                <span className="text-blue-200">INV:</span>
                <span className="text-white font-mono">{currentOrder.invoiceNumber}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span className="text-blue-200">DO:</span>
                <span className="text-white font-mono">{currentOrder.deliveryOrderNumber}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}