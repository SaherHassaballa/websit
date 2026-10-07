import React, { useState } from 'react';
import { DeliveryOrder } from '../../types';
import { InteractiveMap } from '../common/InteractiveMap';
import {
  ShieldCheck,
  Phone,
  MessageSquare,
  AlertTriangle,
  Lock,
  CheckCircle2,
  Clock,
  Camera,
  Star,
  ChevronDown,
  ChevronUp,
  X,
  Send,
} from 'lucide-react';

interface ActiveDeliveryViewProps {
  order: DeliveryOrder;
  onSendMessage: (deliveryId: string, text: string) => void;
  onSubmitRating: (deliveryId: string, rating: any) => void;
  onReportDispute: (deliveryId: string, reason: string) => void;
  lang?: 'en' | 'ar';
}

export const ActiveDeliveryView: React.FC<ActiveDeliveryViewProps> = ({
  order,
  onSendMessage,
  onSubmitRating,
  onReportDispute,
  lang = 'en',
}) => {
  const isRtl = lang === 'ar';
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(order.status === 'completed' && !order.driverRating);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [punctuality, setPunctuality] = useState(true);
  const [carefulHandling, setCarefulHandling] = useState(true);
  const [goodCommunication, setGoodCommunication] = useState(true);

  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const statusTitle =
    order.status === 'driver_accepted'
      ? isRtl ? 'الكابتن في طريقه لموقع الاستلام' : 'Driver en route to pickup'
      : order.status === 'driver_at_pickup'
      ? isRtl ? 'وصل السائق لموقع الاستلام' : 'Driver arrived at pickup'
      : order.status === 'pickup_confirmed'
      ? isRtl ? 'تم التحميل وتأكيد الاستلام' : 'Pickup confirmed & loaded'
      : order.status === 'in_transit'
      ? isRtl ? 'الشحنة في الطريق للوجهة' : 'Shipment in transit to destination'
      : order.status === 'driver_at_dropoff'
      ? isRtl ? 'وصل السائق للوجهة - بانتظار الكود' : 'Driver arrived - awaiting OTP'
      : isRtl ? 'تم اكتمال التسليم بنجاح' : 'Delivery completed successfully';

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(order.id, chatInput.trim());
    setChatInput('');
  };

  const handleRatingSubmit = () => {
    onSubmitRating(order.id, {
      stars: ratingStars,
      comment: ratingComment,
      punctuality,
      carefulHandling,
      goodCommunication,
    });
    setShowRatingModal(false);
  };

  return (
    <div className="space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Live Map with Route and Driver Marker */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-800">
        <InteractiveMap
          pickup={order.pickup}
          destination={order.destination}
          driverLocation={order.assignedDriver?.currentLocation}
          vehicleType={order.vehicleRequired}
          status={order.status}
          heightClass="h-56"
          lang={lang}
        />

        {/* Floating Status Pill over Map */}
        <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white">{statusTitle}</span>
          </div>
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-1.5 rounded-xl shadow-lg text-[11px] font-mono text-amber-400 font-bold">
            {order.finalAgreedPriceEgp || order.customerProposedPriceEgp} EGP
          </div>
        </div>
      </div>

      {/* 6-DIGIT DELIVERY SECURITY OTP CARD */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-4 text-center shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          <Lock className="w-3.5 h-3.5" />
          <span>{isRtl ? 'كود أمان التسليم السري (OTP)' : 'Delivery Security Code (OTP)'}</span>
        </div>

        <div className="my-2 py-2 px-4 bg-slate-950/80 border border-amber-500/30 rounded-xl inline-block tracking-[0.35em] font-mono font-black text-3xl text-amber-300 shadow-inner">
          {order.deliveryOtp.slice(0, 3)} {order.deliveryOtp.slice(3)}
        </div>

        <p className="text-[11px] text-slate-300 max-w-sm mx-auto leading-relaxed">
          {isRtl
            ? 'أعطِ هذا الكود للسائق عند وصوله لوجهة التسليم وتفقد البضاعة. لن يتمكن السائق من إغلاق الرحلة بدون هذا الكود.'
            : 'Share this 6-digit code with the driver ONLY after inspecting the delivered goods. The driver cannot close the trip without it.'}
        </p>

        {order.isOtpVerified && (
          <div className="mt-2 text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isRtl ? 'تم التحقق من الكود بنجاح' : 'OTP Verified by Driver'}</span>
          </div>
        )}
      </div>

      {/* Driver Information Bar */}
      {order.assignedDriver && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={order.assignedDriver.photo}
                  alt={order.assignedDriver.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                />
                {order.assignedDriver.verified && (
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">{order.assignedDriver.name}</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20">
                    {isRtl ? 'كابتن معتمد ✓' : 'Verified Driver ✓'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1 text-amber-400 font-bold font-mono">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {order.assignedDriver.rating}
                  </span>
                  <span>·</span>
                  <span>{order.assignedDriver.completedTrips} {isRtl ? 'رحلة سابقة' : 'trips'}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5 font-medium">
                  {order.assignedDriver.vehicleModel} · <span className="font-mono text-slate-400">{order.assignedDriver.vehiclePlate}</span>
                </div>
              </div>
            </div>

            {/* Call & Chat Quick Actions */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${order.assignedDriver.phone}`}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700"
                title="Call Driver"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
              </a>
              <button
                onClick={() => setShowChat(!showChat)}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 relative"
                title="Chat with Driver"
              >
                <MessageSquare className="w-4 h-4 text-blue-400" />
                {order.chatMessages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {order.chatMessages.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pickup Photo Thumbnail if verified */}
      {order.pickupPhotoUrl && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={order.pickupPhotoUrl}
              alt="Pickup Verification"
              className="w-14 h-14 rounded-lg object-cover border border-slate-700"
            />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isRtl ? 'صورة توثيق الاستلام والحمولة' : 'Pickup Inspection Photo'}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isRtl ? 'تم التقاطها عند التحميل لضمان سلامة الطرد' : 'Captured by driver before departure'}
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">✓ {isRtl ? 'موثقة' : 'Verified'}</span>
        </div>
      )}

      {/* Expandable Chain of Custody Audit Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="w-full p-4 flex items-center justify-between text-xs font-bold text-slate-200 hover:bg-slate-850 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>{isRtl ? `سجل وسلسلة حيازة الشحنة (${order.timeline.length} خطوات)` : `Chain of Custody Timeline (${order.timeline.length} events)`}</span>
          </div>
          {showTimeline ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showTimeline && (
          <div className="p-4 pt-0 space-y-3 border-t border-slate-800/80">
            {order.timeline.map((evt, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="font-mono text-slate-500 text-[11px] pt-0.5 shrink-0 w-10">
                  {evt.timestamp}
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <div className="font-bold text-slate-200">
                    {isRtl ? evt.titleAr : evt.titleEn}
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {isRtl ? evt.descriptionAr : evt.descriptionEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* IN-APP CHAT DRAWER */}
      {showChat && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              {isRtl ? 'المحادثة المباشرة مع الكابتن' : 'In-App Chat with Driver'}
            </span>
            <button onClick={() => setShowChat(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Preset Action Chips */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {[
              isRtl ? 'أنا عند البوابة' : "I'm at the gate",
              isRtl ? 'مخزن رقم 4' : 'Warehouse 4',
              isRtl ? 'كلمني عند الوصول' : 'Call when arrived',
            ].map((chip, i) => (
              <button
                key={i}
                onClick={() => onSendMessage(order.id, chip)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="max-h-48 overflow-y-auto space-y-2 py-2">
            {order.chatMessages.map((msg) => {
              const isMe = msg.sender === 'customer';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-1.5 text-xs ${
                      isMe ? 'bg-amber-500 text-slate-950 font-medium' : 'bg-slate-800 text-slate-100'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className={`text-[9px] mt-0.5 text-right opacity-70 font-mono`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={isRtl ? 'اكتب رسالة للكابتن...' : 'Type a message...'}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-500 text-slate-950 px-3.5 py-2 rounded-xl font-bold hover:bg-amber-400"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Footer Support & Dispute Row */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-2">
        <button
          onClick={() => setDisputeModalOpen(true)}
          className="flex items-center gap-1.5 text-rose-400 hover:underline"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{isRtl ? 'الإبلاغ عن مشكلة في الشحنة' : 'Report Cargo Issue / Dispute'}</span>
        </button>
        <span className="font-mono text-[11px] text-slate-500">#{order.trackingCode}</span>
      </div>

      {/* DISPUTE MODAL */}
      {disputeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>{isRtl ? 'فتح تذكرة نزاع / مشكلة' : 'Open Dispute Ticket'}</span>
              </h3>
              <button onClick={() => setDisputeModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300">
              {isRtl
                ? 'سيتم تجميد التسليم ومراجعة سلسلة الحيازة وصور التحميل وGPS من قبل فريق الإدارة فوراً.'
                : 'Delivery custody audit will be reviewed by admin operations immediately.'}
            </p>
            <textarea
              rows={3}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder={isRtl ? 'اشرح المشكلة بالتفصيل...' : 'Describe the issue in detail...'}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100"
            />
            <button
              onClick={() => {
                if (disputeReason.trim()) {
                  onReportDispute(order.id, disputeReason);
                  setDisputeModalOpen(false);
                }
              }}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2.5 rounded-xl"
            >
              {isRtl ? 'إرسال التذكرة للإدارة' : 'Submit Dispute to Admin'}
            </button>
          </div>
        </div>
      )}

      {/* RATING MODAL (POST-COMPLETION) */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isRtl ? 'تم اكتمال التسليم بنجاح!' : 'Delivery Successfully Completed!'}
            </h3>
            <p className="text-xs text-slate-300">
              {isRtl ? `كيف كانت تجربتك مع الكابتن ${order.assignedDriver?.name}؟` : `How was your experience with driver ${order.assignedDriver?.name}?`}
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingStars(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= ratingStars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Quality Badges */}
            <div className="flex flex-wrap justify-center gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => setPunctuality(!punctuality)}
                className={`px-2.5 py-1 rounded-lg border ${
                  punctuality ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                ⏱️ {isRtl ? 'التزام بالميعاد' : 'Punctual'}
              </button>
              <button
                type="button"
                onClick={() => setCarefulHandling(!carefulHandling)}
                className={`px-2.5 py-1 rounded-lg border ${
                  carefulHandling ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                📦 {isRtl ? 'عناية فائقة بالبضاعة' : 'Careful Handling'}
              </button>
              <button
                type="button"
                onClick={() => setGoodCommunication(!goodCommunication)}
                className={`px-2.5 py-1 rounded-lg border ${
                  goodCommunication ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                🤝 {isRtl ? 'تواصل محترم' : 'Polite Communication'}
              </button>
            </div>

            <textarea
              rows={2}
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder={isRtl ? 'اكتب كلمة شكر أو تعليق للكابتن...' : 'Leave a comment...'}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100"
            />

            <button
              onClick={handleRatingSubmit}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl shadow-lg shadow-amber-500/20"
            >
              {isRtl ? 'إرسال التقييم' : 'Submit Rating'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
