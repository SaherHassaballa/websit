export type VehicleType = 
  | 'motorcycle'
  | 'scooter'
  | 'cargo_tricycle'
  | 'microvan'
  | 'pickup'
  | 'small_truck'
  | 'medium_truck'
  | 'large_truck';

export interface VehicleOption {
  id: VehicleType;
  nameEn: string;
  nameAr: string;
  icon: string;
  maxWeightKg: number;
  maxVolumeM3: number;
  descriptionEn: string;
  descriptionAr: string;
  baseRateEgp: number;
  perKmRateEgp: number;
  sampleVehicles: string;
}

export type ShipmentCategory =
  | 'furniture'
  | 'electronics'
  | 'documents'
  | 'commercial_goods'
  | 'construction'
  | 'food_groceries'
  | 'spare_parts'
  | 'equipment'
  | 'other';

export type DeliveryStatus =
  | 'pending_offers'     // Customer broadcasted, waiting for driver offers
  | 'driver_accepted'    // Customer confirmed driver, driver heading to pickup
  | 'driver_at_pickup'   // Driver arrived at pickup
  | 'pickup_confirmed'   // Goods loaded, pickup photo verified
  | 'in_transit'         // En route to destination
  | 'driver_at_dropoff'  // Driver arrived at dropoff, waiting for OTP
  | 'completed'          // OTP verified, trip completed
  | 'cancelled'
  | 'disputed';

export interface LocationPoint {
  id: string;
  nameEn: string;
  nameAr: string;
  cityEn: string;
  cityAr: string;
  addressEn: string;
  addressAr: string;
  lat: number;
  lng: number;
}

export interface DriverOffer {
  id: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  driverPhoto: string;
  rating: number;
  completedDeliveries: number;
  vehicleType: VehicleType;
  vehicleModel: string;
  vehiclePlate: string;
  offeredPriceEgp: number;
  driverDistanceToPickupKm: number;
  etaMinutesToPickup: number;
  verified: boolean;
  createdAt: string;
}

export interface ChainOfCustodyEvent {
  timestamp: string;
  status: DeliveryStatus;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  gps?: { lat: number; lng: number };
  photoUrl?: string;
  actor: 'customer' | 'driver' | 'admin' | 'system';
}

export interface ChatMessage {
  id: string;
  deliveryId: string;
  sender: 'customer' | 'driver';
  text: string;
  timestamp: string;
  quickAction?: boolean;
}

export interface DeliveryOrder {
  id: string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  pickup: LocationPoint;
  destination: LocationPoint;
  distanceKm: number;
  estimatedDrivingMinutes: number;
  
  // Shipment Info
  category: ShipmentCategory;
  categoryLabelEn: string;
  categoryLabelAr: string;
  description: string;
  quantity: number;
  weightKg: number;
  dimensionsCm: {
    length: number;
    width: number;
    height: number;
  };
  isFragile: boolean;
  requiresSpecialHandling: boolean;
  loadingAssistanceNeeded: boolean;
  unloadingAssistanceNeeded: boolean;
  
  // Vehicle & Pricing
  vehicleRequired: VehicleType;
  recommendedVehicle: VehicleType;
  suggestedMinPriceEgp: number;
  suggestedMaxPriceEgp: number;
  customerProposedPriceEgp: number;
  finalAgreedPriceEgp?: number;
  paymentMethod: 'cash_on_delivery' | 'wallet' | 'card';
  
  // Driver Details
  assignedDriver?: {
    id: string;
    name: string;
    phone: string;
    photo: string;
    rating: number;
    completedTrips: number;
    vehicleType: VehicleType;
    vehicleModel: string;
    vehiclePlate: string;
    verified: boolean;
    currentLocation?: { lat: number; lng: number };
  };
  
  // Security & Verification
  deliveryOtp: string; // 6 digits, e.g., '482913'
  isOtpVerified: boolean;
  pickupPhotoUrl?: string;
  deliveryPhotoUrl?: string;
  
  // State & Timeline
  status: DeliveryStatus;
  createdAt: string;
  offers: DriverOffer[];
  timeline: ChainOfCustodyEvent[];
  chatMessages: ChatMessage[];
  
  // Rating after completion
  driverRating?: {
    stars: number;
    comment?: string;
    punctuality: boolean;
    carefulHandling: boolean;
    goodCommunication: boolean;
  };
}

export interface DriverProfile {
  id: string;
  fullName: string;
  phone: string;
  nationalId: string;
  avatarUrl: string;
  rating: number;
  totalDeliveries: number;
  todayEarningsEgp: number;
  weekEarningsEgp: number;
  walletBalanceEgp: number;
  isOnline: boolean;
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'suspended';
  vehicle: {
    type: VehicleType;
    model: string;
    year: number;
    plateNumber: string;
    maxPayloadKg: number;
    registrationDocUrl?: string;
    vehiclePhotoUrl?: string;
    insuranceDocUrl?: string;
  };
  documents: {
    nationalIdFront: string;
    nationalIdBack: string;
    drivingLicense: string;
    selfiePhoto: string;
    submittedAt: string;
  };
}

export interface DisputeRecord {
  id: string;
  deliveryId: string;
  reportedBy: 'customer' | 'driver';
  reason: 'damaged_package' | 'driver_unresponsive' | 'wrong_dropoff' | 'otp_issue' | 'price_disagreement' | 'other';
  reasonText: string;
  status: 'under_review' | 'resolved' | 'rejected';
  createdAt: string;
  resolutionNotes?: string;
}
