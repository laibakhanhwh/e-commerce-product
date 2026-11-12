import React from 'react';
import { X, User, MapPin, Package, Clock, Plus, Check, ChevronRight, Truck, RotateCcw, Search, Copy, CheckCircle2 } from 'lucide-react';
import { ShoeProduct } from '../types/shoes';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrackingWithId: (orderId: string) => void;
  onReorder?: (productName: string) => void;
}

interface SavedAddress {
  id: string;
  tag: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

interface HistoricalOrder {
  orderId: string;
  date: string;
  items: { name: string; size: number; price: number; image?: string }[];
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
  carrierTracking: string;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  onOpenTrackingWithId,
  onReorder
}) => {
  const [activeTab, setActiveTab] = React.useState<'orders' | 'addresses' | 'profile'>('orders');

  // Address state
  const [addresses, setAddresses] = React.useState<SavedAddress[]>([
    {
      id: 'addr-1',
      tag: 'Home (Default)',
      fullName: 'Rohan Sharma',
      street: 'Flat 402, Sea Crest Apartments, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      phone: '+91 98201 45892',
      isDefault: true
    },
    {
      id: 'addr-2',
      tag: 'Office',
      fullName: 'Rohan Sharma',
      street: 'Unit 8B, Maker Chambers V, Nariman Point',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400021',
      phone: '+91 98201 45892',
      isDefault: false
    }
  ]);
  const [showAddressForm, setShowAddressForm] = React.useState(false);
  const [newTag, setNewTag] = React.useState('Home');
  const [newName, setNewName] = React.useState('');
  const [newStreet, setNewStreet] = React.useState('');
  const [newCity, setNewCity] = React.useState('');
  const [newState, setNewState] = React.useState('Maharashtra');
  const [newPostal, setNewPostal] = React.useState('');
  const [newPhone, setNewPhone] = React.useState('');

  // Orders state (read from localStorage if any, or provide rich sample orders)
  const [orders, setOrders] = React.useState<HistoricalOrder[]>(() => {
    try {
      const saved = localStorage.getItem('kadam_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        orderId: 'KDM-849201',
        date: '10 Nov 2026',
        items: [
          { name: 'Taj Cap-Toe Leather Oxford', size: 8, price: 5499 }
        ],
        total: 5499,
        status: 'In Transit',
        carrierTracking: 'BLUEDART-849201IN'
      },
      {
        orderId: 'KDM-721943',
        date: '24 Oct 2026',
        items: [
          { name: 'Noor Hand-Zardozi Bridal Jutti', size: 5, price: 3499 },
          { name: 'Chhote Nawab Velvet Mojari', size: 10, price: 1899 }
        ],
        total: 5398,
        status: 'Delivered',
        carrierTracking: 'BLUEDART-721943IN'
      }
    ];
  });

  const [orderSearchQuery, setOrderSearchQuery] = React.useState('');
  const [orderStatusFilter, setOrderStatusFilter] = React.useState<'All' | 'Delivered' | 'In Transit' | 'Processing'>('All');
  const [copiedOrderId, setCopiedOrderId] = React.useState<string | null>(null);

  // Sync orders whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('kadam_orders');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setOrders(parsed);
          }
        }
      } catch {}
    }
  }, [isOpen]);

  const handleCopyOrderId = (orderId: string) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(orderId);
      }
      setCopiedOrderId(orderId);
      setTimeout(() => setCopiedOrderId(null), 2000);
    } catch {}
  };

  const filteredOrders = React.useMemo(() => {
    return orders.filter((ord) => {
      if (orderStatusFilter !== 'All' && ord.status !== orderStatusFilter) {
        return false;
      }
      if (orderSearchQuery.trim()) {
        const q = orderSearchQuery.toLowerCase();
        const matchesId = ord.orderId.toLowerCase().includes(q);
        const matchesItem = ord.items.some((it) => it.name.toLowerCase().includes(q));
        if (!matchesId && !matchesItem) return false;
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);

  if (!isOpen) return null;

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newStreet || !newCity || !newPostal) return;

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      tag: newTag,
      fullName: newName,
      street: newStreet,
      city: newCity,
      state: newState,
      postalCode: newPostal,
      phone: newPhone || '+91 98201 45892',
      isDefault: false
    };

    setAddresses([...addresses, newAddr]);
    setShowAddressForm(false);
    setNewName('');
    setNewStreet('');
    setNewCity('');
    setNewPostal('');
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          aria-label="Close account"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              HK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Hana Khan</h2>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono">hanakhn4@gmail.com &middot; Member since 2025</p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-[11px] text-stone-400 block">Tier Status</span>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400">Royal Circle Platinum</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl mt-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Past Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'addresses'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses ({addresses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Security</span>
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="mt-4 space-y-4 overflow-y-auto flex-1 pr-1">
            {/* Filter and Search Bar for Orders */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="Filter past orders by Order ID or shoe name..."
                  className="w-full pl-9 pr-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg text-xs border border-transparent focus:border-stone-400 outline-none"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {(['All', 'Delivered', 'In Transit', 'Processing'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
                      orderStatusFilter === st
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {st === 'All' ? `All Orders (${orders.length})` : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length > 0 ? (
              <div className="space-y-3">
                {filteredOrders.map((ord) => (
                  <div key={ord.orderId} className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700/80 space-y-3 shadow-xs">
                    {/* Order ID & Status Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-700/70 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
                          {ord.orderId}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyOrderId(ord.orderId)}
                          className="text-[11px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center gap-1 cursor-pointer"
                          title="Copy Order ID"
                        >
                          {copiedOrderId === ord.orderId ? (
                            <span className="text-emerald-600 font-medium">Copied!</span>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                        <span className="text-[11px] text-stone-500">&middot; Placed on {ord.date}</span>
                      </div>

                      {/* Status Badge */}
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : ord.status === 'In Transit'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                          : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                      }`}>
                        {ord.status === 'Delivered' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : ord.status === 'In Transit' ? (
                          <Truck className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{ord.status}</span>
                      </span>
                    </div>

                    {/* Purchased Items List */}
                    <div className="space-y-1.5 text-xs">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-stone-700 dark:text-stone-300">
                          <span className="font-medium">
                            {it.name}{' '}
                            <span className="text-stone-400 font-mono font-normal">(Ind {it.size})</span>
                          </span>
                          <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                            ₹{it.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total Price and Action Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-stone-200 dark:border-stone-700 text-xs">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-stone-500 font-medium">Total Paid:</span>
                        <strong className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </strong>
                        <span className="text-[10px] text-stone-400 font-mono">(All taxes incl.)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {onReorder && ord.items[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              onReorder(ord.items[0].name);
                              onClose();
                            }}
                            className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-700/60 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Buy Again</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenTrackingWithId(ord.orderId);
                          }}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Truck className="w-3 h-3" />
                          <span>Track Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty orders state */
              <div className="py-12 text-center space-y-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-dashed border-stone-200 dark:border-stone-700">
                <Package className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">No past orders match your search</p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderSearchQuery('');
                    setOrderStatusFilter('All');
                  }}
                  className="text-xs text-amber-800 dark:text-amber-400 hover:underline cursor-pointer font-medium"
                >
                  Clear search &amp; filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="mt-5 space-y-4 overflow-y-auto flex-1 pr-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Delivery Addresses
              </span>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-xs text-amber-800 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddressForm ? 'Cancel' : 'Add New Address'}</span>
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 space-y-3 text-xs animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">Tag (Home / Office)</label>
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-stone-800 border rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-stone-800 border rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No., Street, Area"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-stone-800 border rounded-lg outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">City</label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-stone-800 border rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-stone-800 border rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      placeholder="400050"
                      value={newPostal}
                      onChange={(e) => setNewPostal(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-stone-800 border rounded-lg outline-none font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Save Address
                </button>
              </form>
            )}

            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-3.5 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 text-xs flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{addr.tag}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">Default</span>
                      )}
                    </div>
                    <div className="font-medium text-stone-800 dark:text-stone-200">{addr.fullName} &middot; {addr.phone}</div>
                    <div className="text-stone-500">{addr.street}, {addr.city}, {addr.state} - {addr.postalCode}</div>
                  </div>

                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      className="text-xs text-amber-800 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      Make Default
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <div className="mt-5 space-y-4 overflow-y-auto flex-1 text-xs">
            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700 space-y-3">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-500 block">Full Name</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">Rohan Sharma</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Contact Phone</span>
                  <span className="font-mono text-stone-900 dark:text-stone-100">+91 98201 45892</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Email Address</span>
                  <span className="font-mono text-stone-900 dark:text-stone-100">hanakhn4@gmail.com</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Default Shoe Size</span>
                  <span className="font-mono text-stone-900 dark:text-stone-100">Indian Size 8 (Standard)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50/70 dark:bg-stone-800/30 rounded-xl border border-amber-200/80 dark:border-stone-700 space-y-1.5">
              <h4 className="font-semibold text-amber-950 dark:text-amber-300">KADAM Guild Privilege</h4>
              <p className="text-stone-600 dark:text-stone-400">
                You receive priority courier dispatch on all orders and complimentary doorstep size exchanges.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
