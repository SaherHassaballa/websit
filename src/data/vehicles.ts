import { VehicleOption, VehicleType, ShipmentCategory } from '../types';

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'motorcycle',
    nameEn: 'Motorcycle',
    nameAr: 'موتوسيكل سريع',
    icon: '🏍',
    maxWeightKg: 20,
    maxVolumeM3: 0.08,
    descriptionEn: 'Ideal for small parcels, documents, keys & urgent envelopes',
    descriptionAr: 'مناسب للطرود الصغيرة، المستندات، العينات والطلبات العاجلة',
    baseRateEgp: 40,
    perKmRateEgp: 3.5,
    sampleVehicles: 'Bajaj Boxer, Haojue, Dayun 150',
  },
  {
    id: 'scooter',
    nameEn: 'Scooter Delivery',
    nameAr: 'سكوتر دليفري',
    icon: '🛵',
    maxWeightKg: 15,
    maxVolumeM3: 0.06,
    descriptionEn: 'Fast urban delivery with rear insulated lockable box',
    descriptionAr: 'توصيل حضري سريع مع صندوق خلفي محكم ومقاوم للحرارة',
    baseRateEgp: 35,
    perKmRateEgp: 3.2,
    sampleVehicles: 'SYM Symphony, Benelli, Honda Dio',
  },
  {
    id: 'cargo_tricycle',
    nameEn: 'Cargo Tricycle (Trisickle)',
    nameAr: 'تروسيكل بضائع',
    icon: '🛺',
    maxWeightKg: 400,
    maxVolumeM3: 1.6,
    descriptionEn: 'Cost-effective for furniture pieces, market crates & appliances',
    descriptionAr: 'اقتصادي وعملي لنقل الأجهزة، الصناديق وقطع الأثاث المفردة',
    baseRateEgp: 90,
    perKmRateEgp: 5.5,
    sampleVehicles: 'Dayun 200cc, CMG Heavy Box Tricycle',
  },
  {
    id: 'microvan',
    nameEn: 'Enclosed Microvan',
    nameAr: 'فان بضائع مغلق',
    icon: '🚐',
    maxWeightKg: 750,
    maxVolumeM3: 3.2,
    descriptionEn: 'Weather-protected enclosed van for sensitive electronics & cartons',
    descriptionAr: 'صندوق مقفول ومحمي من العوامل الجوية للإلكترونيات والكراتين',
    baseRateEgp: 140,
    perKmRateEgp: 7.0,
    sampleVehicles: 'Suzuki Carry Van, DFSK Mini Van, Changan Karry',
  },
  {
    id: 'pickup',
    nameEn: 'Light Pickup Truck (Dabbaba)',
    nameAr: 'بيك أب / نص نقل (الدبابة)',
    icon: '🛻',
    maxWeightKg: 1500,
    maxVolumeM3: 6.5,
    descriptionEn: 'Standard open/tarpaulin bed for commercial loads, moves & spares',
    descriptionAr: 'صندوق مفتوح أو مشمع لنقل البضائع، قطع الغيار ومستلزمات الإنتاج',
    baseRateEgp: 220,
    perKmRateEgp: 9.5,
    sampleVehicles: 'Chevrolet D-Max (Dabbaba), Toyota Hilux, Nissan Pickup',
  },
  {
    id: 'small_truck',
    nameEn: 'Small Box Truck (Jumbo)',
    nameAr: 'جامبو / شاحنة خفيفة',
    icon: '🚚',
    maxWeightKg: 3500,
    maxVolumeM3: 14.0,
    descriptionEn: 'Heavy-duty enclosed box for pallets, wholesale goods & home moves',
    descriptionAr: 'صندوق مغلق للأحمال المتوسطة، البالتات وعفش المنازل بالكامل',
    baseRateEgp: 380,
    perKmRateEgp: 14.0,
    sampleVehicles: 'Chevrolet Jumbo 7000, Isuzu NPR, Mitsubishi Canter',
  },
  {
    id: 'medium_truck',
    nameEn: 'Medium Freight Truck',
    nameAr: 'شاحنة بضائع متوسطة',
    icon: '🚛',
    maxWeightKg: 8000,
    maxVolumeM3: 28.0,
    descriptionEn: 'Industrial transport for factories, steel, chemicals & bulk stock',
    descriptionAr: 'نقل صناعي للمصانع، البضائع الثقيلة والمخازن المركزية',
    baseRateEgp: 750,
    perKmRateEgp: 22.0,
    sampleVehicles: 'Mercedes-Benz Atego, Volvo FL, FAW Cargo Carrier',
  },
  {
    id: 'large_truck',
    nameEn: 'Heavy Semi-Trailer (Trella)',
    nameAr: 'تريلا / شاحنة نقل ثقيل',
    icon: '🚛',
    maxWeightKg: 25000,
    maxVolumeM3: 75.0,
    descriptionEn: 'Full 40ft container / intercity heavy industrial haulage',
    descriptionAr: 'نقل ثقيل وحاويات للموانئ والمدن الصناعية بين المحافظات',
    baseRateEgp: 1800,
    perKmRateEgp: 42.0,
    sampleVehicles: 'Mercedes Actros, MAN TGX, Scania R-Series',
  },
];

