import { Supplier, CaseStudy, FAQItem } from './types';

export const SUPPLIERS: Supplier[] = [
  {
    id: 'eon',
    name: 'E.ON Next',
    logoType: 'eon',
    rating: 4.5,
    marketShare: 'Large Supplier',
    bestFor: 'SME Businesses & Green Energy',
    greenEnergy: true,
    fixedRatesAvailable: true,
  },
  {
    id: 'british-gas',
    name: 'British Gas',
    logoType: 'british-gas',
    rating: 4.3,
    marketShare: 'Market Leader',
    bestFor: 'High Reliability & Commercial Accounts',
    greenEnergy: true,
    fixedRatesAvailable: true,
  },
  {
    id: 'scottish-power',
    name: 'ScottishPower',
    logoType: 'scottish-power',
    rating: 4.2,
    marketShare: 'Major Supplier',
    bestFor: 'Renewable Power Options',
    greenEnergy: true,
    fixedRatesAvailable: true,
  },
  {
    id: 'edf',
    name: 'EDF Energy',
    logoType: 'edf',
    rating: 4.4,
    marketShare: 'Major Supplier',
    bestFor: 'Low Carbon Nuclear & Large Power Users',
    greenEnergy: true,
    fixedRatesAvailable: true,
  },
  {
    id: 'yu-energy',
    name: 'Yü Energy',
    logoType: 'yu-energy',
    rating: 4.5,
    marketShare: 'Specialist Business Supplier',
    bestFor: 'Multi-site Businesses & Flexible Billing',
    greenEnergy: true,
    fixedRatesAvailable: true,
  },
  {
    id: 'octopus',
    name: 'Octopus Energy',
    logoType: 'octopus',
    rating: 4.8,
    marketShare: 'Fast Growing',
    bestFor: 'Award-Winning Service & Green Tariffs',
    greenEnergy: true,
    fixedRatesAvailable: true,
  },
  {
    id: 'pozitive',
    name: 'Pozitive Energy',
    logoType: 'pozitive',
    rating: 4.3,
    marketShare: 'Tech-Driven Supplier',
    bestFor: 'Automated Smart Metering & Low Overheads',
    greenEnergy: true,
    fixedRatesAvailable: true,
  },
  {
    id: 'utilita',
    name: 'Utilita Energy',
    logoType: 'utilita',
    rating: 4.1,
    marketShare: 'Smart Pay-As-You-Go',
    bestFor: 'Flexible No-Contract / Prepay Options',
    greenEnergy: false,
    fixedRatesAvailable: true,
  },
  {
    id: 'corona',
    name: 'Corona Energy',
    logoType: 'corona',
    rating: 4.2,
    marketShare: 'Commercial Specialist',
    bestFor: 'Enterprise Gas & Large Sites',
    greenEnergy: true,
    fixedRatesAvailable: true,
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Multi-Site Retail Chain Consolidation',
    industry: 'Retail & Fashion',
    sites: 12,
    previousSpend: 42500,
    newSpend: 26800,
    savingsPercent: 37,
    savingsAnnual: 15700,
    quoteText: 'CGE Business Energy took over our chaotic multi-site accounts. They consolidated all 12 of our retail branches into a single contract with EDF Energy, locking in cheaper wholesale rates. We saved £15,700 a year and hours of manual bill auditing.',
    author: 'Operations Director, South-East Retail Group',
  },
  {
    title: 'Manufacturing Plant Renewal Lock-In',
    industry: 'Light Manufacturing',
    sites: 1,
    previousSpend: 84000,
    newSpend: 54600,
    savingsPercent: 35,
    savingsAnnual: 29400,
    quoteText: 'Our previous energy broker let our contract roll over into expensive out-of-contract rates. CGE stepped in immediately, compared 20+ suppliers on their matrix, and negotiated a direct fixed rate. We slashed our costs by 35% on the exact same connection.',
    author: 'Finance Director, Ilford Mouldings Ltd',
  },
  {
    title: 'SME Restaurant New Meter Installation',
    industry: 'Hospitality & Food Service',
    sites: 1,
    previousSpend: 12400,
    newSpend: 7600,
    savingsPercent: 39,
    savingsAnnual: 4800,
    quoteText: 'We needed a new gas line and meter installed for our new kitchen extension. CGE sorted the Change of Tenancy, set up the opening readings, and handled the complete meter installation seamlessly. Best service in the UK energy sector.',
    author: 'Owner, The Spice Kitchen, Essex',
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How does CGE Business Energy save us money?',
    answer: 'As an independent business energy broker, we maintain close partnerships with all major UK energy suppliers. We have access to their wholesale price matrices, allowing us to compare and negotiate bespoke tariffs that are not available directly on the public market. We find the cheapest supplier and negotiate directly to beat your current supplier renewal quotes.',
    category: 'rates',
  },
  {
    question: 'Are there any fees or hidden costs for your service?',
    answer: 'No, our consultation and procurement service is entirely free of charge to you. We are sent a commission directly by the energy supplier when we set up and facilitate your commercial contract. The price we quote you is exactly what you pay on your energy bill, with no added brokerage fees or surcharges.',
    category: 'process',
  },
  {
    question: 'What is your current special offer for Business Gas?',
    answer: 'We are currently running an exclusive promotional rate of just 4.65p per kWh for Business Gas contracts. This is one of the most competitive gas rates available in the UK business energy market today, with fixed-rate lock-in available for 1 to 5 years.',
    category: 'rates',
  },
  {
    question: 'How do multi-site energy contracts work?',
    answer: 'If your business operates across multiple locations, managing individual bills from different suppliers is extremely inefficient. CGE specializes in Multi-Site Contracts. We consolidate all your sites into a single, unified contract with one supplier. This unlocks corporate volume discounts and provides you with a single monthly bill and a dedicated account manager.',
    category: 'multisite',
  },
  {
    question: 'Can you help us if we are already in an energy contract?',
    answer: 'Yes! We can negotiate and lock in your next contract rate up to 12 months before your current contract expires. This protects your business from sudden wholesale energy price hikes. Once your current contract expires, you will seamlessly roll over to the pre-negotiated cheaper tariff without any service interruption.',
    category: 'contracts',
  },
  {
    question: 'What is required for a new connection or meter installation?',
    answer: 'If you are moving into new commercial premises, we can handle the entire setup. This includes sorting out the Change of Tenancy (CoT), arranging opening meter readings to avoid back-billing, coordinating the physical installation of new gas or electricity meters with suppliers, and matching you with an affordable contract from day one.',
    category: 'contracts',
  },
];

