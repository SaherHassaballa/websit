import React from 'react';
import { Truck, Navigation, Box, ShoppingBag } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const categories = [
    {
      name: 'Delivery',
      description: 'Last-mile and multi-point distribution',
      icon: Truck,
    },
    {
      name: 'Courier Operations',
      description: 'Motorbike fleets and express on-demand runners',
      icon: Navigation,
    },
    {
      name: 'Shipping',
      description: 'Regional freight and hub-to-hub cargo',
      icon: Box,
    },
    {
      name: 'E-commerce Logistics',
      description: 'Merchant fulfillment and direct-to-consumer ops',
      icon: ShoppingBag,
    },
  ];

  return (
    <section className="border-y border-slate-800/80 bg-[#0A0F1D]/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
            Built for the operational complexity of modern delivery businesses.
          </p>
        </div>

        {/* 4 Conceptual Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="group p-4 rounded-xl border border-slate-800/70 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 group-hover:border-blue-500/40 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">{cat.name}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-normal">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
