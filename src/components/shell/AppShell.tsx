import React, { useState } from 'react';
import { CustomerApp } from '../customer/CustomerApp';
import { DriverApp } from '../driver/DriverApp';
import { AdminDashboard } from '../admin/AdminDashboard';
import {
  Smartphone,
  Truck,
  ShieldCheck,
  Maximize2,
  Minimize2,
  Globe,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useDeliveryStore } from '../../state/deliveryStore';

export const AppShell: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<'customer' | 'driver' | 'admin'>('customer');
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);
  const [lang, setLang] = useState<'en' | 'ar'>('ar'); // Default to Arabic for Egyptian audience
  const { createDelivery, acceptDriverOffer, confirmPickupAndStartTransit } = useDeliveryStore();

  const isRtl = lang === 'ar';

  const toggleLanguage = () => {
    setLang((l) => (l === 'en' ? 'ar' : 'en'));
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Application Control Toolbar */}
      <header className="h-14 bg-[#0b101c] border-b border-slate-800/90 px-4 md:px-6 flex items-center justify-between shrink-0 z-50">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-amber-500/20">
            RD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">
                REQUEST DELIVERY
              </span>
              <span className="text-xs font-bold text-amber-400 font-sans">
                اطلب دليفري
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Your Goods. Your Price. Your Driver. · بضاعتك. سعرك. كابتنك.
            </p>
          </div>
        </div>

        {/* System Switcher (Customer / Driver / Admin) */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSystem('customer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeSystem === 'customer'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تطبيق العميل' : 'Customer App'}</span>
          </button>

          <button
            onClick={() => setActiveSystem('driver')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeSystem === 'driver'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تطبيق الكابتن' : 'Driver App'}</span>
          </button>

          <button
            onClick={() => setActiveSystem('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeSystem === 'admin'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isRtl ? 'لوحة الإدارة' : 'Admin HQ'}</span>
          </button>
        </div>

        {/* Viewport & Language Controls */}
        <div className="flex items-center gap-2">
          {activeSystem !== 'admin' && (
            <button
              onClick={() => setDeviceFrameMode(!deviceFrameMode)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors"
              title="Toggle Mobile Device Chassis Frame"
            >
              {deviceFrameMode ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isRtl ? 'ملء الشاشة' : 'Full Width'}</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isRtl ? 'إطار هاتف' : 'Device Frame'}</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-amber-400 border border-slate-800 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-4 overflow-hidden bg-dot-pattern">
        {activeSystem === 'admin' ? (
          <div className="w-full h-full bg-[#080c15] overflow-y-auto">
            <AdminDashboard lang={lang} />
          </div>
        ) : deviceFrameMode ? (
          /* Sleek Smartphone Device Chassis */
          <div className="relative w-full max-w-[420px] h-[94vh] max-h-[880px] bg-slate-950 rounded-[44px] border-[10px] border-slate-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden ring-1 ring-slate-700/60 transition-all">
            {/* Phone Top Speaker & Camera Punch Hole */}
            <div className="absolute top-2 inset-x-0 h-6 flex items-center justify-center z-50 pointer-events-none">
              <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-2 border border-slate-800/80">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>
            </div>

            {/* Inner Mobile Viewport */}
            <div className="w-full h-full flex flex-col pt-3 bg-[#080c15] overflow-hidden">
              {activeSystem === 'customer' ? (
                <CustomerApp lang={lang} onToggleLang={toggleLanguage} />
              ) : (
                <DriverApp lang={lang} onToggleLang={toggleLanguage} />
              )}
            </div>

            {/* Phone Bottom Gesture Home Bar */}
            <div className="absolute bottom-1.5 inset-x-0 h-2 flex items-center justify-center z-50 pointer-events-none">
              <div className="w-32 h-1 bg-slate-600/70 rounded-full" />
            </div>
          </div>
        ) : (
          /* Fullscreen Mobile View for direct testing */
          <div className="w-full max-w-lg h-full flex flex-col bg-[#080c15] shadow-2xl overflow-hidden border-x border-slate-800/80">
            {activeSystem === 'customer' ? (
              <CustomerApp lang={lang} onToggleLang={toggleLanguage} />
            ) : (
              <DriverApp lang={lang} onToggleLang={toggleLanguage} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};
