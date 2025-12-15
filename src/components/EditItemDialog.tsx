import { useState } from 'react';
import { DeliveryItem } from '../types/delivery';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { reasonCodes } from '../data/deliveryData';

interface EditItemDialogProps {
  item: DeliveryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemId: string, updates: Partial<DeliveryItem>) => void;
}

export function EditItemDialog({ item, isOpen, onClose, onSave }: EditItemDialogProps) {
  const [formData, setFormData] = useState<Partial<DeliveryItem>>({});
  const [notes, setNotes] = useState('');

  if (!item) return null;

  const handleSave = () => {
    const acceptQty = formData.acceptQty ?? item.acceptQty;
    let newStatus: DeliveryItem['status'] = 'pending';
    
    if (acceptQty === 0) {
      newStatus = 'rejected';
    } else if (acceptQty === item.orderQty) {
      newStatus = 'accepted';
    } else {
      newStatus = 'variance';
    }

    onSave(item.id, {
      ...formData,
      status: newStatus,
      acceptQty,
    });
    onClose();
    setFormData({});
    setNotes('');
  };

  const handleChange = (field: keyof DeliveryItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Item Details</DialogTitle>
          <DialogDescription>
            Modify the delivery item details below. Changes will be applied to the current delivery.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>WRIN</Label>
              <Input value={item.wrin} disabled className="bg-gray-100" />
            </div>
            <div>
              <Label>UOM</Label>
              <Input value={item.uom} disabled className="bg-gray-100" />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Input value={item.description} disabled className="bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Case Pack</Label>
              <Input value={item.casePack} disabled className="bg-gray-100" />
            </div>
            <div>
              <Label>Order Qty</Label>
              <Input value={item.orderQty} disabled className="bg-gray-100" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Accept Qty</Label>
              <Input
                type="number"
                value={formData.acceptQty ?? item.acceptQty}
                onChange={(e) => handleChange('acceptQty', parseInt(e.target.value) || 0)}
                min="0"
                max={item.orderQty}
              />
            </div>
            <div>
              <Label>Code Date</Label>
              <Input
                type="date"
                value={formData.codeDate ?? item.codeDate ?? ''}
                onChange={(e) => handleChange('codeDate', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Reason Code</Label>
            <Select
              value={formData.reasonCode ?? item.reasonCode ?? ''}
              onValueChange={(value) => handleChange('reasonCode', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NONE">No reason</SelectItem>
                {reasonCodes.map((reason) => (
                  <SelectItem key={reason.code} value={reason.code}>
                    {reason.code} - {reason.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}