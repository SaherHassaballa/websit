import React, { useState } from 'react';
import { LocationPoint, VehicleType, ShipmentCategory } from '../../types';
import { EGYPTIAN_LOCATIONS, calculateDistanceAndEta } from '../../data/egyptianLocations';
import { VEHICLE_OPTIONS, SHIPMENT_CATEGORIES, recommendVehicle, calculatePriceRange } from '../../data/vehicles';
import { InteractiveMap } from '../common/InteractiveMap';
import {
  X,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Package,
  Weight,
  Sparkles,
  Banknote,
  ShieldCheck,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface CreateDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  lang?: 'en' | 'ar';
}

export const CreateDeliveryModal: React.FC<CreateDeliveryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lang = 'en',
}) => {
  const isRtl = lang === 'ar';
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Locations
  const [pickup, setPickup] = useState<LocationPoint>(EGYPTIAN_LOCATIONS[0]); // Zagazig Warehouse
  const [destination, setDestination] = useState<LocationPoint>(EGYPTIAN_LOCATIONS[1]); // Cairo Downtown

  // Step 2: Shipment Details
  const [category, setCategory] = useState<ShipmentCategory>('commercial_goods');
  const [description, setDescription] = useState('14 cartons of industrial machinery parts');
  const [quantity, setQuantity] = useState(14);
  const [weightKg, setWeightKg] = useState(280);
  const [lengthCm, setLengthCm] = useState(120);
  const [widthCm, setWidthCm] = useState(80);
  const [heightCm, setHeightCm] = useState(90);
  const [isFragile, setIsFragile] = useState(false);
  const [requiresSpecialHandling, setRequiresSpecialHandling] = useState(false);
  const [loadingAssistanceNeeded, setLoadingAssistanceNeeded] = useState(true);
  const [unloadingAssistanceNeeded, setUnloadingAssistanceNeeded] = useState(true);

  // Recommendation
  const rec = recommendVehicle({
    weightKg,
    lengthCm,
    widthCm,
    heightCm,
    quantity,
    category,
  });

  // Step 3: Vehicle selection (defaults to recommended)
  const [vehicleRequired, setVehicleRequired] = useState<VehicleType>('pickup');

  // Step 4: Pricing & Offer
  const { distanceKm, drivingMinutes, formattedEta } = calculateDistanceAndEta(pickup, destination);
  const { minPriceEgp, maxPriceEgp, suggestedPriceEgp } = calculatePriceRange(vehicleRequired, distanceKm);
  const [customerProposedPriceEgp, setCustomerProposedPriceEgp] = useState<number>(420);
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'wallet' | 'card'>('cash_on_delivery');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 2) {
      // Auto-set vehicle to recommended if user hasn't explicitly changed it
      setVehicleRequired(rec.recommendedVehicle);
    }
    if (step === 3) {
      // Recalculate suggested price
      const price = calculatePriceRange(vehicleRequired, distanceKm);
      setCustomerProposedPriceEgp(price.suggestedPriceEgp);
    }
    setStep((s) => (s < 4 ? ((s + 1) as any) : s));
  };

  const handleBack = () => {
    setStep((s) => (s > 1 ? ((s - 1) as any) : s));
  };

  const handleFinalSubmit = () => {
    onSubmit({
      customerName: 'Kareem Mansour',
      customerPhone: '+20 100 812 3991',
      pickup,
      destination,
      category,
      description,
      quantity,
      weightKg,
      dimensionsCm: { length: lengthCm, width: widthCm, height: heightCm },
      isFragile,
      requiresSpecialHandling,
      loadingAssistanceNeeded,
      unloadingAssistanceNeeded,
      vehicleRequired,
      customerProposedPriceEgp,
      paymentMethod,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-[#0f172a]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                {isRtl ? `خطوة ${step} من 4` : `Step ${step} of 4`}
              </span>
              <h2 className="text-base font-bold text-white">
                {step === 1 && (isRtl ? 'تحديد مسار الشحنة' : 'Select Route')}
                {step === 2 && (isRtl ? 'تفاصيل البضاعة' : 'Shipment Details')}
                {step === 3 && (isRtl ? 'اختيار وسيلة النقل' : 'Select Vehicle')}
                {step === 4 && (isRtl ? 'تحديد السعر والعرض' : 'Your Proposed Offer')}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: ROUTE & LOCATIONS */}
          {step === 1 && (
            <div className="space-y-4">
              <InteractiveMap pickup={pickup} destination={destination} heightClass="h-44" lang={lang} />

              {/* Distance and ETA pill */}
              <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-400">{isRtl ? 'المسافة الإجمالية:' : 'Total Distance:'}</span>
                  <span className="text-sm font-bold text-white font-mono">{distanceKm} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{isRtl ? 'وقت القيادة التقديري:' : 'Estimated Time:'}</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">{formattedEta}</span>
                </div>
              </div>

              {/* Pickup Location Selection */}
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {isRtl ? 'نقطة الاستلام (التحميل)' : 'Pickup Location (Point A)'}
                </label>
                <select
                  value={pickup.id}
                  onChange={(e) => {
                    const found = EGYPTIAN_LOCATIONS.find((l) => l.id === e.target.value);
                    if (found) setPickup(found);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {EGYPTIAN_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {isRtl ? loc.nameAr : loc.nameEn} ({isRtl ? loc.cityAr : loc.cityEn})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1 px-1">
                  {isRtl ? pickup.addressAr : pickup.addressEn}
                </p>
              </div>

              {/* Destination Location Selection */}
              <div>
                <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {isRtl ? 'نقطة الوصول (التسليم)' : 'Destination (Point B)'}
                </label>
                <select
                  value={destination.id}
                  onChange={(e) => {
                    const found = EGYPTIAN_LOCATIONS.find((l) => l.id === e.target.value);
                    if (found) setDestination(found);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  {EGYPTIAN_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id} disabled={loc.id === pickup.id}>
                      {isRtl ? loc.nameAr : loc.nameEn} ({isRtl ? loc.cityAr : loc.cityEn})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1 px-1">
                  {isRtl ? destination.addressAr : destination.addressEn}
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPMENT DETAILS */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {isRtl ? 'نوع البضاعة / التصنيف' : 'Shipment Category'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SHIPMENT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                        category === cat.id
                          ? 'border-amber-500 bg-amber-500/10 text-white font-medium'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-xs truncate w-full">{isRtl ? cat.nameAr : cat.nameEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isRtl ? 'وصف الشحنة' : 'Detailed Description'}
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isRtl ? 'مثال: 14 كرتونة قطع غيار معدات ثقيلة' : 'e.g. 14 cartons of machinery spare parts'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isRtl ? 'الوزن التقريبي (كجم)' : 'Approx. Weight (kg)'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">KG</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isRtl ? 'عدد الطرود / الكراتين' : 'Package Count'}
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isRtl ? 'الأبعاد التقريبية (طول × عرض × ارتفاع سم)' : 'Approx Dimensions (L × W × H in cm)'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="L (cm)"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 text-center font-mono"
                  />
                  <input
                    type="number"
                    placeholder="W (cm)"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 text-center font-mono"
                  />
                  <input
                    type="number"
                    placeholder="H (cm)"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 text-center font-mono"
                  />
                </div>
              </div>

              {/* Special options */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={isFragile}
                    onChange={(e) => setIsFragile(e.target.checked)}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <span>{isRtl ? 'شحنة قابلة للكسر (Fragile)' : 'Fragile / Requires delicate handling'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={loadingAssistanceNeeded}
                    onChange={(e) => setLoadingAssistanceNeeded(e.target.checked)}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <span>{isRtl ? 'مطلوب مساعدة في التحميل' : 'Loading assistance required'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={unloadingAssistanceNeeded}
                    onChange={(e) => setLoadingAssistanceNeeded(e.target.checked)}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <span>{isRtl ? 'مطلوب مساعدة في التعتيق والتنزيل' : 'Unloading assistance required'}</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: VEHICLE SELECTION */}
          {step === 3 && (
            <div className="space-y-3">
              {/* Intelligent Recommendation Alert */}
              <div className="bg-blue-950/60 border border-blue-600/40 rounded-xl p-3 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-blue-200">
                    {isRtl ? 'ترشيح المنظومة الذكي:' : 'System Recommendation:'}
                  </div>
                  <div className="text-xs text-blue-300 mt-0.5">
                    {isRtl ? rec.reasonAr : rec.reasonEn}
                  </div>
                </div>
              </div>

              {/* Vehicles Grid */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {VEHICLE_OPTIONS.map((veh) => {
                  const isRec = rec.recommendedVehicle === veh.id;
                  const isSelected = vehicleRequired === veh.id;

                  return (
                    <div
                      key={veh.id}
                      onClick={() => setVehicleRequired(veh.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{veh.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">
                              {isRtl ? veh.nameAr : veh.nameEn}
                            </span>
                            {isRec && (
                              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                                {isRtl ? 'موصى به' : 'Recommended'}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {isRtl ? `حمولة حتى ${veh.maxWeightKg} كجم • ${veh.sampleVehicles}` : `Max payload: ${veh.maxWeightKg} kg • ${veh.sampleVehicles}`}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="w-5 h-5 rounded-full border flex items-center justify-center ml-2 border-slate-600">
                          {isSelected && <div className="w-3 h-3 rounded-full bg-amber-500" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: inDrive PRICING MODEL & CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-5">
              {/* Estimated Price Range Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{isRtl ? 'سعر السوق التقديري لهذه المسافة:' : 'Estimated Fair Market Range:'}</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    EGP {minPriceEgp} – {maxPriceEgp}
                  </span>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    {isRtl ? 'عرضك المقترح للسائقين (ج.م):' : 'Your Proposed Offer to Drivers (EGP):'}
                  </label>

                  {/* Big inDrive Price Input with Step Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCustomerProposedPriceEgp((p) => Math.max(minPriceEgp - 40, p - 20))}
                      className="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      -20
                    </button>

                    <div className="flex-1 relative">
                      <input
                        type="number"
                        value={customerProposedPriceEgp}
                        onChange={(e) => setCustomerProposedPriceEgp(Number(e.target.value))}
                        className="w-full bg-slate-950 border-2 border-amber-500 text-amber-400 font-mono font-extrabold text-2xl text-center rounded-xl py-2.5 focus:outline-none"
                      />
                      <span className="absolute right-3 top-4 text-xs font-mono text-slate-500">EGP</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCustomerProposedPriceEgp((p) => p + 20)}
                      className="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      +20
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    {isRtl
                      ? 'يمكن للسائقين قبول هذا السعر مباشرة أو تقديم عروض أسعار مقابلة لتختار منها.'
                      : 'Nearby drivers can accept this offer directly or send counter-offers for you to choose from.'}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {isRtl ? 'طريقة الدفع' : 'Payment Method'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-300'
                    }`}
                  >
                    💵 {isRtl ? 'كاش عند التسليم' : 'Cash on Delivery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                      paymentMethod === 'wallet'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-300'
                    }`}
                  >
                    📱 {isRtl ? 'إنستاباي / محفظة' : 'InstaPay / Wallet'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-300'
                    }`}
                  >
                    💳 {isRtl ? 'فيزا / ماستركارد' : 'Bank Card'}
                  </button>
                </div>
              </div>

              {/* Security & OTP Guarantee Notice */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {isRtl
                    ? 'أمان كامل مع كود التسليم السري (OTP) وسلسلة حيازة موثقة بالصور وGPS.'
                    : 'End-to-end custody with 6-digit delivery OTP & GPS audit tracking.'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-4 border-t border-slate-800 flex items-center justify-between shrink-0 bg-[#0c1322]">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {isRtl ? 'السابق' : 'Back'}
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors shadow-lg shadow-amber-500/20"
            >
              {isRtl ? 'متابعة' : 'Next'}
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20 animate-pulse"
            >
              <Package className="w-4 h-4" />
              {isRtl ? 'بث الطلب لسائقي النقل الآن' : 'Broadcast Delivery Request'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
