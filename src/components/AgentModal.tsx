import React from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Sparkles, 
  Lock,
  MessageSquareText, 
  Activity, 
  Coins, 
  Navigation, 
  Search, 
  PackageCheck, 
  TrendingUp 
} from 'lucide-react';
import { AgentDetail } from '../data/agents';

interface AgentModalProps {
  agent: AgentDetail | null;
  onClose: () => void;
  onOpenEarlyAccess: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ agent, onClose, onOpenEarlyAccess }) => {
  if (!agent) return null;

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareText': return MessageSquareText;
      case 'Activity': return Activity;
      case 'Coins': return Coins;
      case 'Navigation': return Navigation;
      case 'Search': return Search;
      case 'PackageCheck': return PackageCheck;
      case 'TrendingUp': return TrendingUp;
      default: return Activity;
    }
  };

  const Icon = getAgentIcon(agent.iconName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#0B101D] p-6 sm:p-8 shadow-2xl text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-blue-400 tracking-wider">
                {agent.category}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {agent.humanOversightLevel}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{agent.name}</h3>
          </div>
        </div>

        {/* Detailed Explanation */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {agent.fullDescription}
        </p>

        {/* Primary Operational Capabilities */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Primary Capabilities:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {agent.primaryCapabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Human-in-the-Loop Rule */}
        <div className="mb-6 p-4 rounded-xl border border-blue-500/30 bg-blue-950/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Human-in-the-Loop Boundary</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {agent.humanInTheLoopRule}
          </p>
        </div>

        {/* Example Action Workflow */}
        <div className="mb-6 bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono text-slate-400">Sample Agentic Workflow Sequence</span>
            <span className="text-[10px] font-mono text-emerald-400">Deterministic Tool Call</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Trigger:</span>
              <p className="text-slate-300 font-sans">{agent.exampleAction.trigger}</p>
            </div>
            <div>
              <span className="text-blue-400 block text-[10px]">Action Prepared by Agent:</span>
              <p className="text-slate-300 font-sans">{agent.exampleAction.actionPrepared}</p>
            </div>
            <div>
              <span className="text-emerald-400 block text-[10px]">Human Verification Requirement:</span>
              <p className="text-slate-300 font-sans">{agent.exampleAction.humanVerification}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenEarlyAccess();
            }}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-900/30 cursor-pointer"
          >
            Request Early Access For This Agent
          </button>
        </div>
      </div>
    </div>
  );
};
