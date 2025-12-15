import { Button } from './ui/button';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';

interface DeliveryFooterProps {
  onBack: () => void;
  onSave: () => void;
  onComplete: () => void;
  totalItems: number;
  acceptedItems: number;
  rejectedItems: number;
  hasChanges: boolean;
}

export function DeliveryFooter({ 
  onBack, 
  onSave, 
  onComplete,
  totalItems,
  acceptedItems,
  rejectedItems,
  hasChanges
}: DeliveryFooterProps) {
  const pendingItems = totalItems - acceptedItems - rejectedItems;

  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-blue-700 h-10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Delivery Order Info
            </Button>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span>Accepted: {acceptedItems}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span>Rejected: {rejectedItems}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span>Pending: {pendingItems}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <Button
                variant="secondary"
                onClick={onSave}
                className="h-10"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
            
            <Button
              onClick={onComplete}
              disabled={pendingItems > 0}
              className="h-10 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Delivery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}