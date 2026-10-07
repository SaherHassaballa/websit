import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { AgentsSection } from './components/AgentsSection';
import { CashCollectionSection } from './components/CashCollectionSection';
import { CustomerSupportSection } from './components/CustomerSupportSection';
import { DeliveryDiscoverySection } from './components/DeliveryDiscoverySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { VisionSection } from './components/VisionSection';
import { EarlyAccessSection } from './components/EarlyAccessSection';
import { Footer } from './components/Footer';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { AgentModal } from './components/AgentModal';
import { CustomizationGuideModal } from './components/CustomizationGuideModal';
import { AgentDetail } from './data/agents';

export default function App() {
  const [earlyAccessModalOpen, setEarlyAccessModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentDetail | null>(null);

  return (
    <div className="min-h-screen bg-[#080C15] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenEarlyAccess={() => setEarlyAccessModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenEarlyAccess={() => setEarlyAccessModalOpen(true)} />

        {/* 2. Trust / Positioning Strip */}
        <TrustStrip />

        {/* 3. Problem Section */}
        <ProblemSection />

        {/* 4. Core AI Agents Section */}
        <AgentsSection onSelectAgent={(agent) => setSelectedAgent(agent)} />

        {/* 5. Cash Collection & Reconciliation Highlight Feature */}
        <CashCollectionSection />

        {/* 6. Customer Support Realistic Chat UI */}
        <CustomerSupportSection />

        {/* 7. Delivery Discovery & Carrier Routing */}
        <DeliveryDiscoverySection />

        {/* 8. How It Works (4-Step Cycle) */}
        <HowItWorksSection />

        {/* 9. Technical Architecture */}
        <ArchitectureSection />

        {/* 10. Startup Vision */}
        <VisionSection />

        {/* 11. Early Access Call to Action */}
        <EarlyAccessSection onOpenContactModal={() => setEarlyAccessModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenGuide={() => setGuideModalOpen(true)} />

      {/* Interactive Modals */}
      <EarlyAccessModal
        isOpen={earlyAccessModalOpen}
        onClose={() => setEarlyAccessModalOpen(false)}
      />

      <AgentModal
        agent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
        onOpenEarlyAccess={() => setEarlyAccessModalOpen(true)}
      />

      <CustomizationGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </div>
  );
}
