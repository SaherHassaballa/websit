import { LocationPoint } from '../types';

export const EGYPTIAN_LOCATIONS: LocationPoint[] = [
  {
    id: 'loc_zagazig_depot',
    nameEn: 'Zagazig Central Logistics Warehouse',
    nameAr: 'مستودع لوجستيات الزقازيق المركزي',
    cityEn: 'Zagazig (Sharqia)',
    cityAr: 'الزقازيق (الشرقية)',
    addressEn: 'Al-Ahrar Ring Road, Central Logistics Zone, Zagazig',
    addressAr: 'طريق الأحرار الدائري، المنطقة اللوجستية المركزية، الزقازيق',
    lat: 30.5877,
    lng: 31.5020,
  },
  {
    id: 'loc_cairo_downtown',
    nameEn: 'Cairo Central Commercial Hub',
    nameAr: 'مركز القاهرة التجاري وسط البلد',
    cityEn: 'Cairo',
    cityAr: 'القاهرة',
    addressEn: 'Ramses Commercial District, Downtown Cairo',
    addressAr: 'منطقة رمسيس التجارية، وسط البلد، القاهرة',
    lat: 30.0626,
    lng: 31.2497,
  },
  {
    id: 'loc_10th_ramadan',
    nameEn: '10th of Ramadan Industrial City (Zone B3)',
    nameAr: 'المنطقة الصناعية بمدينة العاشر من رمضان (B3)',
    cityEn: '10th of Ramadan',
    cityAr: 'العاشر من رمضان',
    addressEn: 'Heavy Manufacturing Sector, Industrial Zone B3, 10th of Ramadan',
    addressAr: 'قطاع الصناعات الهندسية، المنطقة الصناعية B3، العاشر من رمضان',
    lat: 30.3015,
    lng: 31.7412,
  },
  {
    id: 'loc_new_cairo',
    nameEn: 'New Cairo Commercial Complex',
    nameAr: 'مجمع التجمع الخامس التجاري',
    cityEn: 'New Cairo',
    cityAr: 'القاهرة الجديدة',
    addressEn: '90th North Street, Logistics Park, New Cairo',
    addressAr: 'شارع التسعين الشمالي، مجمع الأعمال والمخازن، القاهرة الجديدة',
    lat: 30.0270,
    lng: 31.4720,
  },
  {
    id: 'loc_6th_october',
    nameEn: '6th of October Industrial & Logistics Zone',
    nameAr: 'المنطقة الصناعية والتخزينية بالسادس من أكتوبر',
    cityEn: '6th of October',
    cityAr: 'السادس من أكتوبر',
    addressEn: 'Wahat Road, Industrial Zone 4, 6th of October City',
    addressAr: 'طريق الواحات، المنطقة الصناعية الرابعة، السادس من أكتوبر',
    lat: 29.9328,
    lng: 30.9167,
  },
  {
    id: 'loc_alexandria_port',
    nameEn: 'Alexandria Port Logistics Terminal',
    nameAr: 'محطة لوجستيات ميناء الإسكندرية',
    cityEn: 'Alexandria',
    cityAr: 'الإسكندرية',
    addressEn: 'Bab 54 Freight Gate, Customs & Port Logistics, Alexandria',
    addressAr: 'بوابة 54 بضائع، الدائرة الجمركية والخدمات اللوجستية، الإسكندرية',
    lat: 31.1966,
    lng: 29.8785,
  },
  {
    id: 'loc_mansoura_hub',
    nameEn: 'Mansoura Goods & Agricultural Depot',
    nameAr: 'مجمع المنصورة لنقل البضائع والمحاصيل',
    cityEn: 'Mansoura (Dakahlia)',
    cityAr: 'المنصورة (الدقهلية)',
    addressEn: 'Talkha Expressway, Agro-Freight Depot, Mansoura',
    addressAr: 'طريق طلخا السريع، مجمع نقل وتوزيع البضائع، المنصورة',
    lat: 31.0409,
    lng: 31.3785,
  },
  {
    id: 'loc_maadi_tech',
    nameEn: 'Maadi Ring Road Distribution Point',
    nameAr: 'نقطة توزيع المعادي الدائري',
    cityEn: 'Cairo (Maadi)',
    cityAr: 'المعادي (القاهرة)',
    addressEn: 'Autostrad & Ring Road Interchange, Maadi',
    addressAr: 'تقاطع الأوتوستراد مع الطريق الدائري، المعادي',
    lat: 29.9602,
    lng: 31.2755,
  },
];

/**
 * Calculates straight/road distance using Haversine with 1.25 road curvature multiplier
 */
export function calculateDistanceAndEta(p1: { lat: number; lng: number }, p2: { lat: number; lng: number }): {
  distanceKm: number;
  drivingMinutes: number;
  formattedEta: string;
} {
  const R = 6371; // km
  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const rawDist = R * c;
  
  // Real roads in Egypt take ~1.28x direct line distance due to highways/interchanges
  const distanceKm = Math.max(3, Math.round(rawDist * 1.28));
  
  // Average freight/truck speed in Egyptian highways/urban: ~52 km/h
  const drivingMinutes = Math.max(15, Math.round((distanceKm / 52) * 60));
  
  const hours = Math.floor(drivingMinutes / 60);
  const minutes = drivingMinutes % 60;
  
  let formattedEta = '';
  if (hours > 0) {
    formattedEta = `${hours}h ${minutes}m`;
  } else {
    formattedEta = `${minutes} min`;
  }

  return { distanceKm, drivingMinutes, formattedEta };
}
