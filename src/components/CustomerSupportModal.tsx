import React from 'react';
import { X, MessageSquare, HelpCircle, FileText, Send, CheckCircle2, Bot, User, ChevronDown, ChevronUp } from 'lucide-react';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMsg {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

const FAQS_LIST = [
  {
    q: 'How does Indian footwear sizing work?',
    a: 'KADAM sizes strictly adhere to the Indian Bureau of Indian Standards (BIS 15844) sizing standard (Ind 3 to 12). If you wear size 8 in Bata, Metro, or Red Tape, select Indian Size 8 in KADAM. Our Indian Size Guide also provides exact foot length measurements in centimeters.',
    cat: 'Sizing'
  },
  {
    q: 'What is your Zero Shoe-Bite Guarantee?',
    a: 'Traditional Indian leather juttis and Peshawaris are infamous for heel chafing. Every KADAM shoe features a 7mm orthopedic memory foam footbed and an oil-conditioned soft velvet collar lining to eliminate blisters completely.',
    cat: 'Craftsmanship'
  },
  {
    q: 'Do you offer doorstep size exchanges for Kids and Adults?',
    a: 'Yes! We provide free 7-day doorstep size exchanges across 19,000+ Indian PIN codes. Our Blue Dart courier delivers your replacement pair and collects the original in one convenient visit.',
    cat: 'Exchanges'
  },
  {
    q: 'Are your bridal juttis and Peshawaris water-resistant?',
    a: 'Our formal welted leathers and Kolhapuris are natural vegetable-tanned hides. For monsoons, we recommend our Cloud Clogs and Vayu Sneakers which are 100% waterproof. Embroidered silk velvet juttis should be kept dry in their muslin potli.',
    cat: 'Care'
  },
  {
    q: 'Can I pay via Cash on Delivery or Instant UPI?',
    a: 'Yes, we accept Cash on Delivery with zero additional handling fee across India, as well as Instant UPI (Google Pay, PhonePe, Paytm, BHIM) and all major Credit/Debit Cards.',
    cat: 'Payments'
  }
];

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = React.useState<'faq' | 'chat' | 'ticket'>('faq');
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(0);

  // Live Chat state
  const [chatMessages, setChatMessages] = React.useState<ChatMsg[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Namaste! Welcome to KADAM Atelier Concierge. How can I assist you with sizing, bridal styling, or order tracking today?',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = React.useState('');

  // Ticket state
  const [ticketSubject, setTicketSubject] = React.useState('');
  const [ticketPriority, setTicketPriority] = React.useState('normal');
  const [ticketOrderId, setTicketOrderId] = React.useState('');
  const [ticketMessage, setTicketMessage] = React.useState('');
  const [ticketSubmitted, setTicketSubmitted] = React.useState(false);
  const [generatedTicketId, setGeneratedTicketId] = React.useState('');

  if (!isOpen) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const newMsg: ChatMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Simulated intelligent response based on keywords
    setTimeout(() => {
      let botReply = "Thank you for reaching out! Our master craft advisor will assist you promptly. You can also use our Indian Size Guide & Fit Finder tool for immediate millimeter sizing.";
      const lower = userText.toLowerCase();

      if (lower.includes('size') || lower.includes('fit') || lower.includes('tight')) {
        botReply = "For Indian ethnic footwear (Juttis & Peshawaris), we build on generous toe lasts. If you have broad feet, select 'Comfort Wide' width or use our Indian Size Guide!";
      } else if (lower.includes('kid') || lower.includes('child') || lower.includes('baby')) {
        botReply = "Our new Kids' Collection ranges from Indian Kids 8 (age 3) to Indian Size 3 (age 11) with extra 10mm growth allowance and soft padded collars to prevent blisters.";
      } else if (lower.includes('track') || lower.includes('order') || lower.includes('delivery') || lower.includes('status')) {
        botReply = "All orders are dispatched via Blue Dart Express. Click 'Track Order' in the top bar with your Order ID (e.g. KDM-849201) to view live Air Cargo milestones.";
      } else if (lower.includes('formal') || lower.includes('oxford') || lower.includes('office')) {
        botReply = "Our formal Oxfords, Monkstraps, and Loafers feature full-grain calfskin with 360° Goodyear welt construction crafted in Agra and Ambur.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    const tId = `TCK-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedTicketId(tId);
    setTicketSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          aria-label="Close support"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Customer Support &amp; Concierge
          </h2>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Dedicated assistance for sizing, artisan orders, exchanges, and tracking.
        </p>

        {/* 3 Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl mt-4">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'faq'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQs</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('ticket')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'ticket'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Create Ticket</span>
          </button>
        </div>

        {/* Tab 1: FAQs */}
        {activeTab === 'faq' && (
          <div className="mt-5 space-y-3 overflow-y-auto flex-1 pr-1">
            {FAQS_LIST.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-800/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Live Chat */}
        {activeTab === 'chat' && (
          <div className="mt-5 flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800 max-h-72">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'agent' && (
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 text-xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-stone-900 text-white rounded-tr-xs'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 rounded-tl-xs shadow-xs'
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-[10px] opacity-60 block mt-1 text-right">{msg.time}</span>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-stone-700 text-white flex items-center justify-center shrink-0 text-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Ask about sizing, delivery, or custom bridal pairs..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2.5 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Support Ticket */}
        {activeTab === 'ticket' && (
          <div className="mt-5 flex-1 overflow-y-auto">
            {ticketSubmitted ? (
              <div className="p-6 text-center space-y-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Ticket Raised Successfully!
                </h3>
                <p className="text-xs font-mono text-amber-800 dark:text-amber-400 font-semibold">
                  Reference: <strong>{generatedTicketId}</strong>
                </p>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Our Indian Atelier Master Artisan team will review your query and respond via SMS/Email within 4 hours.
                </p>
                <button
                  onClick={() => {
                    setTicketSubmitted(false);
                    setTicketSubject('');
                    setTicketMessage('');
                  }}
                  className="px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Create Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
                <div>
                  <label className="font-medium text-stone-700 dark:text-stone-300 block mb-1">Issue Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Size exchange request / Wedding delivery deadline"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-stone-700 dark:text-stone-300 block mb-1">Order ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. KDM-849201"
                      value={ticketOrderId}
                      onChange={(e) => setTicketOrderId(e.target.value.toUpperCase())}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-stone-700 dark:text-stone-300 block mb-1">Priority</label>
                    <select
                      value={ticketPriority}
                      onChange={(e) => setTicketPriority(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg outline-none cursor-pointer"
                    >
                      <option value="normal">Normal (Standard)</option>
                      <option value="urgent">Urgent (Wedding Within 48h)</option>
                      <option value="high">High (Address Change)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-stone-700 dark:text-stone-300 block mb-1">Detailed Message</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how we can assist you..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Submit Support Ticket
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
