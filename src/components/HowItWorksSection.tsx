import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  Layers, 
  Lock 
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Connect',
      headline: 'Connect orders, operational data, and business tools.',
      description: 'The platform integrates with your existing order management system, courier messaging channels, tracking endpoints, and operational databases without requiring you to replace your core tech stack.',
      icon: Network,
      details: [
        'Ingest orders via standard REST APIs or batch webhooks',
        'Connect WhatsApp/SMS courier communication gateways',
        'Map internal fulfillment checkpoints and warehouse zones',
        'Zero vendor lock-in with existing logistics tools'
      ],
      badge: 'Unified Data Layer'
    },
    {
      number: '02',
      title: 'Understand',
      headline: 'AI agents understand requests and operational context.',
      description: 'Equipped with logistics domain knowledge, agents interpret ambiguous customer queries, driver status updates, delayed shipment alerts, and rate structures in true operational context.',
      icon: Cpu,
      details: [
        'Parse multi-language customer tracking inquiries',
        'Identify delivery delays before SLA breach thresholds',
        'Evaluate parcel weight, dimensions, and fragile flags',
        'Maintain conversational memory throughout active shifts'
      ],
      badge: 'Context Engine'
    },
    {
      number: '03',
      title: 'Act',
      headline: 'Agents retrieve information, perform calculations, and prepare or execute approved actions.',
      description: 'Agents do not stop at generating conversational text — they call validated tools to run exact math, update shipment metadata, stage dispatch instructions, and compile settlement sheets.',
      icon: Zap,
      details: [
        'Deterministic calculations for COD settlements and tariffs',
        'Prepare courier shift sequence and routing notes',
        'Search and compare multiple delivery carrier options',
        'Draft personalized WhatsApp/SMS courier updates'
      ],
      badge: 'Agentic Tool Calling'
    },
    {
      number: '04',
      title: 'Control',
      headline: 'Sensitive operations remain subject to business rules and human approval.',
      description: 'Autonomous efficiency meets strict enterprise safety. High-impact financial reconciliations, refunds, route cancellations, or billing edits require explicit dispatcher confirmation.',
      icon: ShieldCheck,
      details: [
        'Configurable approval gates for financial transactions',
        'Human dispatcher overrides at any moment',
        'Complete audit trails logged for every agent action',
        'Granular role-based permissions across team members'
      ],
      badge: 'Human-in-the-Loop'
    },
  ];

  const currentStep = steps[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#070B14] border-t border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <span>Operating Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            How the platform operates.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
            From raw order ingestion to reconciled cash settlement, intelligent agents work alongside your dispatchers through a disciplined four-step operational cycle.
          </p>
        </div>

        {/* 4 Step Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeStep === idx
                  ? 'border-blue-500 bg-blue-950/30 ring-1 ring-blue-500/40'
                  : 'border-slate-800 bg-[#0A0F1D]/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold ${activeStep === idx ? 'text-blue-400' : 'text-slate-400'}`}>
                  {step.number}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  activeStep === idx ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">{step.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{step.headline}</p>
            </button>
          ))}
        </div>

        {/* Deep Dive Panel */}
        <div className="rounded-2xl border border-slate-800 bg-[#0A0F1D] p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Detailed Step Explanation */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
                  <StepIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400">Step {currentStep.number}</span>
                  <h3 className="text-2xl font-bold text-white">{currentStep.headline}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStep.description}
              </p>

              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Operational Mechanics:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentStep.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Context Card */}
            <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-mono text-slate-400">Security &amp; Reliability Invariant</span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Controlled Gate
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-400 font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-slate-200 font-semibold mb-1">State Machine Integration</p>
                  <p className="text-[11px] leading-relaxed">
                    Actions are committed only after schema validation against the operational database.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <p className="text-slate-200 font-semibold mb-1">Auditability by Design</p>
                  <p className="text-[11px] leading-relaxed">
                    Every message drafted, calculation executed, and confirmation recorded is preserved in immutable audit logs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
