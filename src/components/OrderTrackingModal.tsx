import React from 'react';
import { X, Search, CheckCircle2, Truck, Clock, ShieldCheck, Copy, Check, MapPin, Package } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId
}) => {
  const [orderQuery, setOrderQuery] = React.useState(initialOrderId || 'KDM-849201');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (initialOrderId) {
      setOrderQuery(initialOrderId);
    }
  }, [initialOrderId]);

  if (!isOpen) return null;

  const trackingNumber = `BLUEDART-${orderQuery.replace('KDM-', '') || '849201'}IN`;

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trackingMilestones = [
    {
      title: 'Order Confirmed & Payment Verified',
      location: 'Central Atelier Systems, Jaipur',
      time: 'Yesterday, 10:30 AM',
      completed: true,
      description: 'Order placed, size verified against Indian standard foot molds.'
    },
    {
      title: 'Handcrafted & Karigar Inspection',
      location: 'Agra Welted Guild / Jaipur Zardozi Workshop',
      time: 'Yesterday, 04:15 PM',
      completed: true,
      description: 'Zero-bite 7mm memory foam footbed seated and hand-inspected.'
    },
    {
      title: 'Dispatched via Blue Dart Air Cargo',
      location: 'IGI Air Hub, New Delhi',
      time: 'Today, 06:45 AM',
      completed: true,
      description: 'Airway Bill generated. In priority express transit.'
    },
    {
      title: 'Arrived at Destination Distribution Hub',
      location: 'Regional Logistics Center',
      time: 'Today, 02:20 PM',
      completed: true,
      description: 'Consignment sorted for local courier dispatch.'
    },
    {
      title: 'Out for Doorstep Delivery',
      location: 'Local Delivery Van',
      time: 'Expected Tomorrow by 02:00 PM',
      completed: false,
      description: 'Our delivery agent will arrive with doorstep size-exchange bag.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          aria-label="Close tracking"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Truck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Live Courier Tracking
          </h2>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Real-time GPS status for your handcrafted KADAM footwear consignment.
        </p>

        {/* Search by Order ID */}
        <div className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. KDM-849201)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl uppercase font-mono outline-none"
            />
          </div>
          <button
            onClick={() => {}}
            className="px-4 py-2.5 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 rounded-xl transition-colors cursor-pointer"
          >
            Track
          </button>
        </div>

        {/* Shipment Header Card */}
        <div className="mt-5 p-4 bg-stone-100 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-[11px] text-stone-500 uppercase font-semibold">Courier Partner</div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 mt-0.5">
              <span>Blue Dart Air Cargo Express</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">PRIORITY</span>
            </div>
            <div className="text-stone-500 font-mono text-[11px] mt-0.5 flex items-center gap-1.5">
              <span>AWB: {trackingNumber}</span>
              <button
                onClick={handleCopy}
                className="text-stone-600 dark:text-stone-300 hover:text-stone-900 cursor-pointer p-0.5"
                title="Copy AWB number"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="text-[11px] text-stone-500 uppercase font-semibold">Status</div>
            <div className="text-sm font-bold text-amber-700 dark:text-amber-400 mt-0.5 flex items-center sm:justify-end gap-1">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>In Transit</span>
            </div>
            <div className="text-stone-500 text-[11px]">Est. Delivery: 24-48 Hours</div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="mt-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Shipment Milestones
          </div>

          <div className="space-y-4 border-l-2 border-amber-600 dark:border-amber-500 ml-3 pl-5 relative">
            {trackingMilestones.map((ms, idx) => (
              <div key={idx} className="relative group">
                {/* Milestone dot */}
                <div className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-stone-900 flex items-center justify-center ${
                  ms.completed ? 'bg-amber-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}>
                  {ms.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className={`text-xs font-semibold ${
                      ms.completed ? 'text-stone-900 dark:text-stone-100' : 'text-stone-500 dark:text-stone-400'
                    }`}>
                      {ms.title}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-mono">{ms.time}</span>
                  </div>

                  <div className="text-[11px] text-amber-800 dark:text-amber-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{ms.location}</span>
                  </div>

                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {ms.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doorstep Sizing & Exchange Guarantee Note */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>KADAM Hassle-Free Sizing Guarantee:</strong> If the size does not feel like a second skin, our Blue Dart delivery agent will exchange it for your alternate size on the spot.
          </span>
        </div>
      </div>
    </div>
  );
};
