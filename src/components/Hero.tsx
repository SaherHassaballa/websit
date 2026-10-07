import React from 'react';
import { ArrowUpRight, ChevronRight, ShieldCheck, Cpu } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { BRAND_CONFIG } from '../config/brand';

interface HeroProps {
  onOpenEarlyAccess: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Early-stage honest indicator (No static pill box, clean unboxed typographic indicator) */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 border border-slate-800 rounded-md px-3 py-1 bg-slate-900/60 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>MVP in active development</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">Private Early Access</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              AI-Powered Operations for Delivery &amp; Logistics
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed [text-wrap:balance]">
              Intelligent agents that help delivery businesses automate customer support, operations, cash collection, and everyday logistics workflows.
            </p>

            {/* Core Value Statement */}
            <div className="pt-1 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Human-in-the-loop oversight on all sensitive financial and operational actions.</span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenEarlyAccess}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-900/25 cursor-pointer whitespace-nowrap"
              >
                <span>Join Early Access</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="#platform"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all whitespace-nowrap"
              >
                <span>Explore the Platform</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Honest Early-Stage Note */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Architecture:</span>
                <span className="text-slate-300 font-medium">Tool-Using AI Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Target:</span>
                <span className="text-slate-300 font-medium">Couriers, Shipping &amp; E-commerce Operations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Subtle Abstract Futuristic Logistics & AI Visual */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
