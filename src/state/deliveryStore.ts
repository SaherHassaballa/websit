import { useState, useEffect } from 'react';
import {
  DeliveryOrder,
  DriverProfile,
  DriverOffer,
  DisputeRecord,
  DeliveryStatus,
  ChatMessage,
  VehicleType,
  ShipmentCategory,
  LocationPoint,
} from '../types';
import { INITIAL_DRIVERS, INITIAL_DELIVERIES, INITIAL_DISPUTES } from '../data/mockData';
import { EGYPTIAN_LOCATIONS, calculateDistanceAndEta } from '../data/egyptianLocations';
import { VEHICLE_OPTIONS, calculatePriceRange, recommendVehicle } from '../data/vehicles';

const STORAGE_KEYS = {
  DELIVERIES: 'rd_deliveries_v1',
  DRIVERS: 'rd_drivers_v1',
  DISPUTES: 'rd_disputes_v1',
  ACTIVE_DRIVER_ID: 'rd_active_driver_id_v1',
  APP_ROLE: 'rd_app_role_v1',
  LANG: 'rd_lang_v1',
};

// Global in-memory cache to sync across re-renders
let stateDeliveries: DeliveryOrder[] = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DELIVERIES);
    if (saved) return JSON.parse(saved);
  } catch {}
  return INITIAL_DELIVERIES;
})();

let stateDrivers: DriverProfile[] = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DRIVERS);
    if (saved) return JSON.parse(saved);
  } catch {}
  return INITIAL_DRIVERS;
})();

let stateDisputes: DisputeRecord[] = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DISPUTES);
    if (saved) return JSON.parse(saved);
  } catch {}
  return INITIAL_DISPUTES;
})();

let activeDriverId = 'drv_ahmed_hilux';
let listeners: Array<() => void> = [];

function notify() {
  try {
    localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(stateDeliveries));
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(stateDrivers));
    localStorage.setItem(STORAGE_KEYS.DISPUTES, JSON.stringify(stateDisputes));
  } catch {}
  listeners.forEach((l) => l());
}