export const SHIPMENT_CATEGORIES: {
  id: ShipmentCategory;
  nameEn: string;
  nameAr: string;
  icon: string;
  defaultVehicle: VehicleType;
}[] = [
  { id: 'commercial_goods', nameEn: 'Commercial & Wholesale', nameAr: 'بضائع تجارية وتوريدات', icon: '📦', defaultVehicle: 'pickup' },
  { id: 'furniture', nameEn: 'Furniture & Household', nameAr: 'أثاث ومفروشات', icon: '🛋️', defaultVehicle: 'pickup' },
  { id: 'construction', nameEn: 'Building & Construction', nameAr: 'مواد بناء وتشطيبات', icon: '🧱', defaultVehicle: 'pickup' },
  { id: 'electronics', nameEn: 'Electronics & Appliances', nameAr: 'أجهزة وإلكترونيات', icon: '🖥️', defaultVehicle: 'microvan' },
  { id: 'spare_parts', nameEn: 'Auto & Machine Spares', nameAr: 'قطع غيار ومعدات', icon: '⚙️', defaultVehicle: 'cargo_tricycle' },
  { id: 'food_groceries', nameEn: 'Food & Agricultural', nameAr: 'أغذية ومحاصيل', icon: '🍎', defaultVehicle: 'microvan' },
  { id: 'documents', nameEn: 'Legal & Bank Docs', nameAr: 'مستندات وأوراق هامة', icon: '📄', defaultVehicle: 'motorcycle' },
  { id: 'equipment', nameEn: 'Industrial Equipment', nameAr: 'معدات وآلات صناعية', icon: '🏭', defaultVehicle: 'small_truck' },
  { id: 'other', nameEn: 'General Cargo', nameAr: 'بضائع وشحنات عامة', icon: '🏷️', defaultVehicle: 'pickup' },
];

/**
 * Intelligent recommendation engine that analyzes weight, dimensions, and cargo type
 */
export function recommendVehicle(params: {
  weightKg: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  quantity?: number;
  category?: ShipmentCategory;
}): { recommendedVehicle: VehicleType; reasonEn: string; reasonAr: string } {
  const { weightKg, lengthCm = 50, widthCm = 50, heightCm = 50, category } = params;
  
  // Approximate volume in m3
  const volumeM3 = ((lengthCm || 50) * (widthCm || 50) * (heightCm || 50)) / 1_000_000;
  
  if (category === 'documents' && weightKg <= 5) {
    return {
      recommendedVehicle: 'motorcycle',
      reasonEn: 'Documents & light packages are fastest and cheapest on a motorcycle.',
      reasonAr: 'المستندات والطرود الخفيفة أسرع وأوفر على الموتوسيكل السريع.',
    };
  }

  if (weightKg <= 15 && volumeM3 <= 0.05) {
    return {
      recommendedVehicle: 'scooter',
      reasonEn: 'Light urban delivery fits perfectly in a secure scooter box.',
      reasonAr: 'الشحنات الخفيفة تناسب صندوق السكوتر المحكم.',
    };
  }

  if (weightKg <= 20 && volumeM3 <= 0.08) {
    return {
      recommendedVehicle: 'motorcycle',
      reasonEn: 'Weight and size fit motorcycle courier.',
      reasonAr: 'الوزن والحجم يناسب مندوب الموتوسيكل.',
    };
  }

  if (weightKg <= 400 && volumeM3 <= 1.5 && (lengthCm <= 160)) {
    return {
      recommendedVehicle: 'cargo_tricycle',
      reasonEn: 'Moderate weight (up to 400 kg) is best handled by a cargo tricycle.',
      reasonAr: 'الأحمال المتوسطة حتى 400 كجم مناسبة جداً واقتصادية على التروسيكل.',
    };
  }

  if (category === 'electronics' && weightKg <= 750) {
    return {
      recommendedVehicle: 'microvan',
      reasonEn: 'Fragile electronics require weather protection inside an enclosed microvan.',
      reasonAr: 'الإلكترونيات والأجهزة الحساسة تتطلب حماية تامة داخل ميكروفان مقفول.',
    };
  }

  if (weightKg <= 1500) {
    return {
      recommendedVehicle: 'pickup',
      reasonEn: 'Medium freight (up to 1,500 kg) matches an open bed pickup truck.',
      reasonAr: 'الحمولة حتى 1500 كجم تناسب سيارة بيك أب كابينة (الدبابة).',
    };
  }

  if (weightKg <= 3500) {
    return {
      recommendedVehicle: 'small_truck',
      reasonEn: 'Heavy shipment (up to 3,500 kg) requires a Jumbo small truck.',
      reasonAr: 'شحنة ثقيلة حتى 3.5 طن تتطلب سيارة نقل جامبو.',
    };
  }

  if (weightKg <= 8000) {
    return {
      recommendedVehicle: 'medium_truck',
      reasonEn: 'Industrial cargo requires a medium freight truck.',
      reasonAr: 'الشحنات الكبيرة والمصانع تتطلب شاحنة نقل متوسطة.',
    };
  }

  return {
    recommendedVehicle: 'large_truck',
    reasonEn: 'Heavy multi-ton cargo requires a heavy semi-trailer.',
    reasonAr: 'حمولات ثقيلة متعددة الأطنان تتطلب تريلا نقل ثقيل.',
  };
}

/**
 * Calculates inDrive-style estimated price range based on vehicle and distance
 */
export function calculatePriceRange(vehicleType: VehicleType, distanceKm: number): {
  minPriceEgp: number;
  maxPriceEgp: number;
  suggestedPriceEgp: number;
} {
  const vehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleType) || VEHICLE_OPTIONS[4];
  const basePrice = vehicle.baseRateEgp + distanceKm * vehicle.perKmRateEgp;
  
  // Market fluctuation window ~ -10% to +15%
  const minPriceEgp = Math.max(vehicle.baseRateEgp, Math.round(basePrice * 0.9 / 10) * 10);
  const maxPriceEgp = Math.round(basePrice * 1.2 / 10) * 10;
  const suggestedPriceEgp = Math.round(basePrice / 10) * 10;

  return { minPriceEgp, maxPriceEgp, suggestedPriceEgp };
}
