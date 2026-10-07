import React, { useState } from 'react';
import { Activity, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('node-ops');

  const nodes = [
    {
      id: 'node-central',
      x: 180,
      y: 190,
      title: 'Central Hub',
      type: 'Sorting Facility',
      status: 'Active Ingestion',
      metric: '320 pkgs staged',
    },
    {
      id: 'node-north',
      x: 320,
      y: 110,
      title: 'North Zone Hub',
      type: 'Micro-Distribution',
      status: 'Dispatch Ready',
      metric: '8 couriers active',
    },
    {
      id: 'node-east',
      x: 360,
      y: 260,
      title: 'East Zone Hub',
      type: 'Urban Fulfillment',
      status: 'Dynamic Routing',
      metric: '14 couriers active',
    },
    {
      id: 'node-dest-1',
      x: 480,
      y: 80,
      title: 'Urban Cluster A',
      type: 'Final Destination',
      status: 'Out for Delivery',
      metric: '42 drop-offs scheduled',
    },
    {
      id: 'node-dest-2',
      x: 500,
      y: 220,
      title: 'Commercial District',
      type: 'COD Settlement Area',
      status: 'Cash Reconciliation',
      metric: 'EGP 18,750 tracked',
    },
    {
      id: 'node-ops',
      x: 230,
      y: 330,
      title: 'AI Agent Orchestration',
      type: 'Autonomous Core',
      status: 'Supervising 7 Agents',
      metric: 'Deterministic tool calling',
    },
  ];

  const currentNode = nodes.find((n) => n.id === activeNode) || nodes[5];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none rounded-2xl border border-slate-800 bg-[#0A0F1D]/80 p-5 shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Background glow and subtle coordinate grid */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
      
      {/* Header bar representing the live operational layer */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 font-medium">Logistics Agent Mesh</span>
          <span className="text-slate-500 text-xs">·</span>
          <span className="text-[11px] text-slate-400">Simulation View</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Human-in-the-Loop</span>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative h-72 sm:h-80 w-full bg-[#080C17]/60 rounded-xl border border-slate-800/80 p-2 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        <svg className="w-full h-full" viewBox="0 0 580 380" fill="none">
          <defs>
            <linearGradient id="routeGradientA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="routeGradientB" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
            </linearGradient>
            <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Logistics Route Lines */}
          <path
            d="M 180 190 Q 250 140 320 110"
            stroke="url(#routeGradientA)"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <path
            d="M 180 190 Q 280 230 360 260"
            stroke="url(#routeGradientA)"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <path
            d="M 320 110 Q 400 90 480 80"
            stroke="url(#routeGradientB)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <path
            d="M 360 260 Q 430 240 500 220"
            stroke="url(#routeGradientB)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          
          {/* Agent Orchestration Control Bridges */}
          <path
            d="M 230 330 L 180 190"
            stroke="#3B82F6"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <path
            d="M 230 330 L 360 260"
            stroke="#3B82F6"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <path
            d="M 230 330 L 320 110"
            stroke="#3B82F6"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />

          {/* Animated Route Flow Packets */}
          <circle cx="250" cy="150" r="3" fill="#60A5FA">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="270" cy="225" r="3" fill="#38BDF8">
            <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="95" r="2.5" fill="#60A5FA">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="430" cy="240" r="2.5" fill="#38BDF8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.1s" repeatCount="indefinite" />
          </circle>

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = activeNode === node.id;
            const isAgent = node.id === 'node-ops';
            return (
              <g
                key={node.id}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveNode(node.id)}
              >
                {/* Outer Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 18 : 12}
                  fill={isAgent ? '#1E3A8A' : '#0F172A'}
                  stroke={isSelected ? '#60A5FA' : isAgent ? '#3B82F6' : '#334155'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter={isSelected ? 'url(#nodeGlow)' : undefined}
                />
                
                {/* Core Dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? '#93C5FD' : isAgent ? '#60A5FA' : '#64748B'}
                />

                {/* Node Label */}
                <text
                  x={node.x}
                  y={node.y + 24}
                  fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                  fontSize="10"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight={isSelected ? '600' : '400'}
                  textAnchor="middle"
                >
                  {node.title}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Mini Agent Pill */}
        <div className="absolute top-3 left-3 bg-[#0B1222]/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2 backdrop-blur-md">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px] text-slate-200 font-mono">Agent: Route Optimizer</span>
          <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Active</span>
        </div>
      </div>

      {/* Node Inspector telemetry footer */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80">
        <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Selected Component</p>
          <p className="text-xs font-semibold text-white truncate mt-0.5">{currentNode.title}</p>
          <p className="text-[11px] text-slate-400 truncate">{currentNode.type}</p>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Agent Telemetry</p>
          <p className="text-xs font-mono font-medium text-blue-400 truncate mt-0.5">{currentNode.status}</p>
          <p className="text-[11px] font-mono-nums text-slate-300 truncate">{currentNode.metric}</p>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Governance</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          </div>
          <p className="text-[11px] text-slate-300">Human Approval Enabled</p>
        </div>
      </div>
    </div>
  );
};
