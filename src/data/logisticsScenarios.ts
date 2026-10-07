export interface ChatMessage {
  sender: 'customer' | 'agent' | 'system';
  text: string;
  timestamp: string;
  toolCall?: {
    tool: string;
    status: 'completed' | 'pending';
    resultSnippet?: string;
  };
}

export interface ChatScenario {
  id: string;
  title: string;
  description: string;
  messages: ChatMessage[];
}

export const CHAT_SCENARIOS: ChatScenario[] = [
  {
    id: 'status-check',
    title: 'Order Status Query',
    description: 'Real-time parcel inquiry with live dispatcher update',
    messages: [
      {
        sender: 'customer',
        text: 'Where is my order?',
        timestamp: '2:14 PM'
      },
      {
        sender: 'system',
        text: 'System: Querying carrier tracking database for order #9824...',
        timestamp: '2:14 PM',
        toolCall: {
          tool: 'lookupOrderStatus(orderId="ORD-9824")',
          status: 'completed',
          resultSnippet: 'Status: Out for delivery | Courier: Tarek M. | Last checkpoint: 2:15 PM'
        }
      },
      {
        sender: 'agent',
        text: 'Your order is currently out for delivery. The latest update was recorded at 2:15 PM by courier Tarek M. Estimated arrival is within 45 minutes.',
        timestamp: '2:15 PM'
      },
      {
        sender: 'customer',
        text: 'Can I pay cash on delivery?',
        timestamp: '2:16 PM'
      },
      {
        sender: 'agent',
        text: 'Yes, your order has Cash on Delivery enabled for EGP 420. Please have the exact amount ready if possible.',
        timestamp: '2:16 PM'
      }
    ]
  },
  {
    id: 'pricing-options',
    title: 'Zone Rates & Delivery Options',
    description: 'Rate comparison and delivery time options for destination',
    messages: [
      {
        sender: 'customer',
        text: 'How much is delivery to this area?',
        timestamp: '11:02 AM'
      },
      {
        sender: 'system',
        text: 'System: Checking zone rates and active shipping tiers for Zone 4 (New Cairo)...',
        timestamp: '11:02 AM',
        toolCall: {
          tool: 'queryDeliveryRates(zone="New Cairo / Tagamoa")',
          status: 'completed',
          resultSnippet: 'Standard: EGP 45 (24h) | Express Same-Day: EGP 75 (3-4h)'
        }
      },
      {
        sender: 'agent',
        text: 'I can check the available delivery options and compare the estimated price and delivery time for your area.',
        timestamp: '11:02 AM'
      },
      {
        sender: 'agent',
        text: 'Standard Next-Day delivery is EGP 45, while Express Same-Day delivery (within 3–4 hours) is EGP 75. Would you like to proceed with one of these?',
        timestamp: '11:03 AM'
      }
    ]
  },
  {
    id: 'address-change',
    title: 'Address Modification Flow',
    description: 'Pre-dispatch address clarification with human verification trigger',
    messages: [
      {
        sender: 'customer',
        text: 'I need to update my apartment number to Building 14, Apt 3B before the courier leaves.',
        timestamp: '10:41 AM'
      },
      {
        sender: 'system',
        text: 'System: Inspecting order fulfillment state...',
        timestamp: '10:41 AM',
        toolCall: {
          tool: 'verifyOrderModifiability(orderId="ORD-7812")',
          status: 'completed',
          resultSnippet: 'State: Assigned / Not Yet Picked Up — Modifiable'
        }
      },
      {
        sender: 'agent',
        text: 'I have updated the delivery notes to Building 14, Apt 3B. The revised instructions have been synchronized with the courier dispatch manifest.',
        timestamp: '10:42 AM'
      }
    ]
  }
];

export interface DeliveryDiscoveryOption {
  carrierName: string;
  serviceTier: string;
  price: string;
  deliveryTime: string;
  coverageScore: string;
  recommended: boolean;
  reason: string;
  sla: string;
}

export const DELIVERY_DISCOVERY_OPTIONS: Record<string, DeliveryDiscoveryOption[]> = {
  'Greater Cairo (Urban)': [
    {
      carrierName: 'FastMile Express',
      serviceTier: 'Same-Day Motorbike Courier',
      price: 'EGP 55.00',
      deliveryTime: '2 – 3 Hours',
      coverageScore: '99% Dense Urban',
      recommended: true,
      reason: 'Optimal cost-to-speed balance for parcel under 3kg with high recipient availability.',
      sla: 'Guaranteed same-day before 6:00 PM'
    },
    {
      carrierName: 'MetroFleet Logistics',
      serviceTier: 'Next-Day Standard Van',
      price: 'EGP 38.00',
      deliveryTime: 'Next Morning (18h)',
      coverageScore: '100% Citywide',
      recommended: false,
      reason: 'Lower cost, but exceeds today\'s delivery cutoff window.',
      sla: 'Next business day 10:00 AM – 2:00 PM'
    },
    {
      carrierName: 'Apex Dedicated',
      serviceTier: 'Direct Dedicated Courier',
      price: 'EGP 120.00',
      deliveryTime: '60 Minutes',
      coverageScore: 'Point-to-Point Only',
      recommended: false,
      reason: 'High premium cost unnecessary for standard parcel classification.',
      sla: 'VIP direct dispatch'
    }
  ],
  'Alexandria Coastal': [
    {
      carrierName: 'Delta Cargo Line',
      serviceTier: 'Regional Overnight Transit',
      price: 'EGP 70.00',
      deliveryTime: '24 Hours',
      coverageScore: '98% Coastal Metro',
      recommended: true,
      reason: 'Best verified on-time delivery record for inter-governorate parcels this week.',
      sla: 'Arrival next morning by 11:30 AM'
    },
    {
      carrierName: 'Coastal Speed Link',
      serviceTier: 'Express Regional Shuttle',
      price: 'EGP 110.00',
      deliveryTime: 'Same-Day Evening',
      coverageScore: '92% Metro',
      recommended: false,
      reason: 'Higher rate tier suited only for urgent cold-chain or documents.',
      sla: 'Same day arrival before 9:00 PM'
    }
  ]
};

export const CASH_COLLECTION_DATA = {
  courierName: 'Ahmed',
  settlementPeriod: '5 days',
  completedDeliveries: 42,
  amountCollected: 'EGP 18,750',
  outstandingSettlement: 'EGP 4,250',
  depositedAmount: 'EGP 14,500',
  settlementStatus: 'Awaiting Operator Approval',
  discrepancies: 0,
  recentDeliveries: [
    { id: 'DEL-8812', recipient: 'Nour El-Din', amount: 'EGP 620', status: 'Delivered', time: 'Today, 1:40 PM' },
    { id: 'DEL-8809', recipient: 'Karim Mansour', amount: 'EGP 1,150', status: 'Delivered', time: 'Today, 12:15 PM' },
    { id: 'DEL-8804', recipient: 'Mariam Fawzy', amount: 'EGP 450', status: 'Delivered', time: 'Yesterday, 4:30 PM' },
    { id: 'DEL-8798', recipient: 'Tariq Hassan', amount: 'EGP 890', status: 'Delivered', time: 'Yesterday, 2:10 PM' }
  ]
};
