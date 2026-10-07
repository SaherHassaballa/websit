import React, { useState } from 'react';
import { useDeliveryStore } from '../../state/deliveryStore';
import { DriverActiveDeliveryView } from './DriverActiveDeliveryView';
import {
  Compass,
  Truck,
  Wallet,
  ShieldCheck,
  Power,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  FileText,
  Camera,
  Globe,
} from 'lucide-react';

interface DriverAppProps {
  lang: 'en' | 'ar';
  onToggleLang: () => void;
}

export const DriverApp: React.FC<DriverAppProps> = ({ lang, onToggleLang }) => {
  const isRtl = lang === 'ar';
  const {
    deliveries,
    activeDriver,
    toggleDriverOnline,
    submitDriverCounterOffer,
    acceptDriverOffer,
    driverArriveAtPickup,
    confirmPickupAndStartTransit,
    driverArriveAtDropoff,
    verifyOtpAndCompleteDelivery,
    sendChatMessage,
  } = useDeliveryStore();

  const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'earnings' | 'verification'>('requests');
  const [counterOfferModalOpen, setCounterOfferModalOpen] = useState(false);
  const [selectedOrderForOffer, setSelectedOrderForOffer] = useState<any>(null);
  const [customCounterPrice, setCustomCounterPrice] = useState<number>(450);

  // Check if driver has an active delivery assigned to them
  const myActiveDelivery = deliveries.find(
    (d) =>
      d.status !== 'completed' &&
      d.status !== 'cancelled' &&
      d.assignedDriver?.id === activeDriver.id
  );

  // Filter pending requests matching this driver's vehicle or capacity
  const availableRequests = deliveries.filter(
    (d) =>
      d.status === 'pending_offers' &&
      (d.vehicleRequired === activeDriver.vehicle.type || d.weightKg <= activeDriver.vehicle.maxPayloadKg)
  );

  const handleOpenCounterOffer = (order: any) => {
    setSelectedOrderForOffer(order);
    setCustomCounterPrice(order.customerProposedPriceEgp + 30);
    setCounterOfferModalOpen(true);
  };

  const handleSendCounter = () => {
    if (selectedOrderForOffer) {
      submitDriverCounterOffer(selectedOrderForOffer.id, customCounterPrice);
      setCounterOfferModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080c15] text-slate-100 font-sans select-none overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Driver Top Mobile Bar */}
      <div className="h-14 bg-[#0c1322] border-b border-slate-800/80 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2.5">
          <img
            src={activeDriver.avatarUrl}
            alt={activeDriver.fullName}
            className="w-9 h-9 rounded-full object-cover border-2 border-slate-700"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate max-w-[130px]">
                {activeDriver.fullName}
              </span>
              {activeDriver.verificationStatus === 'verified' && (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded font-bold">
                  ✓
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400">
              {activeDriver.vehicle.model} · <span className="font-mono">{activeDriver.vehicle.plateNumber}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* ONLINE / OFFLINE TOGGLE */}
          <button
            onClick={() => toggleDriverOnline(activeDriver.id)}
            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              activeDriver.isOnline
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{activeDriver.isOnline ? (isRtl ? 'متاح أونلاين' : 'ONLINE') : (isRtl ? 'أوفلاين' : 'OFFLINE')}</span>
          </button>

          <button
            onClick={onToggleLang}
            className="px-2 py-1 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700"
          >
            {isRtl ? 'EN' : 'عربي'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* TAB 1: RADAR & NEARBY REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {/* Today's Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-3 text-center">
              <div>
                <div className="text-[10px] text-slate-400">{isRtl ? 'أرباح اليوم' : "Today's Net"}</div>
                <div className="text-base font-black font-mono text-emerald-400 mt-0.5">
                  {activeDriver.todayEarningsEgp} <span className="text-[10px]">EGP</span>
                </div>
              </div>
              <div className="border-x border-slate-800">
                <div className="text-[10px] text-slate-400">{isRtl ? 'الرحلات' : 'Deliveries'}</div>
                <div className="text-base font-black font-mono text-white mt-0.5">
                  {activeDriver.totalDeliveries}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">{isRtl ? 'التقييم' : 'Rating'}</div>
                <div className="text-base font-black font-mono text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {activeDriver.rating}
                </div>
              </div>
            </div>

            {/* Offline Alert if driver is offline */}
            {!activeDriver.isOnline && (
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Power className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white">
                  {isRtl ? 'أنت غير متصل الآن' : "You're currently offline"}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isRtl ? 'قم بالتحويل إلى "متاح أونلاين" لاستقبال طلبات النقل القريبة.' : 'Switch to ONLINE to receive nearby cargo requests.'}
                </p>
                <button
                  onClick={() => toggleDriverOnline(activeDriver.id)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl"
                >
                  {isRtl ? 'التحويل إلى متصل أونلاين' : 'Go Online Now'}
                </button>
              </div>
            )}

            {/* Active Delivery shortcut banner if ongoing trip */}
            {myActiveDelivery && (
              <div
                onClick={() => setActiveTab('active')}
                className="bg-gradient-to-r from-blue-900/40 to-slate-900 border-2 border-blue-500/50 rounded-2xl p-4 cursor-pointer hover:border-blue-400 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{isRtl ? 'لديك رحلة جارية الآن' : 'Active Delivery in Progress'}</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      {isRtl ? `${myActiveDelivery.pickup.cityAr} ➔ ${myActiveDelivery.destination.cityAr}` : `${myActiveDelivery.pickup.cityEn} ➔ ${myActiveDelivery.destination.cityEn}`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-400 font-mono">
                    {myActiveDelivery.finalAgreedPriceEgp || myActiveDelivery.customerProposedPriceEgp} EGP
                  </div>
                  <span className="text-[10px] text-blue-300 hover:underline">
                    {isRtl ? 'فتح الرحلة ←' : 'Open Trip →'}
                  </span>
                </div>
              </div>
            )}

            {/* Requests Feed Header */}
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{isRtl ? `الطلبات المتاحة لمركبتك (${availableRequests.length})` : `Available Cargo Requests (${availableRequests.length})`}</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                {activeDriver.vehicle.model}
              </span>
            </div>

            {/* Requests Cards List */}
            {availableRequests.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400 space-y-2">
                <Truck className="w-8 h-8 text-slate-600 mx-auto" />
                <p>{isRtl ? 'لا توجد طلبات جديدة معلقة حالياً في نطاقك.' : 'No new pending requests in your area right now.'}</p>
                <p className="text-[10px] text-slate-500">{isRtl ? 'ستظهر الطلبات الجديدة هنا فور بثها من العملاء.' : 'New orders will appear here automatically.'}</p>
              </div>
            ) : (
              availableRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">#{req.trackingCode}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                      {req.categoryLabelEn}
                    </span>
                  </div>

                  {/* Route Information */}
                  <div className="space-y-1.5 text-xs text-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span className="truncate">
                        <strong>{isRtl ? 'استلام: ' : 'Pickup: '}</strong>
                        {isRtl ? req.pickup.nameAr : req.pickup.nameEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      <span className="truncate">
                        <strong>{isRtl ? 'تسليم: ' : 'Dropoff: '}</strong>
                        {isRtl ? req.destination.nameAr : req.destination.nameEn}
                      </span>
                    </div>
                  </div>

                  {/* Distance & Cargo Details */}
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                    <div>
                      <span>📍 {req.distanceKm} km</span>
                      <span className="text-slate-500 mx-1.5">·</span>
                      <span>⏱️ ~{req.estimatedDrivingMinutes}m</span>
                    </div>
                    <div className="font-mono text-slate-300 font-semibold">
                      📦 {req.weightKg} kg ({req.quantity} {isRtl ? 'طرد' : 'pkgs'})
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {req.description}
                  </p>

                  {/* Pricing and Actions Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-400">{isRtl ? 'عرض العميل المقترح:' : 'Customer Offer:'}</div>
                      <div className="text-lg font-black font-mono text-amber-400">
                        {req.customerProposedPriceEgp} <span className="text-xs">EGP</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCounterOffer(req)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2 px-3 rounded-xl border border-slate-700"
                      >
                        {isRtl ? 'عرض سعر مضاد' : 'Counter-Offer'}
                      </button>
                      <button
                        onClick={() => {
                          // Directly accept at customer price
                          submitDriverCounterOffer(req.id, req.customerProposedPriceEgp);
                          // Auto trigger customer acceptance for demo flow
                          setTimeout(() => {
                            const off = req.offers.find((o) => o.driverId === activeDriver.id);
                            if (off) acceptDriverOffer(req.id, off.id);
                            setActiveTab('active');
                          }, 600);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-2 px-3.5 rounded-xl shadow-md shadow-emerald-500/20"
                      >
                        {isRtl ? 'قبول السعر' : 'Accept'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE DELIVERY EXECUTION MODE */}
        {activeTab === 'active' && (
          <div>
            {myActiveDelivery ? (
              <DriverActiveDeliveryView
                order={myActiveDelivery}
                driver={activeDriver}
                onArrivePickup={driverArriveAtPickup}
                onConfirmPickup={confirmPickupAndStartTransit}
                onArriveDropoff={driverArriveAtDropoff}
                onVerifyOtp={verifyOtpAndCompleteDelivery}
                onSendMessage={(id, txt) => sendChatMessage(id, 'driver', txt)}
                lang={lang}
              />
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {isRtl ? 'لا توجد رحلة نشطة قيد التنفيذ' : 'No Active Delivery Right Now'}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {isRtl ? 'تصفح قائمة الطلبات القريبة في الرادار وقدم عروض أسعار للعملاء.' : 'Browse incoming delivery requests in the radar tab to accept new cargo orders.'}
                </p>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl"
                >
                  {isRtl ? 'الانتقال إلى رادار الطلبات' : 'Go to Requests Radar'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EARNINGS & WALLET */}
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">
              {isRtl ? 'محفظة وأرباح الكابتن' : 'Driver Earnings & Wallet'}
            </h2>

            {/* Main Balance Card */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 space-y-3 shadow-lg">
              <div className="text-xs text-slate-400">{isRtl ? 'الرصيد المتاح للسحب' : 'Available Wallet Balance'}</div>
              <div className="text-3xl font-black font-mono text-emerald-400">
                {activeDriver.walletBalanceEgp}.00 <span className="text-sm font-normal text-slate-400">EGP</span>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                <span className="text-slate-400">{isRtl ? 'عمولة المنصة: 10% فقط' : 'Platform commission: 10%'}</span>
                <button className="bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-emerald-400">
                  {isRtl ? 'طلب تحويل بنكي / إنستاباي' : 'Request Payout'}
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <div className="text-slate-400">{isRtl ? 'أرباح اليوم' : "Today's Net"}</div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  {activeDriver.todayEarningsEgp} EGP
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <div className="text-slate-400">{isRtl ? 'أرباح الأسبوع' : 'This Week'}</div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  {activeDriver.weekEarningsEgp} EGP
                </div>
              </div>
            </div>

            {/* Recent Trips History */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {isRtl ? 'سجل الرحلات المكتملة' : 'Completed Deliveries'}
              </h3>
              {deliveries.filter((d) => d.status === 'completed').map((d) => (
                <div key={d.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{d.pickup.cityEn} ➔ {d.destination.cityEn}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{d.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-emerald-400">
                      +{Math.round((d.finalAgreedPriceEgp || d.customerProposedPriceEgp) * 0.9)} EGP
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">#{d.trackingCode}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VERIFICATION & KYC PROFILE */}
        {activeTab === 'verification' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">
              {isRtl ? 'ملف الكابتن والتحقق من الهوية' : 'Driver Identity & Verification (KYC)'}
            </h2>

            {/* Verification Status Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white">
                    {isRtl ? 'حالة التوثيق الرسمية' : 'KYC Verification Status'}
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    activeDriver.verificationStatus === 'verified'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {activeDriver.verificationStatus === 'verified' ? 'Verified Driver ✓' : 'Pending Review'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {isRtl
                  ? 'تم فحص ومطابقة بطاقة الرقم القومي ورخصة القيادة ورخصة تسيير المركبة بنجاح.'
                  : 'National ID, professional driver license and vehicle registration verified by admin.'}
              </p>
            </div>

            {/* Vehicle Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                {isRtl ? 'بيانات المركبة المعتمدة' : 'Registered Vehicle Details'}
              </h4>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-400">{isRtl ? 'النوع:' : 'Type:'}</span>{' '}
                  <span className="text-white font-bold">{activeDriver.vehicle.type}</span>
                </div>
                <div>
                  <span className="text-slate-400">{isRtl ? 'الموديل:' : 'Model:'}</span>{' '}
                  <span className="text-white font-bold">{activeDriver.vehicle.model} ({activeDriver.vehicle.year})</span>
                </div>
                <div>
                  <span className="text-slate-400">{isRtl ? 'رقم اللوحة:' : 'Plate:'}</span>{' '}
                  <span className="text-amber-400 font-mono font-bold">{activeDriver.vehicle.plateNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400">{isRtl ? 'أقصى حمولة:' : 'Max Payload:'}</span>{' '}
                  <span className="text-white font-mono">{activeDriver.vehicle.maxPayloadKg} kg</span>
                </div>
              </div>
            </div>

            {/* Secure Documents List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                {isRtl ? 'المستندات الرسمية المحمية' : 'Encrypted Verification Documents'}
              </h4>
              <div className="space-y-2">
                {[
                  { title: isRtl ? 'بطاقة الرقم القومي (الوجهين)' : 'National ID (Egypt)', status: 'Approved' },
                  { title: isRtl ? 'رخصة قيادة مهنية سارية' : 'Professional Driver License', status: 'Approved' },
                  { title: isRtl ? 'رخصة تسيير المركبة' : 'Vehicle Registration Book', status: 'Approved' },
                  { title: isRtl ? 'صورة شخصية حية (Selfie)' : 'Driver Live Selfie', status: 'Approved' },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">{doc.title}</span>
                    <span className="text-emerald-400 font-mono font-semibold">✓ {doc.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* COUNTER-OFFER POPUP MODAL */}
      {counterOfferModalOpen && selectedOrderForOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4">
            <h3 className="text-sm font-bold text-white">
              {isRtl ? 'تقديم عرض سعر مقابل (Counter-Offer)' : 'Submit Driver Counter-Offer'}
            </h3>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div>{selectedOrderForOffer.pickup.cityEn} ➔ {selectedOrderForOffer.destination.cityEn} ({selectedOrderForOffer.distanceKm} km)</div>
              <div className="text-slate-400 mt-1">{isRtl ? 'عرض العميل:' : 'Customer offered:'} <span className="font-bold text-white font-mono">{selectedOrderForOffer.customerProposedPriceEgp} EGP</span></div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {isRtl ? 'عرض سعرك المقترح (ج.م):' : 'Your Proposed Price (EGP):'}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCustomCounterPrice((p) => Math.max(100, p - 20))}
                  className="w-10 h-10 bg-slate-800 text-white rounded-xl font-bold"
                >
                  -20
                </button>
                <input
                  type="number"
                  value={customCounterPrice}
                  onChange={(e) => setCustomCounterPrice(Number(e.target.value))}
                  className="flex-1 bg-slate-950 border-2 border-amber-500 font-mono text-xl font-black text-center text-amber-400 py-2 rounded-xl focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setCustomCounterPrice((p) => p + 20)}
                  className="w-10 h-10 bg-slate-800 text-white rounded-xl font-bold"
                >
                  +20
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCounterOfferModalOpen(false)}
                className="flex-1 bg-slate-800 text-slate-300 font-bold text-xs py-2.5 rounded-xl"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleSendCounter}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl"
              >
                {isRtl ? 'إرسال العرض' : 'Send Counter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DRIVER FIXED BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 inset-x-0 h-16 bg-[#0c1322]/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-4 items-center z-40 max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex flex-col items-center justify-center h-full transition-colors relative ${
            activeTab === 'requests' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isRtl ? 'الرادار' : 'Radar'}</span>
          {availableRequests.length > 0 && (
            <span className="absolute top-2 right-6 w-2 h-2 rounded-full bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`flex flex-col items-center justify-center h-full transition-colors relative ${
            activeTab === 'active' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isRtl ? 'الرحلة النشطة' : 'Active'}</span>
          {myActiveDelivery && (
            <span className="absolute top-2 right-6 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'earnings' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isRtl ? 'الأرباح' : 'Earnings'}</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'verification' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isRtl ? 'التوثيق' : 'KYC'}</span>
        </button>
      </div>
    </div>
  );
};
