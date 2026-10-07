import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Coins, 
  Truck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { DELIVERY_DISCOVERY_OPTIONS, DeliveryDiscoveryOption } from '../data/logisticsScenarios';

export const DeliveryDiscoverySection: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>('Greater Cairo (Urban)');

  const discoveryPipeline = [
    { title: 'Destination', sub: 'Target address & geo-cluster' },
    { title: 'Available Services', sub: 'Active fleets & carrier APIs' },
    { title: 'Price', sub: 'Weight & volume calculation' },
    { title: 'Estimated Time', sub: 'Traffic & transit window' },
    { title: 'Coverage', sub: 'Service reliability zone' },
    { title: 'Recommended Option', sub: 'Ranked best operational fit' },
  ];

  const currentOptions = DELIVERY_DISCOVERY_OPTIONS[selectedDestination] || [];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <span>Carrier Optimization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Find the right delivery option.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
            The system is designed to help operators search and compare available delivery options based on operational requirements, coverage reliability, and cost.
          </p>
        </div>

        {/* Discovery Pipeline Sequence */}
        <div className="mb-12 bg-[#0A0F1D]/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Automated Discovery Pipeline
            </span>
            <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Multi-Carrier Optimization
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {discoveryPipeline.map((step, idx) => (
              <div
                key={step.title}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                      0{idx + 1}
                    </span>
                    {idx < 5 && (
                      <ArrowRight className="hidden lg:block w-3.5 h-3.5 text-slate-600 -mr-1" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-white leading-tight mb-1">
                    {step.title}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {step.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Sandbox */}
        <div className="rounded-2xl border border-slate-800 bg-[#0A0F1D] shadow-2xl p-6 sm:p-8">
          {/* Destination Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white">Select Test Destination:</span>
            </div>

            <div className="flex items-center gap-2">
              {Object.keys(DELIVERY_DISCOVERY_OPTIONS).map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedDestination === dest
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>

          {/* Carrier Service Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentOptions.map((opt) => (
              <div
                key={opt.carrierName}
                className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                  opt.recommended
                    ? 'border-blue-500/50 bg-gradient-to-b from-blue-950/30 to-[#0A0F1D] ring-1 ring-blue-500/30'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white tracking-tight">{opt.carrierName}</span>
                    {opt.recommended && (
                      <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded uppercase font-semibold">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-4 font-mono">{opt.serviceTier}</p>

                  <div className="space-y-2.5 border-t border-slate-800/80 pt-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Price:</span>
                      <span className="font-mono-nums font-semibold text-white">{opt.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Transit Window:</span>
                      <span className="font-mono-nums text-slate-300">{opt.deliveryTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Coverage Score:</span>
                      <span className="text-slate-300">{opt.coverageScore}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300 block mb-1">Agent Evaluation:</span>
                    <p className="leading-relaxed">{opt.reason}</p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>SLA Guarantee</span>
                  <span className="text-blue-400">{opt.sla}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>Note: Carrier rates, transit times, and coverage scores are evaluated via live or staged API connectors.</span>
            <span className="font-mono text-slate-300">Operator maintains final booking confirmation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
