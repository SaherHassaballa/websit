import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Building2, 
  Send, 
  Sparkles,
  HelpCircle,
  Truck
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

interface EarlyAccessSectionProps {
  onOpenContactModal?: () => void;
}

export const EarlyAccessSection: React.FC<EarlyAccessSectionProps> = ({ onOpenContactModal }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    businessType: 'Delivery Company',
    fleetSize: '1–20 drivers / couriers',
    biggestFriction: '',
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.email.includes('@')) {
      setFormError('Please provide a valid work email address.');
      return;
    }
    if (!formData.name.trim()) {
      setFormError('Please provide your name.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/30 via-[#0A0F1D] to-[#0A0F1D] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
          
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider">
              <span>Co-Design With Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Help us build the future of logistics operations.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
              We are currently developing the platform and looking for early users and logistics businesses interested in AI-powered operational automation.
            </p>
          </div>

          {formSubmitted ? (
            <div className="max-w-md mx-auto p-8 rounded-2xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Application Received</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. We have registered <strong>{formData.company || 'your business'}</strong> for the early access cohort. Our founding team will reach out directly at <strong className="text-blue-400">{formData.email}</strong> to coordinate access.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Submit another application or update details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 text-left">
              {formError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Full Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tarek Mansour"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Work Email <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. tarek@logisticscompany.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Atlas Express Delivery"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Business Category
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Delivery Company">Delivery Company</option>
                    <option value="Courier Business">Courier Business</option>
                    <option value="Shipping Company">Shipping Company</option>
                    <option value="E-commerce Logistics">E-commerce Logistics Operation</option>
                    <option value="Small / Medium Logistics">Small / Medium Logistics Business</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Biggest Operational Priority or Pain Point
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cash-on-delivery reconciliation errors, high customer support chat volume..."
                  value={formData.biggestFriction}
                  onChange={(e) => setFormData({ ...formData, biggestFriction: e.target.value })}
                  className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-900/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Join Early Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`mailto:${BRAND_CONFIG.contactEmail}?subject=Logistics%20AI%20Platform%20Inquiry`}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 py-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Prefer direct email? Contact Founding Team</span>
                </a>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
            We value your operational privacy. We do not sell data or share waitlist details with third parties.
          </div>
        </div>
      </div>
    </section>
  );
};
