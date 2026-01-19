import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

// Create motion components with proper typing
const MotionHeader = motion.header;
const MotionDiv = motion.div;
const MotionSpan = motion.span;

import { 
  Truck, 
  Package, 
  RefreshCw, 
  BarChart3, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Menu,
  Bell,
  Settings,
  User,
  Search
} from 'lucide-react';

interface HomePageProps {
  onNavigateToDelivery: () => void;
  onViewCategoryDetails?: () => void;
}

export function HomePage({ onNavigateToDelivery, onViewCategoryDetails }: HomePageProps) {
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    pendingDeliveries: 6,
    plannedPickups: 7,
    stockRecovery: 2,
    completedToday: 12
  };

  const moduleCards = [
    {
      id: 'delivery',
      title: 'Delivery',
      description: 'Manage incoming deliveries and verify items',
      icon: Truck,
      color: 'from-blue-500 to-blue-600',
      bgPattern: 'from-blue-50 to-blue-100',
      notification: stats.pendingDeliveries,
      status: 'active',
      onClick: onNavigateToDelivery
    },
    {
      id: 'pickup',
      title: 'Planned Pickup',
      description: 'Schedule and track outgoing shipments',
      icon: Package,
      color: 'from-amber-500 to-orange-500',
      bgPattern: 'from-amber-50 to-orange-100',
      notification: stats.plannedPickups,
      status: 'upcoming',
      onClick: () => console.log('Pickup clicked')
    },
    {
      id: 'recovery',
      title: 'Stock Recovery',
      description: 'Process returns and damaged items',
      icon: RefreshCw,
      color: 'from-green-500 to-emerald-600',
      bgPattern: 'from-green-50 to-emerald-100',
      notification: stats.stockRecovery,
      status: 'warning',
      onClick: () => console.log('Recovery clicked')
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View performance metrics and reports',
      icon: BarChart3,
      color: 'from-purple-500 to-violet-600',
      bgPattern: 'from-purple-50 to-violet-100',
      notification: 0,
      status: 'info',
      onClick: () => console.log('Analytics clicked')
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Delivery completed', item: 'Fresh Foods Distributor', time: '10 mins ago', status: 'success' },
    { id: 2, action: 'High priority delivery', item: 'Elite Supply Chain - 1hr 20min', time: '12 mins ago', status: 'warning' },
    { id: 3, action: 'Urgent delivery arriving', item: 'Premium Produce Co. - 45 mins', time: '15 mins ago', status: 'warning' },
    { id: 4, action: 'New delivery pending', item: 'Dairy Express', time: '25 mins ago', status: 'pending' },
    { id: 5, action: 'Delivery scheduled', item: 'Beverage Solutions Inc.', time: '35 mins ago', status: 'info' },
    { id: 6, action: 'Stock recovery initiated', item: 'Damaged items - Batch #1234', time: '1 hour ago', status: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex items-center gap-3">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-white text-xl font-medium inline-block"
                >
                  🦓 ZEBRA
                </motion.span>
                <div className="hidden md:block text-white/80 text-sm">
                  Warehouse Management System
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-white/90 text-sm">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative">
                <Bell className="h-5 w-5" />
                {stats.pendingDeliveries > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs">
                    {stats.pendingDeliveries}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center py-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your warehouse operations efficiently with real-time insights and streamlined workflows
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Truck className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.pendingDeliveries}</p>
              <p className="text-blue-100 text-sm">Pending Deliveries</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.plannedPickups}</p>
              <p className="text-orange-100 text-sm">Planned Pickups</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <RefreshCw className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.stockRecovery}</p>
              <p className="text-emerald-100 text-sm">Stock Recovery</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.completedToday}</p>
              <p className="text-violet-100 text-sm">Completed Today</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Modules */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Main Operations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {moduleCards.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`relative overflow-hidden cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${module.bgPattern}`}
                      onClick={module.onClick}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${module.color} opacity-5`} />
                      
                      <CardContent className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} text-white shadow-lg`}>
                            <module.icon className="h-8 w-8" />
                          </div>
                          
                          {module.notification > 0 && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center justify-center h-8 w-8 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg"
                            >
                              {module.notification}
                            </motion.span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {module.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {module.description}
                        </p>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {module.status === 'active' && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                            {module.status === 'warning' && <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />}
                            {module.status === 'upcoming' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                            <span className="text-xs text-gray-500 capitalize">{module.status}</span>
                          </div>
                          
                          <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-800">
                            View Details →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Recent Activity</h2>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-100 text-green-600' :
                          activity.status === 'pending' ? 'bg-blue-100 text-blue-600' :
                          activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {activity.status === 'success' && <CheckCircle className="h-4 w-4" />}
                          {activity.status === 'pending' && <Clock className="h-4 w-4" />}
                          {activity.status === 'warning' && <AlertTriangle className="h-4 w-4" />}
                          {activity.status === 'info' && <TrendingUp className="h-4 w-4" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 text-sm">
                            {activity.action}
                          </p>
                          <p className="text-gray-600 text-xs truncate">
                            {activity.item}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={onNavigateToDelivery}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Deliveries
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={onViewCategoryDetails}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Category Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}