import React, { useState } from 'react';
import { 
  MessageSquareText, 
  Activity, 
  Coins, 
  Navigation, 
  Search, 
  PackageCheck, 
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AI_AGENTS, AgentDetail } from '../data/agents';

interface AgentsSectionProps {
  onSelectAgent: (agent: AgentDetail) => void;
}

export const AgentsSection: React.FC<AgentsSectionProps> = ({ onSelectAgent }) => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareText':
        return MessageSquareText;
      case 'Activity':
        return Activity;
      case 'Coins':
        return Coins;
      case 'Navigation':
        return Navigation;
      case 'Search':
        return Search;
      case 'PackageCheck':
        return PackageCheck;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Activity;
    }
  };

  return (
    <section id="agents" className="py-20 md:py-28 bg-[#070B14] border-t border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <span>Specialized Autonomous Workforce</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Your logistics team, augmented by AI.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
            Purpose-built agents executing agentic workflows and tool calls across your delivery pipeline — with human-in-the-loop governance for approved actions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              AI-assisted workflows
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Strict human-in-the-loop triggers
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Controlled execution
            </span>
          </div>
        </div>

        {/* 7 AI Agents Bento / Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_AGENTS.map((agent, index) => {
            const Icon = getAgentIcon(agent.iconName);
            const isMarquee = agent.id === 'cash-collection' || agent.id === 'customer-support';

            return (
              <div
                key={agent.id}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
                className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between p-6 cursor-pointer group ${
                  isMarquee
                    ? 'border-blue-500/40 bg-gradient-to-b from-blue-950/20 via-[#0A0F1D] to-[#0A0F1D] shadow-lg shadow-blue-950/20'
                    : 'border-slate-800 bg-[#0A0F1D]/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
                onClick={() => onSelectAgent(agent)}
              >
                {/* Top Row: Category & Human Oversight Level */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                      {agent.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-slate-700 bg-slate-900 text-slate-300">
                      {agent.humanOversightLevel}
                    </span>
                  </div>

                  {/* Icon & Agent Name */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 group-hover:scale-105 group-hover:border-blue-400 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
                        {agent.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">Agentic Module</p>
                    </div>
                  </div>

                  {/* Short Explanation */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {agent.shortExplanation}
                  </p>

                  {/* Capability Highlights */}
                  <ul className="space-y-1.5 border-t border-slate-800/80 pt-3 mb-4">
                    {agent.primaryCapabilities.slice(0, 3).map((cap, i) => (
                      <li key={i} className="text-[11px] text-slate-400 flex items-start gap-2">
                        <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                        <span className="line-clamp-1">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-300 group-hover:text-blue-400 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>View approved workflow</span>
                  </span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
