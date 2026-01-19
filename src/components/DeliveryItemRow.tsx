import { DeliveryItem } from '../../backend/src/types/delivery';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Check, X, Edit3 } from 'lucide-react';
import { reasonCodes } from '../data/deliveryData';

interface DeliveryItemRowProps {
  item: DeliveryItem;
  index: number;
  onUpdateItem: (itemId: string, updates: Partial<DeliveryItem>) => void;
  onEdit: (item: DeliveryItem) => void;
}

export function DeliveryItemRow({ item, index, onUpdateItem, onEdit }: DeliveryItemRowProps) {
  const getStatusColor = (status: DeliveryItem['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 border-green-300';
      case 'rejected':
        return 'bg-red-100 border-red-300';
      case 'variance':
        return 'bg-yellow-100 border-yellow-300';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleAcceptQtyChange = (value: string) => {
    const acceptQty = parseInt(value) || 0;
    let newStatus: DeliveryItem['status'] = 'pending';
    
    if (acceptQty === 0) {
      newStatus = 'rejected';
    } else if (acceptQty === item.orderQty) {
      newStatus = 'accepted';
    } else {
      newStatus = 'variance';
    }

    onUpdateItem(item.id, { 
      acceptQty, 
      status: newStatus,
      reasonCode: acceptQty === 0 ? item.reasonCode || 'SHORT' : ''
    });
  };

  const handleReasonCodeChange = (reasonCode: string) => {
    onUpdateItem(item.id, { reasonCode });
  };

  return (
    <tr className={`border-b hover:bg-gray-50 ${getStatusColor(item.status)}`}>
      <td className="p-3 text-center">{index + 1}</td>
      <td className="p-3 font-mono text-sm">{item.wrin}</td>
      <td className="p-3 font-medium">{item.description}</td>
      <td className="p-3 text-center text-sm">{item.casePack}</td>
      <td className="p-3 text-center text-sm">{item.uom}</td>
      <td className="p-3 text-center font-medium">{item.orderQty}</td>
      <td className="p-3">
        <div className="flex items-center justify-center">
          <Input
            type="number"
            value={item.acceptQty}
            onChange={(e) => handleAcceptQtyChange(e.target.value)}
            className="w-16 text-center h-8"
            min="0"
            max={item.orderQty}
          />
        </div>
      </td>
      <td className="p-3 text-center text-sm">{item.codeDate}</td>
      <td className="p-3">
        {item.status === 'rejected' || item.status === 'variance' ? (
          <Select value={item.reasonCode} onValueChange={handleReasonCodeChange}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {reasonCodes.map((reason) => (
                <SelectItem key={reason.code} value={reason.code}>
                  {reason.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <span className="text-xs text-gray-500">-</span>
        )}
      </td>
      <td className="p-3">
        <div className="flex items-center justify-center gap-2">
          {item.status === 'accepted' ? (
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          ) : item.status === 'rejected' ? (
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <X className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="h-8 px-3"
          >
            <Edit3 className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
      </td>
    </tr>
  );
}