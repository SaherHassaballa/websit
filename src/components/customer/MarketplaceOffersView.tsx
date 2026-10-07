import React from 'react';
import { DeliveryOrder, DriverOffer } from '../../types';
import { ShieldCheck, Star, Clock, MapPin, Truck, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';

interface MarketplaceOffersViewProps {
  order: DeliveryOrder;
  onAcceptOffer: (deliveryId: string, offerId: string) => void;
  onCancelOrder?: () => void;
  lang?: 'en' | 'ar';
}

export const MarketplaceOffersView: React.FC<MarketplaceOffersViewProps> = ({
  order,
  onAcceptOffer,
  onCancelOrder,
  lang = 'en',
}) => {
  const isRtl = lang === 'ar';

  return (
    <div className="space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Radar scanning header */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/30 rounded-2xl p-4 text-center relative overflow-hidden">
        {/* Subtle radar ripples */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-32 h-32 border border-blue-400 rounded-full animate-ping" />
          <div className="w-48 h-48 border border-blue-400 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2 border border-blue-500/40">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />
          </div>
          <h3 className="text-base font-bold text-white">
            {isRtl ? 'جاري البحث عن كباتن وسيارات قريبة...' : 'Scanning for Available Drivers...'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xs">
            {isRtl
              ? `تم إرسال طلبك لسائقي (${order.vehicleRequired}) في محيط الاستلام. قارن عروض الأسعار واختر السائق المناسب.`
              : `Order broadcasted to nearby ${order.vehicleRequired} drivers. Review driver offers and select who you prefer.`}
          </p>
        </div>
      </div>

      {/* Broadcast Request Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-slate-400">#{order.trackingCode}</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
            {isRtl ? 'عرضك:' : 'Your Offer:'} {order.customerProposedPriceEgp} EGP
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="truncate">
              <strong>{isRtl ? 'استلام: ' : 'From: '}</strong>
              {isRtl ? order.pickup.nameAr : order.pickup.nameEn}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="truncate">
              <strong>{isRtl ? 'تسليم: ' : 'To: '}</strong>
              {isRtl ? order.destination.nameAr : order.destination.nameEn}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
          <span>{order.distanceKm} km · {order.weightKg} kg</span>
          <span>{order.description}</span>
        </div>
      </div>

      {/* Driver Offers Header */}
      <div className="flex items-center justify-between px-1">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {isRtl ? `عروض السائقين المستلمة (${order.offers.length})` : `Incoming Driver Offers (${order.offers.length})`}
        </h4>
        <span className="text-[11px] text-emerald-400 font-medium">
          {isRtl ? 'اختر أفضل سائق' : 'Tap to accept'}
        </span>
      </div>

      {/* Offers List */}
      <div className="space-y-3">
        {order.offers.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-center text-xs text-slate-400">
            {isRtl ? 'ننتظر رد السائقين الأقرب إليك حالياً...' : 'Waiting for incoming driver bids...'}
          </div>
        ) : (
          order.offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 transition-all shadow-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={offer.driverPhoto}
                      alt={offer.driverName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                    />
                    {offer.verified && (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-0.5 rounded-full" title="Verified Driver">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{offer.driverName}</span>
                      {offer.verified && (
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-medium border border-emerald-500/20">
                          {isRtl ? 'موثق ✓' : 'Verified ✓'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-400 font-bold font-mono">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {offer.rating}
                      </span>
                      <span>·</span>
                      <span>{offer.completedDeliveries} {isRtl ? 'رحلة' : 'deliveries'}</span>
                    </div>

                    <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1.5">
                      <Truck className="w-3 h-3 text-slate-400" />
                      <span>{offer.vehicleModel}</span>
                      <span className="text-slate-500 font-mono">({offer.vehiclePlate})</span>
                    </div>
                  </div>
                </div>

                {/* Price Quote */}
                <div className="text-right">
                  <div className="text-lg font-black font-mono text-emerald-400">
                    {offer.offeredPriceEgp} <span className="text-xs">EGP</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>~{offer.etaMinutesToPickup} min away</span>
                  </div>
                </div>
              </div>

              {/* Accept Offer Action */}
              <button
                onClick={() => onAcceptOffer(order.id, offer.id)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform shadow-md shadow-emerald-500/20"
              >
                <span>{isRtl ? `قبول السائق وتأكيد الرحلة (${offer.offeredPriceEgp} ج.م)` : `Accept Driver (${offer.offeredPriceEgp} EGP)`}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
