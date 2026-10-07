import React, { useState } from 'react';
import { useDeliveryStore } from '../../state/deliveryStore';
import { CreateDeliveryModal } from './CreateDeliveryModal';
import { MarketplaceOffersView } from './MarketplaceOffersView';
import { ActiveDeliveryView } from './ActiveDeliveryView';
import { VEHICLE_OPTIONS } from '../../data/vehicles';
import { EGYPTIAN_LOCATIONS } from '../../data/egyptianLocations';
import {
  Home,
  Package,
  MessageSquare,
  User,
  Plus,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Globe,
  Truck,
  RotateCcw,
} from 'lucide-react';

interface CustomerAppProps {
  lang: 'en' | 'ar';
  onToggleLang: () => void;
}

export const CustomerApp: React.FC<CustomerAppProps> = ({ lang, onToggleLang }) => {
  const isRtl = lang === 'ar';
  const {
    deliveries,
    activeDelivery,
    createDelivery,
    acceptDriverOffer,
    sendChatMessage,
    submitRating,
    createDispute,
  } = useDeliveryStore();

  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'messages' | 'profile'>('home');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // If there's an active delivery, default to viewing it when clicking active card
  const currentViewOrder = selectedOrderId
    ? deliveries.find((d) => d.id === selectedOrderId) || activeDelivery
    : activeDelivery;

  return (
    <div className="flex flex-col h-full bg-[#080c15] text-slate-100 font-sans select-none overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Mobile Bar (Compact 52px) */}
      <div className="h-14 bg-[#0c1322] border-b border-slate-800/80 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
            RD
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-none">
              {isRtl ? 'اطلب دليفري' : 'Request Delivery'}
            </h1>
            <p className="text-[10px] text-amber-400 font-medium leading-none mt-0.5">
              {isRtl ? 'بضاعتك. سعرك. كابتنك.' : 'Your Goods. Your Price. Your Driver.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switch */}
          <button
            onClick={onToggleLang}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{isRtl ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable View Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <>
            {/* Greeting */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">
                  {isRtl ? 'أهلاً بك مجدداً،' : 'Good day,'}
                </p>
                <h2 className="text-lg font-black text-white">
                  {isRtl ? 'كريم منصور' : 'Kareem Mansour'}
                </h2>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isRtl ? 'شبكة النقل نشطة' : 'Logistics Grid Active'}</span>
              </div>
            </div>

            {/* BIG PRIMARY ACTION: + REQUEST DELIVERY */}
            <button
              onClick={() => setCreateModalOpen(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 active:scale-[0.99] text-slate-950 p-4 rounded-2xl shadow-xl shadow-amber-500/15 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-950/20 flex items-center justify-center text-slate-950">
                  <Plus className="w-6 h-6 stroke-[3]" />
                </div>
                <div className="text-left rtl:text-right">
                  <div className="text-base font-extrabold tracking-tight">
                    {isRtl ? 'طلب نقل بضاعة جديد' : 'Request Delivery'}
                  </div>
                  <div className="text-xs font-semibold text-slate-950/80">
                    {isRtl ? 'حدد الحمولة والسعر ونوع السيارة المناسبة' : 'Set your cargo, your price & choose driver'}
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-950/15 flex items-center justify-center group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                <ChevronRight className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
            </button>

            {/* ACTIVE ORDER BANNER (IF ANY) */}
            {activeDelivery && (
              <div className="bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {isRtl ? 'شحنة جارية الآن' : 'Active Delivery in Progress'}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    #{activeDelivery.trackingCode}
                  </span>
                </div>

                {activeDelivery.status === 'pending_offers' ? (
                  <MarketplaceOffersView
                    order={activeDelivery}
                    onAcceptOffer={acceptDriverOffer}
                    lang={lang}
                  />
                ) : (
                  <ActiveDeliveryView
                    order={activeDelivery}
                    onSendMessage={(id, txt) => sendChatMessage(id, 'customer', txt)}
                    onSubmitRating={submitRating}
                    onReportDispute={(id, r) => createDispute(id, 'customer', 'damaged_package', r)}
                    lang={lang}
                  />
                )}
              </div>
            )}

            {/* VEHICLE FLEET QUICK DISCOVERY */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {isRtl ? 'أسطول النقل المتاح' : 'Supported Transport Fleet'}
                </h3>
                <span className="text-[11px] text-slate-400">8 {isRtl ? 'فئات' : 'categories'}</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {VEHICLE_OPTIONS.slice(0, 4).map((veh) => (
                  <div
                    key={veh.id}
                    onClick={() => setCreateModalOpen(true)}
                    className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-xl p-2.5 text-center cursor-pointer transition-colors flex flex-col items-center"
                  >
                    <span className="text-2xl mb-1">{veh.icon}</span>
                    <span className="text-[11px] font-bold text-white truncate w-full">
                      {isRtl ? veh.nameAr : veh.nameEn}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">
                      {veh.maxWeightKg}kg max
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT DELIVERIES LIST */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {isRtl ? 'الرحلات السابقة' : 'Recent Deliveries'}
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-[11px] text-amber-400 hover:underline"
                >
                  {isRtl ? 'عرض الكل' : 'View all'}
                </button>
              </div>

              {deliveries.filter((d) => d.status === 'completed').slice(0, 3).map((d) => (
                <div
                  key={d.id}
                  onClick={() => {
                    setSelectedOrderId(d.id);
                    setActiveTab('orders');
                  }}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">
                        {isRtl ? `${d.pickup.cityAr} ➔ ${d.destination.cityAr}` : `${d.pickup.cityEn} ➔ ${d.destination.cityEn}`}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {d.description} · {d.weightKg} kg
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <div className="text-xs font-mono font-bold text-emerald-400">
                      {d.finalAgreedPriceEgp || d.customerProposedPriceEgp} EGP
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      #{d.trackingCode}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SAVED WAREHOUSES & LOCATIONS */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {isRtl ? 'المستودعات والمواقع المحفوظة' : 'Saved Logistics Hubs'}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {EGYPTIAN_LOCATIONS.slice(0, 2).map((loc) => (
                  <div
                    key={loc.id}
                    className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2"
                  >
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="truncate">
                      <div className="font-bold text-slate-200 truncate">
                        {isRtl ? loc.cityAr : loc.cityEn}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {isRtl ? loc.nameAr : loc.nameEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">
              {isRtl ? 'سجل طلبات النقل' : 'My Deliveries & Cargo Activity'}
            </h2>

            {currentViewOrder ? (
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedOrderId(null)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  ← {isRtl ? 'الرجوع لقائمة الطلبات' : 'Back to orders list'}
                </button>

                {currentViewOrder.status === 'pending_offers' ? (
                  <MarketplaceOffersView
                    order={currentViewOrder}
                    onAcceptOffer={acceptDriverOffer}
                    lang={lang}
                  />
                ) : (
                  <ActiveDeliveryView
                    order={currentViewOrder}
                    onSendMessage={(id, txt) => sendChatMessage(id, 'customer', txt)}
                    onSubmitRating={submitRating}
                    onReportDispute={(id, r) => createDispute(id, 'customer', 'damaged_package', r)}
                    lang={lang}
                  />
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {deliveries.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400">#{order.trackingCode}</span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          order.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="text-xs text-white font-bold">
                      {isRtl ? `${order.pickup.cityAr} ➔ ${order.destination.cityAr}` : `${order.pickup.cityEn} ➔ ${order.destination.cityEn}`}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      <span>{order.distanceKm} km · {order.weightKg} kg</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {order.finalAgreedPriceEgp || order.customerProposedPriceEgp} EGP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IN-APP MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">
              {isRtl ? 'المحادثات مع السائقين' : 'Driver Messages'}
            </h2>

            {activeDelivery ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <img
                    src={activeDelivery.assignedDriver?.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                    alt="Driver"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">
                      {activeDelivery.assignedDriver?.name || 'Ahmed Hassan'}
                    </div>
                    <div className="text-[10px] text-emerald-400">
                      {isRtl ? 'متصل الآن · رحلة جارية' : 'Online · Active Trip'}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {activeDelivery.chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-1.5 text-xs ${
                          msg.sender === 'customer' ? 'bg-amber-500 text-slate-950 font-medium' : 'bg-slate-800 text-white'
                        }`}
                      >
                        <div>{msg.text}</div>
                        <div className="text-[9px] opacity-70 font-mono mt-0.5 text-right">{msg.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder={isRtl ? 'اكتب رسالة...' : 'Type a message...'}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.target as any).value.trim()) {
                        sendChatMessage(activeDelivery.id, 'customer', (e.target as any).value.trim());
                        (e.target as any).value = '';
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-slate-400">
                {isRtl ? 'لا توجد محادثات نشطة حالياً.' : 'No active chats right now.'}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border-2 border-amber-500 flex items-center justify-center font-bold text-xl">
                KM
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Kareem Mansour</h3>
                <p className="text-xs text-slate-400 font-mono">+20 100 812 3991</p>
                <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                  ✓ Verified Customer Account
                </div>
              </div>
            </div>

            {/* Profile Options */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800 text-xs">
              <div className="p-3.5 flex items-center justify-between">
                <span>{isRtl ? 'اللغة / Language' : 'App Language'}</span>
                <button
                  onClick={onToggleLang}
                  className="font-bold text-amber-400 hover:underline"
                >
                  {isRtl ? 'English' : 'العربية (RTL)'}
                </button>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span>{isRtl ? 'المحفظة الإلكترونية' : 'Digital Wallet Balance'}</span>
                <span className="font-mono font-bold text-emerald-400">450.00 EGP</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span>{isRtl ? 'المستودعات المسجلة' : 'Saved Addresses'}</span>
                <span className="text-slate-400">3 Locations</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span>{isRtl ? 'خدمة العملاء والدعم الفني' : 'Customer Support & Helpline'}</span>
                <span className="text-amber-400 font-mono">19842</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FIXED BOTTOM MOBILE TAB NAVIGATION */}
      <div className="fixed bottom-0 inset-x-0 h-16 bg-[#0c1322]/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-4 items-center z-40 max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isRtl ? 'الرئيسية' : 'Home'}</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center justify-center h-full transition-colors relative ${
            activeTab === 'orders' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Package className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isRtl ? 'طلباتي' : 'Orders'}</span>
          {activeDelivery && (
            <span className="absolute top-2 right-6 w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'messages' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isRtl ? 'الرسائل' : 'Chat'}</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'profile' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isRtl ? 'حسابي' : 'Profile'}</span>
        </button>
      </div>

      {/* CREATE DELIVERY MODAL */}
      <CreateDeliveryModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={(data) => {
          const newOrder = createDelivery(data);
          setSelectedOrderId(newOrder.id);
        }}
        lang={lang}
      />
    </div>
  );
};
