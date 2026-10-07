export interface AgentDetail {
  id: string;
  name: string;
  shortExplanation: string;
  fullDescription: string;
  category: string;
  iconName: 'MessageSquareText' | 'Activity' | 'Coins' | 'Navigation' | 'Search' | 'PackageCheck' | 'TrendingUp';
  primaryCapabilities: string[];
  humanOversightLevel: 'Supervised' | 'Strict Approval' | 'Autonomous with Boundary' | 'Operator Confirmed';
  humanInTheLoopRule: string;
  exampleAction: {
    trigger: string;
    actionPrepared: string;
    humanVerification: string;
  };
}

export const AI_AGENTS: AgentDetail[] = [
  {
    id: 'customer-support',
    name: 'AI Customer Support Agent',
    category: 'Customer Experience',
    iconName: 'MessageSquareText',
    shortExplanation: 'Answers inquiries, provides live parcel tracking, explains pricing, and escalates complex edge cases to human dispatchers.',
    fullDescription: 'Designed to handle the heavy volume of routine end-customer inquiries through natural conversational intelligence connected to your delivery tracking database.',
    primaryCapabilities: [
      'Answers routine customer questions 24/7',
      'Provides real-time order and delivery status information',
      'Explains zone pricing and available delivery tiers',
      'Handles address clarification and delivery instructions',
      'Gracefully escalates ambiguous or dissatisfied cases to human staff'
    ],
    humanOversightLevel: 'Supervised',
    humanInTheLoopRule: 'Operates within predefined policy guidelines; routing exceptions or compensation requests trigger immediate operator notification.',
    exampleAction: {
      trigger: 'Customer asks: "Where is order #9401 and can I change my delivery window?"',
      actionPrepared: 'Retrieves current courier geolocation, calculates remaining stops, and drafts window update option.',
      humanVerification: 'Customer confirms chosen time slot; system records update without manual dispatcher intervention.'
    }
  },
  {
    id: 'operations-agent',
    name: 'AI Operations Agent',
    category: 'Dispatch & Monitoring',
    iconName: 'Activity',
    shortExplanation: 'Monitors ongoing delivery flows, flags delayed or stuck orders, summarizes dispatch volume, and assists operators with prioritization.',
    fullDescription: 'Acts as an operational co-pilot for dispatchers by continuously scanning delivery pipelines to detect bottlenecks before customers notice.',
    primaryCapabilities: [
      'Continuously monitors delivery status across all active zones',
      'Identifies pending, stalled, or problematic consignments',
      'Generates periodic operational activity summaries',
      'Assists human dispatchers during peak volume spikes',
      'Prioritizes critical rescue actions based on SLA urgency'
    ],
    humanOversightLevel: 'Operator Confirmed',
    humanInTheLoopRule: 'Surfaces anomalies and suggested re-allocations to human dispatchers for one-click confirmation.',
    exampleAction: {
      trigger: 'Identifies 8 orders stalled in North District due to unexpected road closure.',
      actionPrepared: 'Calculates re-route distribution across 2 nearby available couriers.',
      humanVerification: 'Dispatcher approves suggested batch re-assignment.'
    }
  },
  {
    id: 'cash-collection',
    name: 'Cash Collection & Reconciliation Agent',
    category: 'Financial Operations',
    iconName: 'Coins',
    shortExplanation: 'Calculates courier settlement balances, generates periodic collection statements, drafts payment messages, and assists financial reconciliation under strict human sign-off.',
    fullDescription: 'Tackles one of the most error-prone aspects of last-mile logistics: tracking cash-on-delivery (COD) handoffs, verifying delivered receipts against collected cash, and generating settlement sheets.',
    primaryCapabilities: [
      'Calculates accurate balances couriers must hand over',
      'Compiles periodic settlement and collection statements',
      'Flags discrepancies between declared COD and physical drop-off',
      'Prepares customized settlement reminders and statements',
      'Maintains complete audit trails of all collection adjustments'
    ],
    humanOversightLevel: 'Strict Approval',
    humanInTheLoopRule: 'Financially sensitive actions strictly require human approval. No cash balance is settled or written off without operator verification.',
    exampleAction: {
      trigger: 'Courier Ahmed finishes 5-day cycle with 42 deliveries and EGP 18,750 collected.',
      actionPrepared: 'Cross-references bank transfer receipts, computes outstanding EGP 4,250, and generates settlement statement.',
      humanVerification: 'Finance manager inspects breakdown and clicks "Approve Settlement".'
    }
  },
  {
    id: 'courier-communication',
    name: 'Courier Communication Agent',
    category: 'Field Operations',
    iconName: 'Navigation',
    shortExplanation: 'Dispatches targeted operational updates, delivery assignments, settlement reminders, and handling instructions to field couriers with automated yet controlled messaging.',
    fullDescription: 'Bridges the gap between central dispatch systems and couriers on motorcycles, vans, and bikes through clear, contextual messaging channels.',
    primaryCapabilities: [
      'Broadcasts personalized delivery assignments and stop sequences',
      'Sends controlled reminders for upcoming daily cash settlements',
      'Delivers precise recipient notes and gate code instructions',
      'Processes courier status replies and acknowledgment receipts',
      'Maintains unified record of courier acknowledgments'
    ],
    humanOversightLevel: 'Supervised',
    humanInTheLoopRule: 'Message templates follow strict verified communication guidelines; ad-hoc broadcast commands require supervisor review.',
    exampleAction: {
      trigger: 'Shift start: 14 express packages assigned to Zone B courier.',
      actionPrepared: 'Drafts concise WhatsApp/SMS briefing with optimized sequence, recipient contacts, and cash collection totals.',
      humanVerification: 'Dispatched automatically within approved operational shift parameters.'
    }
  },
  {
    id: 'delivery-discovery',
    name: 'Delivery Discovery Agent',
    category: 'Routing & Rate Comparison',
    iconName: 'Search',
    shortExplanation: 'Searches and evaluates delivery options for any destination by comparing coverage, transit time, service reliability, and cost.',
    fullDescription: 'Assists operators and merchants in picking the ideal carrier or shipping tier for every package, taking the guesswork out of multi-carrier logistics.',
    primaryCapabilities: [
      'Searches available courier and freight services by destination',
      'Compares rates, SLA guarantees, and zone coverage',
      'Evaluates dimensions, weight brackets, and fragile requirements',
      'Ranks options to suggest the optimal cost-to-speed balance',
      'Assists operators in selecting specialized fulfillment tiers'
    ],
    humanOversightLevel: 'Operator Confirmed',
    humanInTheLoopRule: 'Generates ranked options with transparent cost logic; final carrier booking executed upon operator selection.',
    exampleAction: {
      trigger: 'New order entered for 12kg fragile electronics to Alexandria.',
      actionPrepared: 'Queries 3 available carrier APIs, flags 48h vs 24h rates, and recommends Service B with fragile handling warranty.',
      humanVerification: 'Operator approves suggested rate tier with one click.'
    }
  },
  {
    id: 'order-management',
    name: 'Order Management Agent',
    category: 'Core Workflows',
    iconName: 'PackageCheck',
    shortExplanation: 'Assists operators with creating, validating, updating, and querying orders, cutting manual data entry time in half.',
    fullDescription: 'Streamlines repetitive order processing tasks by ingesting orders from multiple channels, validating address formatting, and keeping metadata synchronized.',
    primaryCapabilities: [
      'Helps create and update order records via natural inputs',
      'Rapidly queries order statuses and itemized manifests',
      'Identifies missing recipient info or formatting anomalies',
      'Tracks multi-leg shipments from pickup to final doorstep',
      'Assists operators with repetitive bulk status modifications'
    ],
    humanOversightLevel: 'Operator Confirmed',
    humanInTheLoopRule: 'Validates against business integrity checks; destructive modifications or cancellations require operator confirmation.',
    exampleAction: {
      trigger: 'Merchant submits CSV with 60 delivery addresses with non-standard formatting.',
      actionPrepared: 'Normalizes addresses, maps zip codes, and stages draft orders with completeness scores.',
      humanVerification: 'Operator reviews summary table and approves order batch creation.'
    }
  },
  {
    id: 'management-intelligence',
    name: 'Management Intelligence',
    category: 'Analytics & Reporting',
    iconName: 'TrendingUp',
    shortExplanation: 'Synthesizes daily delivery summaries, aggregates outstanding cash balances, highlights operational bottlenecks, and surfaces actionable trends.',
    fullDescription: 'Provides leadership and logistics managers with high-fidelity operational transparency without needing to build endless manual spreadsheet reports.',
    primaryCapabilities: [
      'Generates automated end-of-day operational performance digests',
      'Highlights outstanding courier cash collections and trends',
      'Pinpoints high-failure zones or recurring delivery delays',
      'Tracks on-time delivery rates and courier fulfillment ratios',
      'Provides natural language summaries of operational metrics'
    ],
    humanOversightLevel: 'Supervised',
    humanInTheLoopRule: 'Read-only analytics layer; strictly presents verified operational figures with zero speculative data generation.',
    exampleAction: {
      trigger: 'Daily 7:00 PM management executive briefing.',
      actionPrepared: 'Compiles 312 completed orders, EGP 84,200 collected cash, 97.4% on-time rate, and 4 flagged exceptions.',
      humanVerification: 'Sent directly to operations management digest channel.'
    }
  }
];
