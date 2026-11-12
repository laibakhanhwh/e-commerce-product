import React from 'react';
import { X, Shield, Package, TrendingUp, ShoppingCart, Tag, Check, AlertCircle, Edit3 } from 'lucide-react';
import { SHOES_DATA } from '../data/shoesData';
import { ShoeProduct } from '../types/shoes';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'inventory' | 'orders' | 'coupons'>('inventory');
  const [productsList, setProductsList] = React.useState<ShoeProduct[]>(SHOES_DATA);
  const [selectedGenderFilter, setSelectedGenderFilter] = React.useState<string>('all');

  // Simulated orders
  const [adminOrders, setAdminOrders] = React.useState([
    {
      id: 'KDM-849201',
      customer: 'Rohan Sharma',
      items: 'Taj Cap-Toe Leather Oxford (Ind 8)',
      total: 5499,
      status: 'Shipped',
      date: 'Today, 10:30 AM'
    },
    {
      id: 'KDM-849182',
      customer: 'Meenakshi Iyer',
      items: 'Chhote Nawab Velvet Mojari (Ind Kids 10)',
      total: 1899,
      status: 'Processing',
      date: 'Today, 09:15 AM'
    },
    {
      id: 'KDM-849045',
      customer: 'Karan Mehra',
      items: 'Rajputana Wingtip Brogue Oxford (Ind 9)',
      total: 5999,
      status: 'Delivered',
      date: 'Yesterday'
    }
  ]);

  if (!isOpen) return null;

  const totalCatalogStyles = productsList.length;
  const totalRevenue = adminOrders.reduce((sum, o) => sum + o.total, 0) + 142850;

  const handleUpdateStock = (productId: string, delta: number) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const updatedSizes = p.sizes.map((s) => ({
          ...s,
          stockCount: Math.max(0, (s.stockCount || 5) + delta),
          inStock: (s.stockCount || 5) + delta > 0
        }));
        return { ...p, sizes: updatedSizes };
      })
    );
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setAdminOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredCatalog = productsList.filter((p) => {
    if (selectedGenderFilter === 'all') return true;
    return p.gender === selectedGenderFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-800 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>KADAM Atelier Operations Panel</span>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-mono font-bold">ADMIN</span>
              </h2>
              <p className="text-xs text-stone-500">Live Inventory, Sales Reports &amp; Order Fulfillment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg cursor-pointer"
            aria-label="Close admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
            <span className="text-[11px] text-stone-500 font-medium">Total Revenue</span>
            <div className="text-base sm:text-lg font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
            <span className="text-[11px] text-stone-500 font-medium">Active Footwear Styles</span>
            <div className="text-base sm:text-lg font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
              {totalCatalogStyles} Models
            </div>
          </div>
          <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
            <span className="text-[11px] text-stone-500 font-medium">Kids &amp; Formal Pairs</span>
            <div className="text-base sm:text-lg font-bold font-mono text-amber-800 dark:text-amber-400 mt-0.5">
              {productsList.filter((p) => p.gender === 'kids' || p.category === 'Formal Shoes').length} Models
            </div>
          </div>
          <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
            <span className="text-[11px] text-stone-500 font-medium">Doorstep Exchange Rate</span>
            <div className="text-base sm:text-lg font-bold font-mono text-emerald-600 mt-0.5">
              99.4% Fit Accuracy
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl mb-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'inventory'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Product Inventory ({productsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Customer Orders ({adminOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'coupons'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Coupons &amp; Discounts (3)</span>
          </button>
        </div>

        {/* Tab 1: Product Inventory */}
        {activeTab === 'inventory' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-medium">Filter by:</span>
                {['all', 'men', 'women', 'kids'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenderFilter(g)}
                    className={`px-2.5 py-1 rounded-md text-[11px] capitalize cursor-pointer border ${
                      selectedGenderFilter === g
                        ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                        : 'border-stone-300 dark:border-stone-700 text-stone-600'
                    }`}
                  >
                    {g === 'kids' ? "Kids' Wear" : g}
                  </button>
                ))}
              </div>
              <span className="text-stone-500 font-mono">{filteredCatalog.length} records</span>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
              {filteredCatalog.map((prod) => {
                const totalStock = prod.sizes.reduce((acc, s) => acc + (s.stockCount || 5), 0);
                return (
                  <div key={prod.id} className="p-3 bg-stone-50/50 dark:bg-stone-800/40 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-200 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                          <span>{prod.name}</span>
                          <span className="text-[10px] bg-stone-200 dark:bg-stone-700 px-1.5 py-0.2 rounded capitalize">{prod.gender}</span>
                          <span className="text-[10px] text-stone-400 font-normal">{prod.category}</span>
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                          Price: ₹{prod.price.toLocaleString('en-IN')} &middot; Stock: {totalStock} pairs across sizes
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleUpdateStock(prod.id, 5)}
                        className="px-2.5 py-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded text-[11px] hover:bg-stone-100 cursor-pointer"
                        title="Restock 5 pairs across all sizes"
                      >
                        +5 Stock
                      </button>
                      <button
                        onClick={() => handleUpdateStock(prod.id, -5)}
                        className="px-2.5 py-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded text-[11px] hover:bg-stone-100 cursor-pointer text-rose-600"
                        title="Deduct 5 pairs"
                      >
                        -5 Stock
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Orders Manager */}
        {activeTab === 'orders' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            <div className="divide-y divide-stone-200 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
              {adminOrders.map((ord) => (
                <div key={ord.id} className="p-3.5 bg-stone-50/50 dark:bg-stone-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-stone-900 dark:text-stone-100">{ord.id}</span>
                      <span className="text-stone-500">&middot; {ord.customer}</span>
                      <span className="text-[10px] text-stone-400 font-mono">({ord.date})</span>
                    </div>
                    <div className="text-stone-600 dark:text-stone-300">{ord.items}</div>
                    <div className="font-mono font-bold text-stone-900 dark:text-stone-100">₹{ord.total.toLocaleString('en-IN')}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-500 font-medium">Fulfillment:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="text-xs bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded-lg px-2.5 py-1.5 outline-none font-semibold cursor-pointer"
                    >
                      <option value="Processing">Processing at Atelier</option>
                      <option value="Shipped">Dispatched (Blue Dart Air)</option>
                      <option value="Delivered">Delivered (Doorstep Confirmed)</option>
                      <option value="Cancelled">Cancelled &amp; Refunded</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Coupons */}
        {activeTab === 'coupons' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            <div className="space-y-3">
              <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700 flex justify-between items-center">
                <div>
                  <div className="font-bold font-mono text-amber-800 dark:text-amber-400 text-sm">KADAM10</div>
                  <div className="text-stone-500">10% discount on all footwear collections &middot; Minimum order ₹0</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium text-[11px]">ACTIVE</span>
              </div>

              <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700 flex justify-between items-center">
                <div>
                  <div className="font-bold font-mono text-amber-800 dark:text-amber-400 text-sm">FESTIVE20</div>
                  <div className="text-stone-500">20% discount on Wedding, Bridal Juttis, and Kids Festive &middot; Minimum order ₹0</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium text-[11px]">ACTIVE</span>
              </div>

              <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700 flex justify-between items-center">
                <div>
                  <div className="font-bold font-mono text-amber-800 dark:text-amber-400 text-sm">FIRST500</div>
                  <div className="text-stone-500">Flat ₹500 off on first purchase &middot; Minimum order ₹2,500</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium text-[11px]">ACTIVE</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
