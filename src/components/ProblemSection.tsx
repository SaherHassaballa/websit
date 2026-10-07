import React from 'react';
import { 
  MessageSquare, 
  Search, 
  PhoneCall, 
  Calculator, 
  Receipt, 
  MapPin, 
  RefreshCw, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const painPoints = [
    {
      title: 'Answering repetitive customer questions',
      description: 'Endless "Where is my parcel?" queries clogging up operator chat queues.',
      icon: MessageSquare,
    },
    {
      title: 'Checking delivery status across systems',
      description: 'Switching between multiple portals and phone calls to locate a single driver.',
      icon: Search,
    },
    {
      title: 'Communicating manual courier instructions',
      description: 'Typing individual route changes, address clarifications, and dispatch assignments.',
      icon: PhoneCall,
    },
    {
      title: 'Calculating courier settlements manually',
      description: 'Reconciling daily Cash-on-Delivery (COD) collections in error-prone spreadsheets.',
      icon: Calculator,
    },
    {
      title: 'Following up on outstanding payments',
      description: 'Tracking down missing balances from field couriers across multi-day shifts.',
      icon: Receipt,
    },
    {
      title: 'Searching for available delivery options',
      description: 'Manually comparing carrier rates, coverage zones, and delivery times per destination.',
      icon: MapPin,
    },
    {
      title: 'Updating orders and manifests',
      description: 'Re-entering customer notes, status modifications, and tracking numbers by hand.',
      icon: RefreshCw,
    },
    {
      title: 'Handling operational exceptions',
      description: 'Triaging failed delivery attempts, address errors, and delayed handovers in real time.',
      icon: AlertTriangle,
    },
  ];

  return (
    <section id="platform" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <span>The Operational Bottleneck</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Logistics operations are full of repetitive work.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
            Delivery teams lose hundreds of operational hours every week manually shuffling information between customers, drivers, and fragmented software tools.
          </p>
        </div>

        {/* 8 Pain Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="p-5 rounded-xl border border-slate-800 bg-[#0A0F1D]/70 hover:border-slate-700 hover:bg-slate-900/60 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:text-blue-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">
                  {point.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* The Transition: Manual vs AI Operating Layer */}
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/30 via-[#0A0F1D] to-[#0A0F1D] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                The Shift To Agentic Operations
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug [text-wrap:balance]">
                Our platform is being built to turn these repetitive workflows into intelligent, controllable AI-driven operations.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Instead of operators executing dozens of repetitive clicks and phone calls, AI agents are designed to understand operational context, perform exact calculations, communicate across channels, and prepare actions for human sign-off.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3.5">
              <div className="text-xs font-mono text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Operational Transformation</span>
                <span className="text-blue-400">In Development</span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 text-slate-400">
                  <span className="text-red-400 font-mono shrink-0">✕</span>
                  <span>Manual spreadsheets and unverified cash tallies</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Automated settlement math with strict operator approval</span>
                </div>

                <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                  <span className="text-red-400 font-mono shrink-0">✕</span>
                  <span>Operators manually answering "Where is my parcel?"</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Real-time agent queries with live tracking database lookup</span>
                </div>

                <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                  <span className="text-red-400 font-mono shrink-0">✕</span>
                  <span>Guesswork when comparing multi-carrier options</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Automated discovery evaluating price, coverage, and SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