export const OBJECTIONS = [
  {
    id: 1,
    objection: "We are happy with our current rates.",
    response: "That is fantastic! However, the energy market is highly volatile, and wholesale rates fluctuate daily. It costs absolutely nothing to let us do a quick comparison using your latest bill. In 90% of cases, we find options that are up to 40% cheaper than what business owners are currently paying, even with suppliers they trust.",
  },
  {
    id: 2,
    objection: "We already work with an energy broker.",
    response: "It is always good to have professional support! However, not all brokers have the same supplier relationships or commission structures. As a leading UK broker active since 2015, we partner with major suppliers (EDF, British Gas, E.ON Next, Yü, etc.) and have access to direct wholesale price matrices that other brokers might not. Let us run a dual-broker comparison—no obligation, just transparent numbers.",
  },
  {
    id: 3,
    objection: "We are still locked in our current contract.",
    response: "No problem at all! You do not have to wait until your contract ends to find a better deal. We can secure and lock in cheaper future rates up to 12 months in advance of your renewal date. This protects your business against future energy inflation. When your current contract ends, the transition to your new supplier is automatic, with no fees or power cuts.",
  },
  {
    id: 4,
    objection: "We had a bad experience with energy brokers before.",
    response: "We completely understand your hesitation. The energy market has seen some aggressive brokers in the past. Commercial Gas & Electricity Ltd is registered in the UK (Company No. 08760434) and has operated since 2015 with complete transparency. We provide a dedicated, personal account manager, we never do unsolicited rollover contracts, and our rates are laid out in clear, simple terms before you sign anything.",
  },
];

export const CONTACT_INFO = {
  companyName: "Commercial Gas & Electricity Ltd",
  tradingName: "CGE Business Energy Services",
  registrationNo: "08760434",
  incorporationYear: "2015",
  experienceYears: "20", // leadership team brings nearly 20 years
  address: "46 Ramsgill Drive, Ilford, Essex, IG2 7TP",
  phone: "+44 7951 234054",
  landline: "020 8220 6063",
  mobiles: ["07951 234054", "07490 156620"],
  email: "hello@cgeenergy.co.uk",
  secondaryEmail: "hello@cgeenergy.co.uk",
  web: "www.commercialge.co.uk",
  director: "Shohrub Hossen",
  whatsapp: "https://wa.me/447951234054",
  hours: "Mon - Fri, 9:00 AM - 5:30 PM",
};
