import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export function CategorySidebar({ categories, selectedCategory, onCategorySelect }: CategorySidebarProps) {
  return (
    <Card className="w-64 h-full">
      <div className="p-4 border-b">
        <h2>Menu Categories</h2>
      </div>
      
      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="p-2 space-y-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="w-full justify-start h-12 text-left"
              onClick={() => onCategorySelect(category.id)}
            >
              <span className="mr-3 text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}