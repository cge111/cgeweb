export interface EnergyLead {
  id: string;
  businessName?: string;
  contactName: string;
  phone: string;
  email: string;
  postcode?: string;
  fuelType: 'electricity' | 'gas' | 'both';
  contractType?: 'renewal' | 'new' | 'multisite';
  numSites?: number;
  currentAnnualSpend?: number;
  currentSupplier?: string;
  contractExpiryDate?: string;
  additionalDetails?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'negotiating' | 'completed';
}

export interface Supplier {
  id: string;
  name: string;
  logoType: 'eon' | 'british-gas' | 'scottish-power' | 'edf' | 'yu-energy' | 'octopus' | 'sse' | 'opus' | 'corona' | 'pozitive' | 'utilita';
  rating: number;
  marketShare: string;
  bestFor: string;
  greenEnergy: boolean;
  fixedRatesAvailable: boolean;
}

export interface CaseStudy {
  title: string;
  industry: string;
  sites: number;
  previousSpend: number;
  newSpend: number;
  savingsPercent: number;
  savingsAnnual: number;
  quoteText: string;
  author: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'rates' | 'process' | 'multisite' | 'contracts';
}

export interface SiteConfig {
  id: string;
  name: string;
  postcode: string;
  fuelType: 'electricity' | 'gas' | 'both';
  annualSpend: number;
}
