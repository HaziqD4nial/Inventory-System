import { DeliveryItem } from '../types/delivery';
import { DeliveryItemRow } from './DeliveryItemRow';
import { ScrollArea } from './ui/scroll-area';

interface DeliveryTableProps {
  items: DeliveryItem[];
  onUpdateItem: (itemId: string, updates: Partial<DeliveryItem>) => void;
  onEditItem: (item: DeliveryItem) => void;
}

export function DeliveryTable({ items, onUpdateItem, onEditItem }: DeliveryTableProps) {
  const headerStyle = "bg-yellow-400 text-black font-medium p-3 text-center text-sm border-r border-yellow-500 last:border-r-0";

  return (
    <div className="flex-1 bg-white">
      <ScrollArea className="h-full">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className={headerStyle}>No</th>
              <th className={headerStyle}>WRIN</th>
              <th className={headerStyle}>Description</th>
              <th className={headerStyle}>Case Pack</th>
              <th className={headerStyle}>UOM</th>
              <th className={headerStyle}>Order Qty</th>
              <th className={headerStyle}>Accept Qty</th>
              <th className={headerStyle}>Code Date</th>
              <th className={headerStyle}>Reason Code</th>
              <th className={headerStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <DeliveryItemRow
                key={item.id}
                item={item}
                index={index}
                onUpdateItem={onUpdateItem}
                onEdit={onEditItem}
              />
            ))}
          </tbody>
        </table>
        
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found in this category</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}