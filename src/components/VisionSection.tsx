import React from 'react';
import { Compass, ShieldCheck, Eye, Cpu, Users } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const VisionSection: React.FC = () => {
  const visionPillars = [
    {
      title: 'Human Agency & Control',
      description: 'AI handles repetitive computational and messaging chores; human dispatchers retain authority on all consequential decisions, disputes, and exceptions.',
      icon: Users,
    },
    {
      title: 'Reliability Over Speculation',
      description: 'In logistics, an incorrect address or bad balance calculation has real-world consequences. We design for zero-hallucination tool calling and strict schema compliance.',
      icon: ShieldCheck,
    },
    {
      title: 'Operator-First Ergonomics',
      description: 'Built specifically for the high-pressure reality of logistics dispatchers, fleet supervisors, and courier captains who need speed, clarity, and dependable automation.',
      icon: Eye,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#070B14] border-t border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <span>Our Long-Term Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Building the AI operating layer for logistics.
          </h2>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed [text-wrap:balance]">
            We are building toward a future where logistics teams can manage more of their daily operations through intelligent agents — while keeping humans in control of important decisions.
          </p>
        </div>

        {/* 3 Foundational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {visionPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl border border-slate-800 bg-[#0A0F1D]/80 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{pillar.description}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
                  <span>Core Principle</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Startup Stage Banner */}
        <div className="mt-14 max-w-3xl mx-auto p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 text-center text-xs text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-200">{BRAND_CONFIG.companyName}</strong> is an independent early-stage venture currently designing and testing our MVP with select delivery operators. We are actively shaping features based on real dispatcher workflows.
          </p>
        </div>
      </div>
    </section>
  );
};
