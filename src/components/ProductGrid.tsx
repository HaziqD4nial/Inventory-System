import { Product } from '../../backend/src/types';
import { ProductCard } from './ProductCard';
import { ScrollArea } from './ui/scroll-area';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  categoryName: string;
}

export function ProductGrid({ products, onAddToCart, categoryName }: ProductGridProps) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 border-b">
        <h1>{categoryName}</h1>
        <p className="text-muted-foreground mt-1">
          {products.length} item{products.length !== 1 ? 's' : ''} available
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items available in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}