import React, { useState } from 'react';
import { DeliveryOrder, DriverProfile } from '../../types';
import { InteractiveMap } from '../common/InteractiveMap';
import {
  Navigation,
  CheckCircle2,
  Camera,
  KeyRound,
  Phone,
  MessageSquare,
  AlertOctagon,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  X,
} from 'lucide-react';

interface DriverActiveDeliveryViewProps {
  order: DeliveryOrder;
  driver: DriverProfile;
  onArrivePickup: (orderId: string) => void;
  onConfirmPickup: (orderId: string, photoUrl?: string) => void;
  onArriveDropoff: (orderId: string) => void;
  onVerifyOtp: (orderId: string, otp: string) => { success: boolean; message: string };
  onSendMessage: (orderId: string, text: string) => void;
  lang?: 'en' | 'ar';
}

export const DriverActiveDeliveryView: React.FC<DriverActiveDeliveryViewProps> = ({
  order,
  driver,
  onArrivePickup,
  onConfirmPickup,
  onArriveDropoff,
  onVerifyOtp,
  onSendMessage,
  lang = 'en',
}) => {
  const isRtl = lang === 'ar';
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatText, setChatText] = useState('');
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const handleVerifyOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);
    const res = onVerifyOtp(order.id, enteredOtp);
    if (!res.success) {
      setOtpError(res.message);
    }
  };

  return (
    <div className="space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Route Navigation Map */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
        <InteractiveMap
          pickup={order.pickup}
          destination={order.destination}
          vehicleType={driver.vehicle.type}
          status={order.status}
          heightClass="h-56"
          lang={lang}
        />

        {/* Turn-by-Turn Guidance Overlay Banner */}
        <div className="absolute top-3 inset-x-3 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-2.5 rounded-xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4 fill-white" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">
                {order.status === 'driver_accepted'
                  ? isRtl ? `التوجه لنقطة الاستلام (${order.pickup.cityAr})` : `Navigate to Pickup (${order.pickup.cityEn})`
                  : isRtl ? `التوجه لنقطة التسليم (${order.destination.cityAr})` : `Navigate to Destination (${order.destination.cityEn})`}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {order.status === 'driver_accepted' ? order.pickup.addressEn : order.destination.addressEn}
              </div>
            </div>
          </div>
          <div className="text-right shrink-0 ml-2">
            <span className="font-mono text-xs text-amber-400 font-bold">
              {order.distanceKm} km
            </span>
          </div>
        </div>
      </div>

      {/* Cargo & Customer Info Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-mono">#{order.trackingCode}</div>
            <div className="text-sm font-bold text-white">{order.customerName}</div>
            <div className="text-xs text-amber-400 font-mono font-bold mt-0.5">
              {order.finalAgreedPriceEgp || order.customerProposedPriceEgp} EGP
              <span className="text-[10px] text-slate-400 font-normal ml-1">
                ({isRtl ? 'صافي السائق' : 'driver net'}: {Math.round((order.finalAgreedPriceEgp || order.customerProposedPriceEgp) * 0.9)} EGP)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${order.customerPhone}`}
              className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 flex items-center justify-center"
              title="Call Customer"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 flex items-center justify-center relative"
              title="Chat"
            >
              <MessageSquare className="w-4 h-4" />
              {order.chatMessages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {order.chatMessages.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
          <span>📦 {order.description}</span>
          <span className="font-mono text-slate-400">{order.weightKg} kg · {order.quantity} units</span>
        </div>
      </div>

      {/* DRIVER CHAIN OF CUSTODY ACTIONS (DEPENDENT ON CURRENT STATE) */}
      <div className="bg-gradient-to-br from-slate-900 to-[#0e1628] border-2 border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{isRtl ? 'إجراءات سلسلة الحيازة والاستلام' : 'Chain of Custody Driver Action'}</span>
        </h4>

        {/* STEP 1: Driver Accepted -> Arrive at Pickup */}
        {order.status === 'driver_accepted' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300">
              {isRtl
                ? 'توجه إلى مستودع أو موقع الاستلام، واضغط على الزر عند وصولك للتأكيد مع العميل.'
                : 'Drive to the pickup location and click when you have arrived at the gate.'}
            </p>
            <button
              onClick={() => onArrivePickup(order.id)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <MapPin className="w-4 h-4" />
              <span>{isRtl ? 'وصلت لموقع الاستلام (I Have Arrived)' : 'I Have Arrived at Pickup'}</span>
            </button>
          </div>
        )}

        {/* STEP 2: Driver at Pickup -> Inspect & Take Photo */}
        {order.status === 'driver_at_pickup' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300">
              {isRtl
                ? 'قم بفحص البضاعة وتأكيد عدد الطرود (14 كرتونة)، والتقط صورة لتوثيق التحميل.'
                : 'Inspect goods, check condition and package count, then take an inspection photo.'}
            </p>

            <button
              onClick={() => setPhotoUploaded(true)}
              className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                photoUploaded
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-750'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>
                {photoUploaded
                  ? isRtl ? '✓ تم التقاط صورة الحمولة بنجاح' : '✓ Cargo Photo Captured & Verified'
                  : isRtl ? 'التقاط صورة لشحنة البضاعة على الصندوق' : 'Take Cargo Inspection Photo'}
              </span>
            </button>

            <button
              onClick={() => onConfirmPickup(order.id)}
              className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isRtl ? 'تأكيد الاستلام وبدء الرحلة' : 'Confirm Pickup & Start Transit'}</span>
            </button>
          </div>
        )}

        {/* STEP 3: In Transit -> Arrive at Dropoff */}
        {order.status === 'in_transit' && (
          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{isRtl ? 'السرعة الحالية:' : 'Current Speed:'}</span>
              <span className="font-mono font-bold text-emerald-400">64 km/h · Highway</span>
            </div>

            <button
              onClick={() => onArriveDropoff(order.id)}
              className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <MapPin className="w-4 h-4" />
              <span>{isRtl ? 'وصلت لوجهة التسليم (Arrived at Destination)' : 'I Have Arrived at Destination'}</span>
            </button>
          </div>
        )}

        {/* STEP 4: Arrived at Dropoff -> ENTER RECIPIENT 6-DIGIT OTP */}
        {order.status === 'driver_at_dropoff' && (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-200">
              {isRtl
                ? 'اطلب كود التسليم (OTP) المكون من 6 أرقام من المستلم لتأكيد استلام الشحنة وإغلاق الرحلة.'
                : 'Ask the recipient for their 6-digit delivery OTP to verify handover and release payment.'}
            </div>

            <form onSubmit={handleVerifyOtpSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isRtl ? 'أدخل كود الـ OTP المكون من 6 أرقام:' : 'Enter 6-Digit Delivery OTP:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={enteredOtp}
                    onChange={(e) => {
                      setEnteredOtp(e.target.value.replace(/\D/g, ''));
                      setOtpError(null);
                    }}
                    placeholder="482913"
                    className="w-full bg-slate-950 border-2 border-amber-500 font-mono font-extrabold text-2xl tracking-[0.25em] text-center text-amber-400 rounded-xl py-2.5 focus:outline-none"
                  />
                  <KeyRound className="w-5 h-5 text-amber-500 absolute left-3 top-3.5 opacity-60" />
                </div>
                {otpError && (
                  <p className="text-xs text-rose-400 mt-1 font-semibold">{otpError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={enteredOtp.length < 6}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{isRtl ? 'التحقق وإتمام الرحلة وصرف المستحقات' : 'Verify OTP & Complete Delivery'}</span>
              </button>
            </form>
          </div>
        )}

        {/* STEP 5: Completed */}
        {order.status === 'completed' && (
          <div className="text-center py-4 space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-extrabold text-white">
              {isRtl ? 'تم إتمام الرحلة بنجاح!' : 'Trip Successfully Completed!'}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              +{Math.round((order.finalAgreedPriceEgp || order.customerProposedPriceEgp) * 0.9)} EGP {isRtl ? 'أضيفت لمحفظتك' : 'credited to wallet'}
            </p>
          </div>
        )}
      </div>

      {/* Driver SOS & Safety Button */}
      <div className="pt-2">
        <button
          onClick={() => setSosModalOpen(true)}
          className="w-full bg-rose-950/60 hover:bg-rose-900 border border-rose-600/40 text-rose-300 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <AlertOctagon className="w-4 h-4 text-rose-400" />
          <span>{isRtl ? 'زر الطوارئ والسلامة (SOS & Assistance)' : 'Driver SOS & Road Assistance'}</span>
        </button>
      </div>

      {/* DRIVER CHAT DRAWER */}
      {showChat && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              {isRtl ? 'المحادثة مع العميل' : 'Chat with Customer'}
            </span>
            <button onClick={() => setShowChat(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2 py-1">
            {order.chatMessages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'driver' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-1.5 text-xs ${
                    m.sender === 'driver' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                  }`}
                >
                  <div>{m.text}</div>
                  <div className="text-[9px] opacity-70 font-mono mt-0.5 text-right">{m.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (chatText.trim()) {
                onSendMessage(order.id, chatText.trim());
                setChatText('');
              }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              placeholder={isRtl ? 'اكتب رسالة للعميل...' : 'Type a message...'}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
            <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* SOS MODAL */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-slate-900 border border-rose-600/40 rounded-2xl p-5 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-600/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isRtl ? 'بروتوكول طوارئ السائقين' : 'Driver Emergency Protocol'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isRtl
                ? 'في حالة وقوع عطل في المركبة أو حادث طريق، يتم إرسال موقعك الفوري لفريق عمليات Request Delivery وتنبيه العميل.'
                : 'In case of breakdown or road incident, your GPS coordinates are sent to Request Delivery operations support.'}
            </p>
            <div className="space-y-2">
              <a
                href="tel:19842"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2.5 rounded-xl block"
              >
                {isRtl ? 'اتصال بغرفة عمليات النقل (19842)' : 'Call Operations Dispatch (19842)'}
              </a>
              <button
                onClick={() => setSosModalOpen(false)}
                className="w-full bg-slate-800 text-slate-300 font-bold text-xs py-2 rounded-xl"
              >
                {isRtl ? 'إغلاق' : 'Dismiss'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
