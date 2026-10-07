import React, { useState } from 'react';
import { 
  MessageSquareText, 
  Bot, 
  User, 
  Terminal, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Send,
  Sparkles
} from 'lucide-react';
import { CHAT_SCENARIOS } from '../data/logisticsScenarios';

export const CustomerSupportSection: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('status-check');

  const currentScenario = CHAT_SCENARIOS.find((s) => s.id === selectedScenarioId) || CHAT_SCENARIOS[0];

  return (
    <section className="py-20 md:py-28 bg-[#070B14] border-t border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <span>Conversational Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Intelligent customer support that understands delivery context.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
            Customers don’t want generic chatbot scripts. Our customer support agent executes real-time database queries to provide immediate parcel updates, calculate rates, and route exceptions.
          </p>
        </div>

        {/* Realistic Chat Showcase */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-[#0A0F1D] shadow-2xl overflow-hidden">
          {/* Top Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">AI Customer Support Agent</span>
                  {/* Explicit Mandatory Label */}
                  <span className="text-[11px] font-mono text-blue-300 bg-blue-950/60 border border-blue-700/50 px-2 py-0.5 rounded font-medium">
                    Example interaction
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Connected to Live Fleet Dispatch &amp; Tracking APIs
                </p>
              </div>
            </div>

            {/* Scenario Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {CHAT_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenarioId(scen.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    selectedScenarioId === scen.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {scen.title}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-6 sm:p-8 space-y-4 bg-gradient-to-b from-[#080C17] to-[#0A0F1D] min-h-[360px] flex flex-col justify-center">
            {currentScenario.messages.map((msg, index) => {
              if (msg.sender === 'system') {
                return (
                  <div
                    key={index}
                    className="my-2 py-2 px-3.5 rounded-lg bg-slate-950/90 border border-blue-500/20 text-xs font-mono text-slate-300 max-w-lg mx-auto flex items-start gap-2.5 shadow-sm"
                  >
                    <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-blue-300 text-[11px]">{msg.text}</p>
                      {msg.toolCall && (
                        <p className="text-[11px] text-slate-400">
                          Result: <span className="text-slate-200">{msg.toolCall.resultSnippet}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              }

              const isCustomer = msg.sender === 'customer';

              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${isCustomer ? 'justify-end' : 'justify-start'}`}
                >
                  {!isCustomer && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isCustomer
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1 font-mono ${
                        isCustomer ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {isCustomer && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Bar */}
          <div className="bg-slate-900/60 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Escalates automatically to human dispatcher on negative sentiment or complex address changes.</span>
            </span>
            <span className="font-mono text-slate-400 hidden sm:inline">Zero hallucinated ETAs</span>
          </div>
        </div>
      </div>
    </section>
  );
};
