import React, { useState } from 'react';
import { 
  ArrowRight, 
  Coins, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Send, 
  AlertCircle, 
  User, 
  Calendar, 
  Check, 
  RefreshCw,
  Lock
} from 'lucide-react';
import { CASH_COLLECTION_DATA } from '../data/logisticsScenarios';

export const CashCollectionSection: React.FC = () => {
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'statement' | 'courier-msg' | 'audit'>('statement');

  const workflowSteps = [
    { number: '1', title: 'Completed Deliveries', sub: 'Courier closes shift manifests' },
    { number: '2', title: 'Calculate Outstanding', sub: 'COD totals vs. verified drops' },
    { number: '3', title: 'Generate Statement', sub: 'Automated math with zero rounding drift' },
    { number: '4', title: 'Notify Courier', sub: 'Personalized settlement notice drafted' },
    { number: '5', title: 'Human Approval', sub: 'Operator verifies balances & receipts' },
    { number: '6', title: 'Settlement', sub: 'Financial ledger reconciled' },
  ];

  return (
    <section id="cash-collection" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <span>Critical Financial Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Automate the work behind cash collection.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
            Reconciling Cash-on-Delivery (COD) should not take hours of spreadsheet arithmetic. The agent prepares calculations and messages while sensitive financial actions remain strictly under human control.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="mb-14 bg-[#0A0F1D]/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Settlement Lifecycle Pipeline
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Human-in-the-Loop Gateway
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {workflowSteps.map((step, idx) => {
              const isApprovalStep = step.title === 'Human Approval';
              return (
                <div
                  key={step.title}
                  className={`relative p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                    isApprovalStep
                      ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300'
                      : 'border-slate-800 bg-slate-900/50 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isApprovalStep ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {step.number}
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
                  {isApprovalStep && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-500/30 flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                      <Lock className="w-3 h-3" />
                      <span>Strict Sign-Off</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fictional Dashboard Container */}
        <div className="rounded-2xl border border-slate-800 bg-[#0A0F1D] shadow-2xl overflow-hidden">
          {/* Dashboard Header Bar */}
          <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Courier Settlement Statement</h3>
                  {/* Explicit Mandatory Label */}
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 border border-amber-600/50 px-2 py-0.5 rounded font-medium">
                    Example data
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  ID: SETTL-2026-089 · Agent Prepared Calculation
                </p>
              </div>
            </div>

            {/* Live Interactive State Badge & Action */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] uppercase font-mono text-slate-400">Governance State</p>
                <p className={`text-xs font-semibold font-mono ${isApproved ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isApproved ? 'Approved by Operator' : 'Pending Human Approval'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApproved(!isApproved)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  isApproved
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                }`}
              >
                {isApproved ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Simulation</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Settlement</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-slate-800 border-b border-slate-800 bg-slate-950/40">
            <div className="p-4 sm:p-5">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Courier</p>
              <div className="flex items-center gap-2 mt-1">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-base font-bold text-white">{CASH_COLLECTION_DATA.courierName}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Route #4 – West</p>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Period</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-base font-bold text-white">{CASH_COLLECTION_DATA.settlementPeriod}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Cycle closes today</p>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Completed Deliveries</p>
              <p className="text-base font-bold text-white mt-1 font-mono-nums">
                {CASH_COLLECTION_DATA.completedDeliveries}
              </p>
              <p className="text-[11px] text-emerald-400 mt-0.5">100% Drop verification</p>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Amount Collected</p>
              <p className="text-base font-bold text-white mt-1 font-mono-nums">
                {CASH_COLLECTION_DATA.amountCollected}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono-nums">Deposited: {CASH_COLLECTION_DATA.depositedAmount}</p>
            </div>

            <div className="p-4 sm:p-5 col-span-2 md:col-span-1 bg-emerald-950/10">
              <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">Outstanding Settlement</p>
              <p className="text-xl font-bold text-emerald-300 mt-1 font-mono-nums">
                {CASH_COLLECTION_DATA.outstandingSettlement}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Requires cashier handover</p>
            </div>
          </div>

          {/* Interactive tabs: Statement details vs Generated Courier Message vs Governance audit */}
          <div className="p-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('statement')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'statement'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Itemized Delivery Records
              </button>
              <button
                onClick={() => setActiveTab('courier-msg')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'courier-msg'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Automated Courier Notification</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.2 rounded font-mono">Drafted</span>
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'audit'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Control &amp; Safety Rule
              </button>
            </div>

            {/* Tab 1: Itemized Statement */}
            {activeTab === 'statement' && (
              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="pb-2.5 font-medium">Order Reference</th>
                        <th className="pb-2.5 font-medium">Recipient</th>
                        <th className="pb-2.5 font-medium">Delivery Timestamp</th>
                        <th className="pb-2.5 font-medium text-right">COD Collected</th>
                        <th className="pb-2.5 font-medium text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono-nums">
                      {CASH_COLLECTION_DATA.recentDeliveries.map((del) => (
                        <tr key={del.id} className="hover:bg-slate-900/40">
                          <td className="py-2.5 text-blue-400 font-mono">{del.id}</td>
                          <td className="py-2.5 text-slate-200 font-sans">{del.recipient}</td>
                          <td className="py-2.5 text-slate-400">{del.time}</td>
                          <td className="py-2.5 text-right font-semibold text-white">{del.amount}</td>
                          <td className="py-2.5 text-right text-emerald-400">
                            <span className="inline-flex items-center gap-1 font-sans text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Confirmed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <span>Displaying 4 of 42 verified drops for this settlement cycle.</span>
                  <span className="font-mono text-emerald-400">Math Invariant: Reconciled with bank drops</span>
                </p>
              </div>
            )}

            {/* Tab 2: Drafted Courier Message */}
            {activeTab === 'courier-msg' && (
              <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Send className="w-3.5 h-3.5 text-blue-400" />
                    <span>Prepared Outbound Channel: WhatsApp / SMS</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Recipient: Ahmed (+20 10...09)</span>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-3 text-xs text-slate-200 space-y-2 font-mono">
                  <p>Salam Ahmed,</p>
                  <p>
                    Your settlement statement for the 5-day period is prepared:
                  </p>
                  <p>
                    • Completed Deliveries: 42<br />
                    • Total COD Collected: EGP 18,750<br />
                    • Bank Deposited: EGP 14,500<br />
                    • Outstanding Cash Settlement: <strong className="text-emerald-400">EGP 4,250</strong>
                  </p>
                  <p>
                    Please visit the Central Cashier desk before 6:30 PM today to finalize your shift receipt.
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Note: Dispatched only after operator review or automated scheduled release.
                </p>
              </div>
            )}

            {/* Tab 3: Control & Safety Rule */}
            {activeTab === 'audit' && (
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Strict Human-in-the-Loop Governance Specification</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Financial calculations in logistics are zero-tolerance. The Cash Collection &amp; Reconciliation Agent is architected with strict boundary rules:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="border border-slate-800 bg-slate-900/60 rounded-lg p-3">
                    <span className="text-emerald-400 font-mono font-medium block mb-1">What the Agent Does:</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Aggregates confirmed manifests, computes outstanding balances, highlights mathematical anomalies, and prepares customized courier settlement notifications.
                    </p>
                  </div>
                  <div className="border border-slate-800 bg-slate-900/60 rounded-lg p-3">
                    <span className="text-blue-400 font-mono font-medium block mb-1">What Humans Control:</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Final ledger adjustments, balance write-offs, physical cash acceptance verification, and dispute resolution. No balance is marked settled without operator sign-off.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