export function useDeliveryStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  const deliveries = stateDeliveries;
  const drivers = stateDrivers;
  const disputes = stateDisputes;
  const activeDriver = drivers.find((d) => d.id === activeDriverId) || drivers[0];
  const activeDelivery = deliveries.find((d) => d.status !== 'completed' && d.status !== 'cancelled') || null;

  // 1. Create a new delivery request from Customer
  const createDelivery = (params: {
    customerName: string;
    customerPhone: string;
    pickup: LocationPoint;
    destination: LocationPoint;
    category: ShipmentCategory;
    description: string;
    quantity: number;
    weightKg: number;
    dimensionsCm: { length: number; width: number; height: number };
    isFragile: boolean;
    requiresSpecialHandling: boolean;
    loadingAssistanceNeeded: boolean;
    unloadingAssistanceNeeded: boolean;
    vehicleRequired: VehicleType;
    customerProposedPriceEgp: number;
    paymentMethod: 'cash_on_delivery' | 'wallet' | 'card';
  }): DeliveryOrder => {
    const { distanceKm, drivingMinutes } = calculateDistanceAndEta(params.pickup, params.destination);
    const { minPriceEgp, maxPriceEgp } = calculatePriceRange(params.vehicleRequired, distanceKm);
    const rec = recommendVehicle({
      weightKg: params.weightKg,
      lengthCm: params.dimensionsCm.length,
      widthCm: params.dimensionsCm.width,
      heightCm: params.dimensionsCm.height,
      category: params.category,
    });

    // Random 6-digit delivery OTP for recipient verification
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const trackingCode = `RD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newId = `req_${Date.now()}`;

    // Auto-generate realistic nearby driver offers within 2-4 seconds
    const matchingDrivers = drivers.filter(
      (d) => d.isOnline && d.verificationStatus === 'verified' && (d.vehicle.type === params.vehicleRequired || d.vehicle.maxPayloadKg >= params.weightKg)
    );

    const initialOffers: DriverOffer[] = matchingDrivers.slice(0, 3).map((d, index) => {
      // Counter-offer or accept customer price
      const priceVariation = index === 0 ? params.customerProposedPriceEgp : Math.round((params.customerProposedPriceEgp * (1 + (index * 0.05))) / 10) * 10;
      return {
        id: `off_${Date.now()}_${index}`,
        driverId: d.id,
        driverName: d.fullName,
        driverPhone: d.phone,
        driverPhoto: d.avatarUrl,
        rating: d.rating,
        completedDeliveries: d.totalDeliveries,
        vehicleType: d.vehicle.type,
        vehicleModel: d.vehicle.model,
        vehiclePlate: d.vehicle.plateNumber,
        offeredPriceEgp: priceVariation,
        driverDistanceToPickupKm: Math.round((2.5 + index * 1.8) * 10) / 10,
        etaMinutesToPickup: Math.round(8 + index * 5),
        verified: true,
        createdAt: new Date().toISOString(),
      };
    });

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: DeliveryOrder = {
      id: newId,
      trackingCode,
      customerName: params.customerName || 'Ahmed Mostafa',
      customerPhone: params.customerPhone || '+20 101 982 7100',
      pickup: params.pickup,
      destination: params.destination,
      distanceKm,
      estimatedDrivingMinutes: drivingMinutes,
      category: params.category,
      categoryLabelEn: params.category.replace('_', ' ').toUpperCase(),
      categoryLabelAr: 'بضائع وشحنات',
      description: params.description,
      quantity: params.quantity,
      weightKg: params.weightKg,
      dimensionsCm: params.dimensionsCm,
      isFragile: params.isFragile,
      requiresSpecialHandling: params.requiresSpecialHandling,
      loadingAssistanceNeeded: params.loadingAssistanceNeeded,
      unloadingAssistanceNeeded: params.unloadingAssistanceNeeded,
      vehicleRequired: params.vehicleRequired,
      recommendedVehicle: rec.recommendedVehicle,
      suggestedMinPriceEgp: minPriceEgp,
      suggestedMaxPriceEgp: maxPriceEgp,
      customerProposedPriceEgp: params.customerProposedPriceEgp,
      paymentMethod: params.paymentMethod,
      status: 'pending_offers',
      deliveryOtp: randomOtp,
      isOtpVerified: false,
      createdAt: now.toISOString(),
      offers: initialOffers,
      timeline: [
        {
          timestamp: timeStr,
          status: 'pending_offers',
          titleEn: 'Order Broadcasted to Drivers',
          titleAr: 'تم بث طلب النقل للسائقين',
          descriptionEn: `Proposed price: ${params.customerProposedPriceEgp} EGP. Searching nearby ${params.vehicleRequired}s.`,
          descriptionAr: `السعر المقترح: ${params.customerProposedPriceEgp} ج.م. جاري البحث عن السائقين القريبين.`,
          actor: 'customer',
        },
      ],
      chatMessages: [],
    };

    stateDeliveries = [newOrder, ...stateDeliveries];
    notify();
    return newOrder;
  };

  // 2. Customer selects & accepts a driver offer
  const acceptDriverOffer = (deliveryId: string, offerId: string) => {
    const delivery = stateDeliveries.find((d) => d.id === deliveryId);
    if (!delivery) return;
    const offer = delivery.offers.find((o) => o.id === offerId);
    if (!offer) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updated: DeliveryOrder = {
      ...delivery,
      status: 'driver_accepted',
      finalAgreedPriceEgp: offer.offeredPriceEgp,
      assignedDriver: {
        id: offer.driverId,
        name: offer.driverName,
        phone: offer.driverPhone,
        photo: offer.driverPhoto,
        rating: offer.rating,
        completedTrips: offer.completedDeliveries,
        vehicleType: offer.vehicleType,
        vehicleModel: offer.vehicleModel,
        vehiclePlate: offer.vehiclePlate,
        verified: offer.verified,
        currentLocation: {
          lat: delivery.pickup.lat - 0.03,
          lng: delivery.pickup.lng - 0.02,
        },
      },
      timeline: [
        ...delivery.timeline,
        {
          timestamp: timeStr,
          status: 'driver_accepted',
          titleEn: `Driver Confirmed: ${offer.driverName}`,
          titleAr: `تم الاتفاق مع السائق: ${offer.driverName}`,
          descriptionEn: `Agreed price: ${offer.offeredPriceEgp} EGP. Driver is heading to pickup.`,
          descriptionAr: `السعر المتفق عليه: ${offer.offeredPriceEgp} ج.م. السائق في طريقه لنقطة الاستلام.`,
          actor: 'customer',
        },
      ],
    };

    stateDeliveries = stateDeliveries.map((d) => (d.id === deliveryId ? updated : d));
    notify();
  };

  // 3. Driver makes custom counter offer
  const submitDriverCounterOffer = (deliveryId: string, priceEgp: number) => {
    const delivery = stateDeliveries.find((d) => d.id === deliveryId);
    if (!delivery || !activeDriver) return;

    const existingOfferIndex = delivery.offers.findIndex((o) => o.driverId === activeDriver.id);
    const newOffer: DriverOffer = {
      id: `off_${Date.now()}`,
      driverId: activeDriver.id,
      driverName: activeDriver.fullName,
      driverPhone: activeDriver.phone,
      driverPhoto: activeDriver.avatarUrl,
      rating: activeDriver.rating,
      completedDeliveries: activeDriver.totalDeliveries,
      vehicleType: activeDriver.vehicle.type,
      vehicleModel: activeDriver.vehicle.model,
      vehiclePlate: activeDriver.vehicle.plateNumber,
      offeredPriceEgp: priceEgp,
      driverDistanceToPickupKm: 3.1,
      etaMinutesToPickup: 9,
      verified: activeDriver.verificationStatus === 'verified',
      createdAt: new Date().toISOString(),
    };

    let updatedOffers = [...delivery.offers];
    if (existingOfferIndex >= 0) {
      updatedOffers[existingOfferIndex] = newOffer;
    } else {
      updatedOffers.unshift(newOffer);
    }

    stateDeliveries = stateDeliveries.map((d) =>
      d.id === deliveryId ? { ...d, offers: updatedOffers } : d
    );
    notify();
  };

  // 4. Driver Flow Steps
  const driverArriveAtPickup = (deliveryId: string) => {
    const delivery = stateDeliveries.find((d) => d.id === deliveryId);
    if (!delivery) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updated: DeliveryOrder = {
      ...delivery,
      status: 'driver_at_pickup',
      timeline: [
        ...delivery.timeline,
        {
          timestamp: timeStr,
          status: 'driver_at_pickup',
          titleEn: 'Driver Arrived at Pickup',
          titleAr: 'وصل السائق إلى نقطة الاستلام',
          descriptionEn: `Driver arrived at ${delivery.pickup.nameEn}. Ready for package inspection.`,
          descriptionAr: `وصل السائق إلى ${delivery.pickup.nameAr}. جاهز لفحص وتحميل البضاعة.`,
          gps: { lat: delivery.pickup.lat, lng: delivery.pickup.lng },
          actor: 'driver',
        },
      ],
    };

    stateDeliveries = stateDeliveries.map((d) => (d.id === deliveryId ? updated : d));
    notify();
  };

  const confirmPickupAndStartTransit = (deliveryId: string, photoUrl?: string) => {
    const delivery = stateDeliveries.find((d) => d.id === deliveryId);
    if (!delivery) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updated: DeliveryOrder = {
      ...delivery,
      status: 'in_transit',
      pickupPhotoUrl: photoUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
      timeline: [
        ...delivery.timeline,
        {
          timestamp: timeStr,
          status: 'pickup_confirmed',
          titleEn: 'Pickup Confirmed & Photo Uploaded',
          titleAr: 'تم تأكيد الاستلام وتوثيق الشحنة بالصورة',
          descriptionEn: 'Goods verified and safely secured on vehicle.',
          descriptionAr: 'تمت مراجعة البضائع وتثبيتها بأمان على وسيلة النقل.',
          photoUrl: photoUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
          actor: 'driver',
        },
        {
          timestamp: timeStr,
          status: 'in_transit',
          titleEn: 'In Transit to Destination',
          titleAr: 'في الطريق إلى نقطة التسليم',
          descriptionEn: `En route to ${delivery.destination.cityEn}. Estimated driving: ${delivery.estimatedDrivingMinutes}m.`,
          descriptionAr: `في الطريق إلى ${delivery.destination.cityAr}. وقت الرحلة التقديري: ${delivery.estimatedDrivingMinutes} دقيقة.`,
          actor: 'system',
        },
      ],
    };

    stateDeliveries = stateDeliveries.map((d) => (d.id === deliveryId ? updated : d));
    notify();
  };

  const driverArriveAtDropoff = (deliveryId: string) => {
    const delivery = stateDeliveries.find((d) => d.id === deliveryId);
    if (!delivery) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updated: DeliveryOrder = {
      ...delivery,
      status: 'driver_at_dropoff',
      timeline: [
        ...delivery.timeline,
        {
          timestamp: timeStr,
          status: 'driver_at_dropoff',
          titleEn: 'Driver Arrived at Destination',
          titleAr: 'وصل السائق إلى موقع التسليم',
          descriptionEn: 'Awaiting 6-digit delivery OTP from recipient.',
          descriptionAr: 'في انتظار كود التسليم (OTP) المكون من 6 أرقام من المستلم.',
          gps: { lat: delivery.destination.lat, lng: delivery.destination.lng },
          actor: 'driver',
        },
      ],
    };

    stateDeliveries = stateDeliveries.map((d) => (d.id === deliveryId ? updated : d));
    notify();
  };

  const verifyOtpAndCompleteDelivery = (deliveryId: string, enteredOtp: string): { success: boolean; message: string } => {
    const delivery = stateDeliveries.find((d) => d.id === deliveryId);
    if (!delivery) return { success: false, message: 'Delivery not found' };

    if (delivery.deliveryOtp.trim() !== enteredOtp.trim()) {
      return { success: false, message: 'Invalid OTP code. Please check with recipient.' };
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const tripPrice = delivery.finalAgreedPriceEgp || delivery.customerProposedPriceEgp;
    const platformFee = Math.round(tripPrice * 0.1);
    const driverNet = tripPrice - platformFee;

    const updated: DeliveryOrder = {
      ...delivery,
      status: 'completed',
      isOtpVerified: true,
      timeline: [
        ...delivery.timeline,
        {
          timestamp: timeStr,
          status: 'completed',
          titleEn: 'Delivery Verified & Completed via OTP',
          titleAr: 'تم التحقق من الكود واكتمال التسليم بنجاح',
          descriptionEn: `Recipient confirmed receipt using 6-digit OTP (${delivery.deliveryOtp}).`,
          descriptionAr: `أكد المستلم الاستلام بنجاح عبر كود التحقق (${delivery.deliveryOtp}).`,
          actor: 'driver',
        },
      ],
    };

    // Credit driver earnings
    if (delivery.assignedDriver) {
      stateDrivers = stateDrivers.map((drv) => {
        if (drv.id === delivery.assignedDriver?.id) {
          return {
            ...drv,
            todayEarningsEgp: drv.todayEarningsEgp + driverNet,
            weekEarningsEgp: drv.weekEarningsEgp + driverNet,
            totalDeliveries: drv.totalDeliveries + 1,
            walletBalanceEgp: drv.walletBalanceEgp + driverNet,
          };
        }
        return drv;
      });
    }

    stateDeliveries = stateDeliveries.map((d) => (d.id === deliveryId ? updated : d));
    notify();
    return { success: true, message: 'Delivery completed successfully!' };
  };

  // 5. Customer rates driver
  const submitRating = (deliveryId: string, rating: { stars: number; comment?: string; punctuality: boolean; carefulHandling: boolean; goodCommunication: boolean }) => {
    const delivery = stateDeliveries.find((d) => d.id === deliveryId);
    if (!delivery) return;

    stateDeliveries = stateDeliveries.map((d) =>
      d.id === deliveryId ? { ...d, driverRating: rating } : d
    );
    notify();
  };

  // 6. In-App Chat
  const sendChatMessage = (deliveryId: string, sender: 'customer' | 'driver', text: string) => {
    const delivery = stateDeliveries.find((d) => d.id === deliveryId);
    if (!delivery) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      deliveryId,
      sender,
      text,
      timestamp: timeStr,
    };

    const updated = {
      ...delivery,
      chatMessages: [...delivery.chatMessages, newMsg],
    };

    stateDeliveries = stateDeliveries.map((d) => (d.id === deliveryId ? updated : d));
    notify();
  };

  // 7. Driver Online / Offline Toggle
  const toggleDriverOnline = (driverId: string) => {
    stateDrivers = stateDrivers.map((d) =>
      d.id === driverId ? { ...d, isOnline: !d.isOnline } : d
    );
    notify();
  };

  // 8. Admin KYC verification approval / rejection
  const updateDriverVerification = (driverId: string, status: 'verified' | 'rejected' | 'suspended') => {
    stateDrivers = stateDrivers.map((d) =>
      d.id === driverId ? { ...d, verificationStatus: status } : d
    );
    notify();
  };

  // 9. Admin dispute resolution
  const resolveDispute = (disputeId: string, resolutionNotes: string) => {
    stateDisputes = stateDisputes.map((dsp) =>
      dsp.id === disputeId
        ? { ...dsp, status: 'resolved', resolutionNotes }
        : dsp
    );
    notify();
  };

  const createDispute = (deliveryId: string, reportedBy: 'customer' | 'driver', reason: any, reasonText: string) => {
    const newDispute: DisputeRecord = {
      id: `dsp_${Date.now()}`,
      deliveryId,
      reportedBy,
      reason,
      reasonText,
      status: 'under_review',
      createdAt: new Date().toISOString(),
    };
    stateDisputes = [newDispute, ...stateDisputes];
    notify();
  };

  // Set active driver for driver view
  const setActiveDriverId = (id: string) => {
    activeDriverId = id;
    notify();
  };

  return {
    deliveries,
    drivers,
    disputes,
    activeDriver,
    activeDelivery,
    createDelivery,
    acceptDriverOffer,
    submitDriverCounterOffer,
    driverArriveAtPickup,
    confirmPickupAndStartTransit,
    driverArriveAtDropoff,
    verifyOtpAndCompleteDelivery,
    submitRating,
    sendChatMessage,
    toggleDriverOnline,
    updateDriverVerification,
    resolveDispute,
    createDispute,
    setActiveDriverId,
  };
}
