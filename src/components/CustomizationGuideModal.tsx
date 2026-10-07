import React, { useState } from 'react';
import { X, Check, Copy, FileText, Code2, Sparkles, Building2, Mail, Globe, Image } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

interface CustomizationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationGuideModal: React.FC<CustomizationGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const customizationItems = [
    {
      title: '1. Company Name & Tagline',
      icon: Building2,
      file: 'src/config/brand.ts',
      description: 'Change the company name and core positioning statement in one central place. All headers, footers, titles, and body references update automatically.',
      codeSnippet: `// In src/config/brand.ts:
export const BRAND_CONFIG = {
  companyName: "Your Brand Name", // e.g. "Vektor Logistics"
  tagline: "AI-powered operations for modern delivery and logistics.",
  // ...
};`,
    },
    {
      title: '2. Email Address & Support Contacts',
      icon: Mail,
      file: 'src/config/brand.ts',
      description: 'Update the primary contact, support, and mailto targets across navigation, forms, and the footer.',
      codeSnippet: `// In src/config/brand.ts:
export const BRAND_CONFIG = {
  supportEmail: "hello@yourdomain.com",
  contactEmail: "founders@yourdomain.com",
  // ...
};`,
    },
    {
      title: '3. Website Domain',
      icon: Globe,
      file: 'src/config/brand.ts and index.html',
      description: 'Specify your domain for email links, OpenGraph metadata, and social previews.',
      codeSnippet: `// In src/config/brand.ts:
domain: "yourdomain.com",

// Also sync with index.html for OG tags:
// <meta property="og:url" content="https://yourdomain.com" />`,
    },
    {
      title: '4. Logo Mark & Wordmark',
      icon: Image,
      file: 'src/components/Navbar.tsx & src/components/Footer.tsx',
      description: 'The logo currently uses an SVG geometry icon with your brand text. To replace it with an image or custom SVG mark, update the logo container.',
      codeSnippet: `// In src/components/Navbar.tsx (lines 20-30):
// Replace the SVG with your <img> or custom SVG:
<img src="/logo.svg" alt={BRAND_CONFIG.companyName} className="h-8 w-auto" />`,
    },
    {
      title: '5. HTML Page Title & Open Graph SEO',
      icon: FileText,
      file: 'index.html',
      description: 'Update the browser tab title and search engine summary meta tags.',
      codeSnippet: `<!-- In index.html: -->
<title>Your Brand Name — AI-Powered Logistics & Delivery Operations</title>
<meta name="description" content="AI-powered agents for delivery and logistics operations..." />`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-slate-700 bg-[#0B101D] p-6 sm:p-8 shadow-2xl text-left max-h-[90vh] overflow-y-auto"
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

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
              Developer &amp; Founder Guide
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">Brand Customization Instructions</h3>
          <p className="text-xs text-slate-300 mt-1">
            Follow this reference to rebrand the landing page with your own startup name, domain, email, and assets.
          </p>
        </div>

        {/* Customization List */}
        <div className="space-y-5">
          {customizationItems.map((item, idx) => {
            const Icon = item.icon;
            const isCopied = copiedKey === item.file;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {item.file}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="relative rounded-lg bg-slate-950 border border-slate-800 p-3 font-mono text-[11px] text-slate-300 overflow-x-auto">
                  <pre>{item.codeSnippet}</pre>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.codeSnippet, item.file)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Current configuration file located at: <code className="text-blue-400">/src/config/brand.ts</code>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
