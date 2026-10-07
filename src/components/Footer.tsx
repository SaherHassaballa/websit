import React from 'react';
import { Mail, Settings, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

interface FooterProps {
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide }) => {
  const footerLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'AI Agents', href: '#agents' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-slate-800 bg-[#060911] text-slate-400 text-xs py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Purpose Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-white text-base font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 font-mono text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>{BRAND_CONFIG.companyName}</span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              AI-powered logistics and delivery operations. Developing intelligent agents to automate customer support, operations, cash collection, and everyday logistics workflows.
            </p>

            <div className="pt-1 flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <a
                href={`mailto:${BRAND_CONFIG.supportEmail}`}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {BRAND_CONFIG.supportEmail}
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] font-mono">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Development Notice & Customization Guide */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] font-mono">
              Stage
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Early-stage technology venture in active MVP development. Designed for delivery and courier operators.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-pointer text-[11px]"
              >
                <Settings className="w-3 h-3 text-blue-400" />
                <span>Brand Customization Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean Legal & Copyright */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {BRAND_CONFIG.copyrightYear} {BRAND_CONFIG.companyName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Human-in-the-Loop Governance</span>
            <span>·</span>
            <span>Deterministic Tool Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
