import React, { useState } from 'react';
import { useDeliveryStore } from '../../state/deliveryStore';
import {
  ShieldCheck,
  Truck,
  Users,
  AlertTriangle,
  Package,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Eye,
  Camera,
  MapPin,
  Lock,
} from 'lucide-react';

interface AdminDashboardProps {
  lang?: 'en' | 'ar';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang = 'en' }) => {
  const isRtl = lang === 'ar';
  const {
    deliveries,
    drivers,
    disputes,
    updateDriverVerification,
    resolveDispute,
  } = useDeliveryStore();

  const [activeSection, setActiveSection] = useState<'overview' | 'orders' | 'verification' | 'disputes'>('overview');
  const [selectedDriverForReview, setSelectedDriverForReview] = useState<any>(null);
  const [selectedOrderForAudit, setSelectedOrderForAudit] = useState<any>(null);

  // Statistics
  const totalOrders = deliveries.length;
  const activeOrdersCount = deliveries.filter((d) => d.status !== 'completed' && d.status !== 'cancelled').length;
  const completedOrdersCount = deliveries.filter((d) => d.status === 'completed').length;
  const totalGmv = deliveries.reduce((acc, d) => acc + (d.finalAgreedPriceEgp || d.customerProposedPriceEgp || 0), 0);
  const platformRevenue = Math.round(totalGmv * 0.1);
  const verifiedDriversCount = drivers.filter((d) => d.verificationStatus === 'verified').length;
  const pendingDriversCount = drivers.filter((d) => d.verificationStatus === 'pending').length;

  return (
    <div className="min-h-full bg-[#080c15] text-slate-100 flex flex-col font-sans select-none" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Admin Header */}
      <header className="h-16 bg-[#0c1322] border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
            RD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white uppercase tracking-wider">
                {isRtl ? 'لوحة تحكم العمليات المركزية' : 'Request Delivery Operations HQ'}
              </h1>
              <span className="bg-blue-500/20 text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded border border-blue-500/30">
                Cairo & Nile Delta Control
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isRtl ? 'إدارة وتتبع أسطول الشحن والتحقق من السائقين ومراجعة النزاعات' : 'Fleet Dispatch, Driver KYC Verification & Chain-of-Custody Audits'}
            </p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeSection === 'overview' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            {isRtl ? 'نظرة عامة' : 'Overview'}
          </button>
          <button
            onClick={() => setActiveSection('orders')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeSection === 'orders' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            {isRtl ? `الرحلات (${totalOrders})` : `Deliveries (${totalOrders})`}
          </button>
          <button
            onClick={() => setActiveSection('verification')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors relative ${
              activeSection === 'verification' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            {isRtl ? 'توثيق السائقين' : 'Driver KYC'}
            {pendingDriversCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[9px] bg-rose-500 text-white rounded-full font-mono">
                {pendingDriversCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection('disputes')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeSection === 'disputes' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            {isRtl ? `النزاعات (${disputes.length})` : `Disputes (${disputes.length})`}
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* SECTION 1: OVERVIEW & KPIS */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>{isRtl ? 'إجمالي الرحلات' : 'Total Orders'}</span>
                  <Package className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white">{totalOrders}</div>
                <div className="text-[11px] text-emerald-400 font-mono">
                  {completedOrdersCount} {isRtl ? 'مكتملة بنجاح' : 'completed'} · {activeOrdersCount} {isRtl ? 'نشطة' : 'active'}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>{isRtl ? 'إجمالي قيمة الشحن (GMV)' : 'Gross Merchandise Value'}</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black font-mono text-emerald-400">
                  {totalGmv} <span className="text-xs">EGP</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {isRtl ? 'أحجام نقل متداولة عبر المنصة' : 'Total transported volume'}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>{isRtl ? 'أرباح المنصة (10% Fee)' : 'Platform Net Revenue'}</span>
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black font-mono text-amber-400">
                  {platformRevenue} <span className="text-xs">EGP</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">
                  +12.4% vs last week
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>{isRtl ? 'كباتن معتمدين (Verified)' : 'Verified Fleet Drivers'}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  {verifiedDriversCount} <span className="text-sm font-normal text-slate-400">/ {drivers.length}</span>
                </div>
                <div className="text-[11px] text-amber-400">
                  {pendingDriversCount} {isRtl ? 'في انتظار فحص المستندات' : 'pending document audit'}
                </div>
              </div>
            </div>

            {/* Quick Live Dispatch Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isRtl ? 'الرحلات الجارية ونظام تتبع المسار الحي' : 'Live Fleet Movements & In-Transit Orders'}</span>
                </h3>
                <span className="text-xs text-slate-400">{activeOrdersCount} {isRtl ? 'رحلات نشطة' : 'active trips'}</span>
              </div>

              <div className="divide-y divide-slate-800 text-xs">
                {deliveries.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderForAudit(order)}
                    className="p-4 flex items-center justify-between hover:bg-slate-850 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-mono font-bold text-slate-300">
                        {order.vehicleRequired === 'pickup' ? '🛻' : order.vehicleRequired === 'cargo_tricycle' ? '🛺' : '🚚'}
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{order.pickup.cityEn} ➔ {order.destination.cityEn}</span>
                          <span className="text-slate-500 font-mono text-[11px]">#{order.trackingCode}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {order.description} · {order.weightKg} kg · Driver: {order.assignedDriver?.name || 'Searching'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <div className="font-mono font-bold text-emerald-400">
                          {order.finalAgreedPriceEgp || order.customerProposedPriceEgp} EGP
                        </div>
                        <div className="text-[10px] text-slate-500">{order.distanceKm} km</div>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : order.status === 'in_transit'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: DELIVERIES & CHAIN OF CUSTODY AUDIT */}
        {activeSection === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {isRtl ? 'سجل العمليات والشحنات الكامل' : 'All Deliveries & Chain of Custody Audits'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Deliveries List */}
              <div className="lg:col-span-2 space-y-3">
                {deliveries.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderForAudit(order)}
                    className={`bg-slate-900 border rounded-2xl p-4 cursor-pointer transition-all space-y-3 ${
                      selectedOrderForAudit?.id === order.id ? 'border-amber-500 ring-1 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-300">#{order.trackingCode}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-amber-400 font-semibold">{order.categoryLabelEn}</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold">
                        {order.finalAgreedPriceEgp || order.customerProposedPriceEgp} EGP
                      </span>
                    </div>

                    <div className="text-xs font-bold text-white">
                      {order.pickup.nameEn} ➔ {order.destination.nameEn}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>Customer: {order.customerName}</span>
                      <span>Driver: {order.assignedDriver?.name || 'Unassigned'}</span>
                      <span className="font-mono text-slate-300">OTP: {order.deliveryOtp} ({order.isOtpVerified ? 'Verified ✓' : 'Pending'})</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Detail & Timeline Audit Panel */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 h-fit">
                {selectedOrderForAudit ? (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-xs text-slate-400 font-mono">Audit #{selectedOrderForAudit.trackingCode}</div>
                        <h4 className="text-sm font-bold text-white">{selectedOrderForAudit.description}</h4>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold">
                        {selectedOrderForAudit.status}
                      </span>
                    </div>

                    {/* Security Proofs */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Delivery Security OTP:</span>
                        <span className="font-mono font-black text-amber-400 text-sm tracking-wider">
                          {selectedOrderForAudit.deliveryOtp}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">OTP Handover Status:</span>
                        <span className={selectedOrderForAudit.isOtpVerified ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                          {selectedOrderForAudit.isOtpVerified ? 'Verified by Recipient ✓' : 'Awaiting Destination OTP'}
                        </span>
                      </div>
                      {selectedOrderForAudit.pickupPhotoUrl && (
                        <div className="pt-2">
                          <span className="text-slate-400 block mb-1">Pickup Inspection Photo:</span>
                          <img
                            src={selectedOrderForAudit.pickupPhotoUrl}
                            alt="Pickup Photo"
                            className="w-full h-32 rounded-xl object-cover border border-slate-700"
                          />
                        </div>
                      )}
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Audit Trail Events ({selectedOrderForAudit.timeline.length})
                      </h5>
                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {selectedOrderForAudit.timeline.map((item: any, i: number) => (
                          <div key={i} className="text-xs flex items-start gap-2">
                            <span className="font-mono text-slate-500 text-[10px] w-9 pt-0.5">{item.timestamp}</span>
                            <div>
                              <div className="font-semibold text-slate-200">{item.titleEn}</div>
                              <div className="text-[10px] text-slate-400">{item.descriptionEn}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-xs text-slate-400">
                    Select a delivery order to inspect its full chain-of-custody audit logs and OTP details.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: DRIVER KYC VERIFICATION CENTER */}
        {activeSection === 'verification' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">
                  {isRtl ? 'مركز مراجعة وتوثيق الكباتن (Anti-Fraud & KYC)' : 'Driver Verification & Identity Audit (KYC)'}
                </h2>
                <p className="text-xs text-slate-400">
                  {isRtl ? 'فحص بطاقات الرقم القومي ورخص القيادة وصور المركبات لضمان الأمان ومكافحة السرقة' : 'Review National IDs, licenses, vehicle books and selfies to prevent fraud and impersonation'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drivers.map((drv) => (
                <div
                  key={drv.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={drv.avatarUrl}
                        alt={drv.fullName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-slate-700"
                      />
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{drv.fullName}</span>
                          {drv.verificationStatus === 'verified' && (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-bold border border-emerald-500/20">
                              Verified ✓
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">{drv.phone}</div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          National ID: <span className="font-mono">{drv.nationalId}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                        drv.verificationStatus === 'verified'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : drv.verificationStatus === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {drv.verificationStatus.toUpperCase()}
                    </span>
                  </div>

                  {/* Vehicle Spec */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400">Vehicle:</span> {drv.vehicle.model}
                    </div>
                    <div>
                      <span className="text-slate-400">Plate:</span> <span className="font-mono text-amber-400 font-bold">{drv.vehicle.plateNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Capacity:</span> {drv.vehicle.maxPayloadKg} kg
                    </div>
                    <div>
                      <span className="text-slate-400">Trips:</span> {drv.totalDeliveries} completed
                    </div>
                  </div>

                  {/* KYC Review Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    {drv.verificationStatus !== 'verified' ? (
                      <button
                        onClick={() => updateDriverVerification(drv.id, 'verified')}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isRtl ? 'اعتماد الكابتن والوثائق' : 'Approve & Verify Driver'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => updateDriverVerification(drv.id, 'suspended')}
                        className="flex-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-600/40 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>{isRtl ? 'إيقاف حساب السائق' : 'Suspend Driver Account'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: DISPUTES CENTER */}
        {activeSection === 'disputes' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">
              {isRtl ? 'مركز إدارة النزاعات وشكاوى الشحنات' : 'Cargo Disputes & Claims Resolution Center'}
            </h2>

            {disputes.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400">
                {isRtl ? 'لا توجد نزاعات معلقة حالياً.' : 'No active disputes or claims recorded.'}
              </div>
            ) : (
              <div className="space-y-3">
                {disputes.map((dsp) => (
                  <div key={dsp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-bold text-white">Claim #{dsp.id}</span>
                        <span className="text-xs text-slate-400 font-mono">· Delivery {dsp.deliveryId}</span>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${dsp.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {dsp.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <strong>Issue Reported:</strong> {dsp.reasonText}
                    </p>

                    {dsp.resolutionNotes ? (
                      <div className="text-xs text-emerald-300">
                        <strong>Resolution:</strong> {dsp.resolutionNotes}
                      </div>
                    ) : (
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => resolveDispute(dsp.id, 'Investigation completed with sender & driver. Cargo intact, released payment.')}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl"
                        >
                          Resolve & Close Dispute
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
