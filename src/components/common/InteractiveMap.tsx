import React, { useState, useEffect } from 'react';
import { LocationPoint, VehicleType } from '../../types';
import { Navigation, MapPin, Compass, ShieldCheck } from 'lucide-react';

interface InteractiveMapProps {
  pickup: LocationPoint;
  destination: LocationPoint;
  driverLocation?: { lat: number; lng: number };
  vehicleType?: VehicleType;
  status?: string;
  heightClass?: string;
  isInteractive?: boolean;
  onSelectPickup?: (point: LocationPoint) => void;
  onSelectDestination?: (point: LocationPoint) => void;
  lang?: 'en' | 'ar';
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  pickup,
  destination,
  driverLocation,
  vehicleType = 'pickup',
  status,
  heightClass = 'h-64',
  isInteractive = false,
  lang = 'en',
}) => {
  const isRtl = lang === 'ar';
  const [zoomLevel, setZoomLevel] = useState(1);
  const [transitProgress, setTransitProgress] = useState(0.45); // 0 to 1 along route

  // Simulate subtle vehicle pulse/movement if in transit
  useEffect(() => {
    if (status === 'in_transit') {
      const interval = setInterval(() => {
        setTransitProgress((prev) => (prev >= 0.95 ? 0.2 : prev + 0.02));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Compute SVG coordinates based on lat/lng bounding box
  // Egypt rough bounding box: lat 29.5 - 31.5, lng 29.5 - 32.0
  const toSvgCoords = (lat: number, lng: number) => {
    const minLat = 29.8;
    const maxLat = 31.3;
    const minLng = 29.8;
    const maxLng = 31.9;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Invert Y because latitude increases northward
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;

    // Clamp coordinates to safe 10% - 90% viewBox margins
    const clampedX = Math.min(88, Math.max(12, x));
    const clampedY = Math.min(88, Math.max(12, y));

    return { x: clampedX, y: clampedY };
  };

  const pSvg = toSvgCoords(pickup.lat, pickup.lng);
  const dSvg = toSvgCoords(destination.lat, destination.lng);

  // Midpoint curvature for highway route curve
  const midX = (pSvg.x + dSvg.x) / 2 + (dSvg.y > pSvg.y ? 8 : -8);
  const midY = (pSvg.y + dSvg.y) / 2 - 6;
  const pathD = `M ${pSvg.x} ${pSvg.y} Q ${midX} ${midY} ${dSvg.x} ${dSvg.y}`;

  // Calculate current vehicle marker position along quadratic bezier curve
  const t = status === 'in_transit' ? transitProgress : status === 'driver_accepted' ? 0.15 : 0.85;
  const vX = (1 - t) * (1 - t) * pSvg.x + 2 * (1 - t) * t * midX + t * t * dSvg.x;
  const vY = (1 - t) * (1 - t) * pSvg.y + 2 * (1 - t) * t * midY + t * t * dSvg.y;

  const vehicleIcon =
    vehicleType === 'motorcycle'
      ? '🏍️'
      : vehicleType === 'cargo_tricycle'
      ? '🛺'
      : vehicleType === 'microvan'
      ? '🚐'
      : vehicleType === 'pickup'
      ? '🛻'
      : '🚚';

  return (
    <div className={`relative w-full ${heightClass} bg-[#0e1626] rounded-2xl overflow-hidden border border-slate-800 shadow-inner select-none`}>
      {/* Background stylized Egyptian map grid & highway lines */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full absolute inset-0 preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <pattern id="roadGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="100" height="100" fill="#0c1322" />
        <rect width="100" height="100" fill="url(#roadGrid)" />

        {/* Major Cairo & Nile Delta river stylized corridor */}
        <path
          d="M 45 100 Q 52 70 54 50 Q 56 30 65 0"
          fill="none"
          stroke="rgba(14, 165, 233, 0.12)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Ring Road and Desert Highway stylized loops */}
        <circle cx="52" cy="58" r="24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="2,3" />
        <path d="M 20 85 L 85 20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <path d="M 15 45 L 85 45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />

        {/* Active Route Glow & Polyline */}
        <path
          d={pathD}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3.2"
          strokeOpacity="0.3"
          strokeLinecap="round"
        />
        <path
          d={pathD}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray={status === 'in_transit' ? '4,2' : undefined}
          className={status === 'in_transit' ? 'animate-pulse' : ''}
        />
      </svg>

      {/* Pickup Marker (Point A) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 pointer-events-none z-10"
        style={{ left: `${pSvg.x}%`, top: `${pSvg.y}%` }}
      >
        <div className="flex flex-col items-center group">
          <div className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap mb-1 border border-emerald-300">
            {isRtl ? 'استلام: ' : 'Pickup: '}
            {isRtl ? pickup.cityAr : pickup.cityEn}
          </div>
          <div className="w-6 h-6 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-slate-950">
            A
          </div>
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-0.5 animate-ping" />
        </div>
      </div>

      {/* Destination Marker (Point B) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 pointer-events-none z-10"
        style={{ left: `${dSvg.x}%`, top: `${dSvg.y}%` }}
      >
        <div className="flex flex-col items-center">
          <div className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap mb-1 border border-amber-300">
            {isRtl ? 'تسليم: ' : 'Dropoff: '}
            {isRtl ? destination.cityAr : destination.cityEn}
          </div>
          <div className="w-6 h-6 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-slate-950">
            B
          </div>
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-0.5" />
        </div>
      </div>

      {/* Moving Vehicle Marker */}
      {(status === 'in_transit' || status === 'driver_accepted' || status === 'driver_at_pickup' || status === 'pickup_confirmed') && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000 ease-linear pointer-events-none"
          style={{ left: `${vX}%`, top: `${vY}%` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 bg-blue-500/20 rounded-full animate-ping" />
            <div className="w-8 h-8 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center shadow-xl text-sm">
              <span>{vehicleIcon}</span>
            </div>
            {status === 'in_transit' && (
              <span className="absolute -bottom-4 bg-blue-900/90 text-blue-200 text-[9px] font-mono px-1.5 py-0.2 rounded border border-blue-600/40 whitespace-nowrap">
                64 km/h
              </span>
            )}
          </div>
        </div>
      )}

      {/* Map Overlay Badges */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 px-2.5 py-1 rounded-lg text-[11px] text-slate-200 flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">
            {isRtl ? 'نظام تحديد المواقع نشط' : 'GPS Live Routing'}
          </span>
        </div>
      </div>

      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
          className="w-7 h-7 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-md flex items-center justify-center text-xs font-bold transition-colors"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          className="w-7 h-7 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-md flex items-center justify-center text-xs font-bold transition-colors"
          title="Zoom Out"
        >
          -
        </button>
      </div>

      {/* Map Bottom Legend / Route info */}
      <div className="absolute bottom-2.5 inset-x-3 z-20 flex items-center justify-between text-[11px] bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
        <div className="flex items-center gap-1.5 truncate">
          <Navigation className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="truncate">
            {isRtl ? `${pickup.cityAr} ➔ ${destination.cityAr}` : `${pickup.cityEn} ➔ ${destination.cityEn}`}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold shrink-0 ml-2">
          <span>{status === 'in_transit' ? (isRtl ? 'في الطريق' : 'In Transit') : (isRtl ? 'مسار مباشر' : 'Live Route')}</span>
        </div>
      </div>
    </div>
  );
};
