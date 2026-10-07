import React, { useState } from 'react';
import { 
  Users, 
  Bot, 
  Layers, 
  Cpu, 
  Database, 
  ArrowDown, 
  ShieldCheck, 
  Code2, 
  Network, 
  Workflow, 
  Lock, 
  SlidersHorizontal 
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string>('orchestration');

  const architectureLayers = [
    {
      id: 'interface',
      level: 'Tier 1',
      title: 'Users & Interaction Channels',
      subtitle: 'End Customers, Field Couriers, Dispatchers & Operators',
      description: 'Unified ingestion through conversational interfaces (WhatsApp, SMS, Web Chat) and operations control dashboards.',
      tech: 'REST / WebSockets / Messaging Webhooks',
      icon: Users,
    },
    {
      id: 'agents',
      level: 'Tier 2',
      title: 'Specialized AI Agents Layer',
      subtitle: 'Customer Support, Ops Monitoring, Cash Collection, Courier Comm, Discovery, Orders, Intelligence',
      description: 'Domain-tuned agent definitions with strictly defined functional tool access, memory windows, and operational objectives.',
      tech: 'LLMs & Specialized Prompt Frameworks',
      icon: Bot,
    },
    {
      id: 'orchestration',
      level: 'Tier 3',
      title: 'Agent Orchestration & Policy Layer',
      subtitle: 'Task Routing, State Management, Human-in-the-Loop Triggers',
      description: 'The core control plane enforcing business constraints, verifying schema outputs, and gating sensitive financial transactions.',
      tech: 'Workflow Orchestration, Guardrails & Policy Engine',
      icon: Layers,
    },
    {
      id: 'tools',
      level: 'Tier 4',
      title: 'Business Tools & API Connectors',
      subtitle: 'Calculators, Geocoders, Rate Engines, Notification Services',
      description: 'Tool-calling interfaces that execute deterministic math, query live courier coordinates, and draft outbound messages.',
      tech: 'Function / Tool Calling Protocols, Carrier APIs',
      icon: Code2,
    },
    {
      id: 'domain-entities',
      level: 'Tier 5',
      title: 'Core Logistics Entity Models',
      subtitle: 'Orders · Couriers · Payments · Delivery Services',
      description: 'Unified transactional domain data models maintaining single source of truth across all dispatch operations.',
      tech: 'Typed Schemas, Event Bus, State Transitions',
      icon: Workflow,
    },
    {
      id: 'database',
      level: 'Tier 6',
      title: 'Operational Database & Audit Ledger',
      subtitle: 'Persistent Relational Records & Immutable Event History',
      description: 'High-availability operational storage with strict audit logging for all automated actions and human verification events.',
      tech: 'Relational Database & Audit Log Storage',
      icon: Database,
    },
  ];

  const currentLayer = architectureLayers.find((l) => l.id === selectedLayer) || architectureLayers[2];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <span>Technical Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Designed around tool-using AI agents and controlled workflows.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
            Our platform architecture couples large language models with deterministic business tools, explicit permission boundaries, and structured operational databases.
          </p>
          <div className="inline-block pt-1">
            <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 rounded px-2.5 py-1">
              Architecture in active development for our initial platform release
            </span>
          </div>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: The Tiered Architecture Stack */}
          <div className="lg:col-span-7 space-y-3">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon;
              const isSelected = selectedLayer === layer.id;

              return (
                <div key={layer.id} className="relative">
                  <div
                    onClick={() => setSelectedLayer(layer.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/30 ring-1 ring-blue-500/50 shadow-lg shadow-blue-950/40'
                        : 'border-slate-800 bg-[#0A0F1D]/80 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-blue-400">{layer.level}</span>
                          <span className="text-xs text-slate-500">·</span>
                          <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                            {layer.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{layer.subtitle}</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {layer.tech.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Connecting Down Arrow */}
                  {index < architectureLayers.length - 1 && (
                    <div className="flex justify-center my-1">
                      <ArrowDown className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Layer Inspector & Engineering Guardrails */}
          <div className="lg:col-span-5 bg-[#0A0F1D] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">Layer Specification</span>
                <h4 className="text-lg font-bold text-white mt-0.5">{currentLayer.title}</h4>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                {currentLayer.level}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentLayer.description}
            </p>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Underlying Technologies &amp; Patterns
              </span>
              <p className="text-xs font-mono text-blue-400">{currentLayer.tech}</p>
            </div>

            {/* Core Architectural Tenets */}
            <div className="border-t border-slate-800/80 pt-4 space-y-3">
              <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Engineering Tenets:
              </h5>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Deterministic Tool Calling:</strong> LLMs never calculate financial balances; they invoke typed math tools.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Human Gates:</strong> Critical balance adjustments require manual operator sign-off.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Auditable Data Layer:</strong> All actions maintain traceable event IDs for complete reconciliation.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
