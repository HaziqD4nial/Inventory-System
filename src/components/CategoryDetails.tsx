import { useState } from 'react';
import { motion } from 'framer-motion';
import { CategoryDetail, categoryDetails, getCategoryById } from '../data/categoryDetails';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import {
  ArrowLeft,
  Thermometer,
  Droplets,
  AlertTriangle,
  Clock,
  Package,
  CheckCircle,
  Info,
  Truck
} from 'lucide-react';

interface CategoryDetailsProps {
  categoryId?: string;
  onBack: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryDetails({ categoryId, onBack, onSelectCategory }: CategoryDetailsProps) {
  const [selectedCategory, setSelectedCategory] = useState(categoryId || categoryDetails[0].id);
  const currentCategory = getCategoryById(selectedCategory);

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Category not found</p>
      </div>
    );
  }

  const getPriorityColor = (priority: CategoryDetail['handlingPriority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPerishabilityColor = (perishability: CategoryDetail['perishability']) => {
    switch (perishability) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-white/10 p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Category Management</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${currentCategory.color} shadow-lg`}>
              <span className="text-2xl">{currentCategory.icon}</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{currentCategory.name}</h2>
              <p className="text-blue-100">{currentCategory.description}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Selector Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2 p-4">
                    {categoryDetails.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className={`w-full justify-start p-3 h-auto ${selectedCategory === category.id
                            ? `bg-gradient-to-r ${category.color} text-white`
                            : ''
                            }`}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            onSelectCategory(category.id);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{category.icon}</span>
                            <div className="text-left">
                              <p className="font-medium">{category.name}</p>
                              <p className="text-xs opacity-80">{category.commonItems.length} items</p>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <Badge className={getPriorityColor(currentCategory.handlingPriority)}>
                    {currentCategory.handlingPriority.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Priority</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="font-medium text-sm">{currentCategory.averageDeliveryTime}</p>
                  <p className="text-xs text-muted-foreground">Avg Processing</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-4 text-center">
                  <Package className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <Badge className={getPerishabilityColor(currentCategory.perishability)}>
                    {currentCategory.perishability.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Perishability</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-4 text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <p className="font-medium text-sm">{currentCategory.commonItems.length}</p>
                  <p className="text-xs text-muted-foreground">Common Items</p>
                </CardContent>
              </Card>
            </div>

            {/* Category Image */}
            {currentCategory.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className={`h-48 bg-gradient-to-r ${currentCategory.bgGradient} flex items-center justify-center`}>
                    <img
                      src={currentCategory.image}
                      alt={currentCategory.name}
                      className="max-h-32 max-w-full object-contain"
                      onError={(e) => {
                        console.warn('Failed to load category image:', currentCategory.image);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Category image loaded successfully');
                      }}
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Detailed Information Tabs */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Tabs defaultValue="requirements" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="storage">Storage</TabsTrigger>
                    <TabsTrigger value="quality">Quality</TabsTrigger>
                    <TabsTrigger value="items">Items</TabsTrigger>
                  </TabsList>

                  <TabsContent value="requirements" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Thermometer className="h-4 w-4" />
                          Environmental Requirements
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentCategory.requirements.temperature && (
                            <Card className="bg-blue-50 border-blue-200">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Thermometer className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium text-blue-800">Temperature</span>
                                </div>
                                <p className="text-sm text-blue-700">{currentCategory.requirements.temperature}</p>
                              </CardContent>
                            </Card>
                          )}

                          {currentCategory.requirements.humidity && (
                            <Card className="bg-cyan-50 border-cyan-200">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Droplets className="h-4 w-4 text-cyan-600" />
                                  <span className="font-medium text-cyan-800">Humidity</span>
                                </div>
                                <p className="text-sm text-cyan-700">{currentCategory.requirements.humidity}</p>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </div>

                      {currentCategory.requirements.specialHandling && (
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            Special Handling Instructions
                          </h4>
                          <div className="grid gap-2">
                            {currentCategory.requirements.specialHandling.map((instruction, index) => (
                              <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-orange-800">{instruction}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="storage" className="mt-6">
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Storage Instructions
                      </h3>
                      <div className="grid gap-3">
                        {currentCategory.storageInstructions.map((instruction, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm">{instruction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="quality" className="mt-6">
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Quality Control Checks
                      </h3>
                      <div className="grid gap-3">
                        {currentCategory.qualityChecks.map((check, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-green-800">{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="items" className="mt-6">
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Common Items in this Category
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {currentCategory.commonItems.map((item, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border shadow-sm">
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}