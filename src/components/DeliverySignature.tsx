import { useState } from 'react';
import { DeliveryItem } from '../../backend/src/types/delivery';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, FileText, PenTool, Receipt } from 'lucide-react';
import { Badge } from './ui/badge';
import { SignatureCanvas } from './SignatureCanvas';

interface DeliverySignatureProps {
  items: DeliveryItem[];
  onBack: () => void;
  onViewDetails: () => void;
  onSign: () => void;
  currentOrder?: {
    id: string;
    supplier: string;
    invoiceNumber: string;
    deliveryOrderNumber: string;
    orderDate: Date;
  };
}

export function DeliverySignature({ items, onBack, onViewDetails, onSign, currentOrder }: DeliverySignatureProps) {
  const [showSignatureCanvas, setShowSignatureCanvas] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  // Filter items by status
  const varianceItems = items.filter(item => item.status === 'variance' || (item.status === 'rejected' && item.acceptQty > 0));
  const fullyAcceptedItems = items.filter(item => item.status === 'accepted' && item.acceptQty === item.orderQty);
  
  // Group fully accepted items by category
  const acceptedByCategory = fullyAcceptedItems.reduce((acc, item) => {
    const category = item.category.toUpperCase().replace('-', ' ');
    if (!acc[category]) {
      acc[category] = { count: 0, totalQty: 0 };
    }
    acc[category].count += 1;
    acc[category].totalQty += item.acceptQty;
    return acc;
  }, {} as Record<string, { count: number; totalQty: number }>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
                  Delivery Signature {currentOrder && `- #${currentOrder.id}`}
                </h1>
                {currentOrder && (
                  <p className="text-blue-100 text-sm mt-1">
                    {currentOrder.supplier} • {currentOrder.orderDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
              <span className="text-sm">🦓 ZEBRA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* View Details Button */}
        <div className="flex justify-center">
          <Button 
            onClick={onViewDetails}
            variant="outline"
            className="w-full max-w-md h-12"
          >
            <FileText className="h-4 w-4 mr-2" />
            View Delivery Order Details
          </Button>
        </div>

        {/* Summary of Accepted Items With Variance */}
        {varianceItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">
                Summary of Accepted Items With Variance Qty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-yellow-400">
                      <th className="text-black font-medium p-3 text-center border-r border-yellow-500">No</th>
                      <th className="text-black font-medium p-3 text-center border-r border-yellow-500">Category</th>
                      <th className="text-black font-medium p-3 text-center border-r border-yellow-500">WRIN</th>
                      <th className="text-black font-medium p-3 text-center border-r border-yellow-500">Description</th>
                      <th className="text-black font-medium p-3 text-center border-r border-yellow-500">Order Qty</th>
                      <th className="text-black font-medium p-3 text-center border-r border-yellow-500">Accept Qty</th>
                      <th className="text-black font-medium p-3 text-center border-r border-yellow-500">Temperature</th>
                      <th className="text-black font-medium p-3 text-center border-r border-yellow-500">Code Date</th>
                      <th className="text-black font-medium p-3 text-center">Reason Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {varianceItems.map((item, index) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-center">{index + 1}</td>
                        <td className="p-3 text-center">{item.category.toUpperCase().replace('-', ' ')}</td>
                        <td className="p-3 text-center font-mono">{item.wrin}</td>
                        <td className="p-3">{item.description}</td>
                        <td className="p-3 text-center">{item.orderQty}</td>
                        <td className="p-3 text-center font-medium">{item.acceptQty}</td>
                        <td className="p-3 text-center">-</td>
                        <td className="p-3 text-center">{item.codeDate}</td>
                        <td className="p-3 text-center">
                          {item.reasonCode && (
                            <Badge variant="outline" className="text-xs">
                              {item.reasonCode}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary of Fully Accepted Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">
              Summary of Fully Accepted Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-yellow-400">
                    <th className="text-black font-medium p-3 text-center border-r border-yellow-500">No</th>
                    <th className="text-black font-medium p-3 text-center border-r border-yellow-500">Category</th>
                    <th className="text-black font-medium p-3 text-center">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(acceptedByCategory).map(([category, data], index) => (
                    <tr key={category} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-center">{index + 1}</td>
                      <td className="p-3 text-center font-medium">{category}</td>
                      <td className="p-3 text-center">{data.count}/{data.totalQty}</td>
                    </tr>
                  ))}
                  {Object.keys(acceptedByCategory).length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-muted-foreground">
                        No fully accepted items
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Signature Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-medium">Delivery Confirmation</h3>
              <p className="text-muted-foreground text-center">
                By signing below, you confirm that the delivery has been received and inspected according to company standards.
              </p>
              
              {/* Signature Area */}
              <div className="w-full max-w-md">
                {signature ? (
                  <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                    <img src={signature} alt="Signature" className="w-full h-32 object-contain" />
                    <div className="flex justify-center mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowSignatureCanvas(true)}
                      >
                        Edit Signature
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setShowSignatureCanvas(true)}
                  >
                    <PenTool className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Signature Area</p>
                    <p className="text-xs text-gray-400 mt-1">Tap to sign digitally</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 w-full max-w-md">
                <Button variant="outline" onClick={onBack} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={onSign} 
                  disabled={!signature}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Sign & Complete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <SignatureCanvas
          isOpen={showSignatureCanvas}
          onClose={() => setShowSignatureCanvas(false)}
          onSave={setSignature}
        />
      </div>
    </div>
  );
}