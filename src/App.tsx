import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Zap, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Layers, 
  ChevronDown, 
  HelpCircle, 
  CheckCircle, 
  ChevronRight,
  Sparkles,
  Lock,
  Menu,
  X,
  FileSpreadsheet
} from 'lucide-react';

import CGELogo from './components/CGELogo';
import QuoteForm from './components/QuoteForm';
import gasFlameImg from './gas_flame.jpg';
import LeadPortal from './components/LeadPortal';

import { CONTACT_INFO, FAQS, OBJECTIONS, SUPPLIERS, CASE_STUDIES } from './data';
import { EnergyLead } from './types';

export default function App() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState<boolean>(false);
  const [isLeadPortalOpen, setIsLeadPortalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Estimator States
  const [estFuel, setEstFuel] = useState<'electricity' | 'gas' | 'both'>('both');
  const [estSpend, setEstSpend] = useState<number>(500);

  // Custom default data to pass to the simplified quote form
  const [quoteFormDefaults, setQuoteFormDefaults] = useState<{
    fuelType: 'electricity' | 'gas' | 'both';
  } | undefined>(undefined);

  // FAQ Expanded States
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Supplier filter state
  const [supplierFilter, setSupplierFilter] = useState<'all' | 'green' | 'fixed'>('all');

  // Open quote form with customized starting parameters
  const handleOpenQuoteFormWithDefaults = (defaults: {
    fuelType: 'electricity' | 'gas' | 'both';
  }) => {
    setQuoteFormDefaults(defaults);
    setIsQuoteFormOpen(true);
  };

  const handleOpenGeneralQuote = () => {
    setQuoteFormDefaults({
      fuelType: 'both'
    });
    setIsQuoteFormOpen(true);
  };

  const filteredSuppliers = SUPPLIERS.filter(sup => {
    if (supplierFilter === 'green') return sup.greenEnergy;
    if (supplierFilter === 'fixed') return sup.fixedRatesAvailable;
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased scroll-smooth selection:bg-brand-dark-blue selection:text-white">
      
      {/* 1. TOP ANNOUNCEMENT BAR (GAS SPECIAL OFFER) */}
      <div className="bg-brand-dark-blue text-white text-xs md:text-sm py-3 px-4 font-bold text-center relative z-40 border-b border-brand-dark-blue/30 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-none uppercase tracking-[0.15em] text-[10px]">
          <Sparkles className="w-3.5 h-3.5 text-brand-coral animate-pulse" />
          Special Offer
        </span>
        <span className="uppercase tracking-wider">Business Gas price only <strong className="text-brand-coral font-mono text-sm">4.65p / kWh</strong>! Fix your rate for 1 to 5 years today!</span>
        <button
          onClick={() => handleOpenQuoteFormWithDefaults({
            fuelType: 'gas',
            contractType: 'renewal',
            numSites: 1,
            currentSpend: 8000,
            additionalDetails: 'Requested under the special 4.65p/kWh Gas promotional rates offer.'
          })}
          className="underline text-brand-coral hover:text-white transition-colors cursor-pointer text-xs font-black uppercase tracking-wider pl-1"
        >
          Secure Rate Now
        </button>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <CGELogo height={42} />

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-600">
            <a href="#interactive-suite" className="hover:text-brand-red transition-colors">Savings Estimator</a>
            <a href="#services" className="hover:text-brand-red transition-colors">Broker Services</a>
            <a href="#partners" className="hover:text-brand-red transition-colors">Energy Partners</a>
            <a href="#objections" className="hover:text-brand-red transition-colors">FAQ</a>
            <a href="#about" className="hover:text-brand-red transition-colors">Our Authority</a>
          </nav>

          {/* Contact & CTA Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-red flex-shrink-0" />
              <div className="text-left leading-none">
                <span className="text-[8px] md:text-[9px] text-gray-400 font-black block uppercase tracking-widest mb-1 leading-none">Direct Broker Desk</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-xs md:text-sm font-black text-brand-dark-blue hover:text-brand-light-blue transition-colors uppercase tracking-wider leading-none">
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
            
            <button
              onClick={handleOpenGeneralQuote}
              className="bg-brand-red hover:bg-brand-orange text-white font-black text-xs uppercase tracking-[0.15em] px-6 py-3.5 rounded-none cursor-pointer transition-all border border-brand-orange/20"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-none transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 p-6 space-y-4 shadow-md z-20">
              <div className="space-y-1">
                <a 
                  href="#interactive-suite" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-none hover:bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Savings Estimator
                </a>
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-none hover:bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Broker Services
                </a>
                <a 
                  href="#partners" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-none hover:bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Energy Partners
                </a>
                <a 
                  href="#objections" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-none hover:bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  FAQ & Objections
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-none hover:bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  About CGE
                </a>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a 
                  href={`tel:${CONTACT_INFO.phone}`} 
                  className="flex items-center justify-center gap-2 text-xs font-black text-brand-dark-blue p-3 bg-brand-dark-blue/5 rounded-none uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 text-brand-red" />
                  {CONTACT_INFO.phone}
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenGeneralQuote();
                  }}
                  className="bg-brand-red hover:bg-brand-orange text-white font-bold text-xs p-4 rounded-none w-full text-center uppercase tracking-widest"
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SHOWCASE SECTION */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 md:pt-20 pb-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO LEFT COPY (7 cols) */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-dark-blue text-white px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-[0.2em]">
                <Award className="w-4 h-4 text-brand-coral" />
                20+ Years UK Energy Industry Authority
              </div>
              
              <div className="space-y-4 text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] uppercase">
                  Save Time, Save Money
                </h1>
                <p className="text-base font-extrabold text-brand-dark-blue uppercase tracking-wider mb-2">
                  We:
                </p>
                <ul className="space-y-3 pl-1">
                  {[
                    "Compare Energy Prices & Find the Best Deals",
                    "Arrange New Energy Contracts",
                    "Renew Energy Contracts",
                    "Manage Multi-Site Energy Accounts"
                  ].map((bullet, bidx) => (
                    <li key={bidx} className="flex items-start gap-2.5 text-sm sm:text-base font-bold text-gray-800">
                      <CheckCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="inline-block bg-brand-dark-blue/5 border-l-4 border-brand-red px-5 py-3.5 mt-4 text-sm font-black text-brand-dark-blue uppercase tracking-wider">
                  Fix Your Energy Prices for 1–5 Years
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
                <a
                  href="#interactive-suite"
                  className="bg-brand-red hover:bg-brand-orange text-white font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-brand-orange/20"
                >
                  Estimate Your Savings
                  <ArrowRight className="w-4 h-4" />
                </a>
                
                <button
                  onClick={handleOpenGeneralQuote}
                  className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer animate-none"
                >
                  Get A Free Quote
                  <Layers className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Credibility highlights */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left border-l-2 border-brand-red pl-3">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-gray-900">Up to 40%</span>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block mt-1 tracking-wider">Average Bill Savings</span>
                </div>
                <div className="text-center lg:text-left border-l-2 border-brand-red pl-3">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-gray-900">20+</span>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block mt-1 tracking-wider">Energy Suppliers</span>
                </div>
                <div className="text-center lg:text-left border-l-2 border-brand-red pl-3">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-gray-900">Since 2015</span>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block mt-1 tracking-wider">Active UK Operations</span>
                </div>
              </div>
            </div>

            {/* HERO RIGHT: Premium Visual Image Card */}
            <div className="lg:col-span-5 relative overflow-hidden group border border-gray-200 p-2 bg-white shadow-sm flex flex-col justify-between">
              <div className="aspect-[4/3] sm:aspect-square relative overflow-hidden bg-slate-900">
                <img 
                  src={gasFlameImg} 
                  alt="Blue Gas Flame Burner" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue/40 via-transparent to-transparent"></div>
              </div>
              <div className="p-5 text-center bg-slate-50 border-t border-gray-100 mt-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Immediate support callback lines</span>
                <span className="text-base font-extrabold text-brand-dark-blue mt-1 block tracking-wider">{CONTACT_INFO.phone}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 3-SECOND SAVINGS ESTIMATOR SECTION */}
      <section className="py-20 bg-slate-950 text-white relative border-b border-slate-900" id="interactive-suite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3">
              3-Second Savings Estimator
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm uppercase font-semibold tracking-wider">
              Select your service type and monthly spend to instantly view your estimated yearly CGE contract savings.
            </p>
          </div>

          {/* Estimator Container */}
          <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 space-y-8">
            
            {/* Toggle utility type */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3.5 text-center">Select Energy Service</label>
              <div className="flex justify-center gap-2">
                {[
                  { id: 'electricity', label: 'Electricity', icon: Zap },
                  { id: 'gas', label: 'Gas', icon: Flame },
                  { id: 'both', label: 'Gas + Electricity', icon: Building2 }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEstFuel(item.id as any)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer border ${
                      estFuel === item.id 
                        ? 'bg-brand-red border-brand-red text-white' 
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider for monthly spend */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Est. Monthly Spend</label>
                <span className="font-mono text-xl font-black text-white">&pound;{estSpend.toLocaleString()} <span className="text-[10px] text-slate-500 font-sans font-bold">/ MONTH</span></span>
              </div>
              
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={estSpend}
                onChange={(e) => setEstSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-red"
              />
              
              <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase">
                <span>&pound;100</span>
                <span>&pound;5,000</span>
                <span>&pound;10,000+</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="bg-slate-950 p-4 border border-slate-800/60 text-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">Projected Annual Cost</span>
                <span className="text-xl font-mono font-black text-slate-300 mt-1 block">&pound;{(estSpend * 12).toLocaleString()}</span>
              </div>
              <div className="bg-slate-950 p-4 border border-slate-800/60 text-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">CGE Rate Estimate</span>
                <span className="text-xl font-mono font-black text-slate-300 mt-1 block">&pound;{Math.round(estSpend * 12 * 0.65).toLocaleString()}</span>
              </div>
              <div className="bg-brand-red/5 p-4 border border-brand-red/15 text-center relative overflow-hidden group">
                <span className="text-[9px] text-brand-coral font-bold uppercase tracking-widest block">Estimated Cash Savings</span>
                <span className="text-2xl font-mono font-black text-brand-red mt-0.5 block animate-pulse">&pound;{Math.round(estSpend * 12 * 0.35).toLocaleString()}</span>
              </div>
            </div>

            {/* Estimate CTA Button */}
            <div className="text-center pt-2">
              <button
                onClick={() => handleOpenQuoteFormWithDefaults({ fuelType: estFuel })}
                className="bg-brand-red hover:bg-brand-orange text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-none cursor-pointer transition-colors border border-brand-orange/20 inline-flex items-center gap-2"
              >
                Secure Your Savings Deal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CORE BROKER SERVICES SECTION */}
      <section className="py-20 bg-white border-b border-gray-100" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2">Our Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              Bespoke Commercial Energy Procurement
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mt-2">
              We guide you through the complex UK business energy market to simplify processes and save cash.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service A: Renewals */}
            <div className="bg-slate-50 rounded-none p-8 border border-gray-200 flex flex-col justify-between hover:border-brand-red transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white border border-slate-200 text-brand-dark-blue rounded-none flex items-center justify-center">
                  <Flame className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Supplier Contract Renewals</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed font-semibold">
                  Avoid expensive default variable or out-of-contract rates! We negotiate and compare energy rates across suppliers to secure cheaper quotes than your previous provider, locking in low costs for 1 to 5 years.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => handleOpenQuoteFormWithDefaults({
                    fuelType: 'both',
                    contractType: 'renewal',
                    numSites: 1,
                    currentSpend: 10000
                  })}
                  className="text-brand-dark-blue hover:text-brand-red font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 group cursor-pointer transition-colors"
                >
                  Renew Current Contract
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Service B: New meters */}
            <div className="bg-slate-50 rounded-none p-8 border border-gray-200 flex flex-col justify-between hover:border-brand-red transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white border border-slate-200 text-brand-dark-blue rounded-none flex items-center justify-center">
                  <Zap className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">New Connections & Meters</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed font-semibold">
                  Moving into new commercial premises? We facilitate complete gas and electricity lines and physical meter installations. We resolve Change of Tenancy documentation, secure opening readings, and handle supplier setups.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => handleOpenQuoteFormWithDefaults({
                    fuelType: 'both',
                    contractType: 'new',
                    numSites: 1,
                    currentSpend: 5000,
                    additionalDetails: 'Require assistance with new meter connection or Change of Tenancy (CoT) opening readings.'
                  })}
                  className="text-brand-dark-blue hover:text-brand-red font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 group cursor-pointer transition-colors"
                >
                  Request Meter Setup
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Service C: Multisite */}
            <div className="bg-slate-50 rounded-none p-8 border border-gray-200 flex flex-col justify-between hover:border-brand-red transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white border border-slate-200 text-brand-dark-blue rounded-none flex items-center justify-center">
                  <Layers className="w-6 h-6 text-brand-light-blue" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Consolidated Multi-Site Portfolios</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed font-semibold">
                  Stop wasting hours managing individual accounts for multiple outlets. We bundle all your branch meters into a single commercial agreement, unlocking wholesale volume discounts and giving you a dedicated UK account manager.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => handleOpenQuoteFormWithDefaults({
                    fuelType: 'both',
                    contractType: 'multisite',
                    numSites: 3,
                    currentSpend: 30000
                  })}
                  className="text-brand-dark-blue hover:text-brand-red font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 group cursor-pointer transition-colors"
                >
                  Plan Multi-Site Portfolio
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. REAL-TIME PARTNER ENERGY SUPPLIERS */}
      <section className="py-20 bg-slate-50 border-b border-gray-100" id="partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-1">Our Supplier Grid</span>
              <h2 className="text-3xl font-black text-gray-950 uppercase tracking-tight">
                Our Official Utility Partnerships
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5 uppercase font-semibold tracking-wider">
                We maintain direct lines with major UK providers to negotiate wholesale matrices on behalf of SMEs.
              </p>
            </div>

            {/* Interactive Filters */}
            <div className="flex p-1 bg-white rounded-none border border-gray-200 gap-1 text-xs">
              {[
                { id: 'all', label: 'All 20+ Suppliers' },
                { id: 'green', label: 'Green Carbon-Free' },
                { id: 'fixed', label: 'Fixed Rates (1-5 Yr)' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSupplierFilter(filter.id as any)}
                  className={`px-4 py-2 rounded-none font-bold text-[10px] uppercase tracking-wider cursor-pointer transition-colors ${
                    supplierFilter === filter.id 
                      ? 'bg-brand-dark-blue text-white' 
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Suppliers Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <div 
                key={supplier.id} 
                className="bg-white p-6 rounded-none border border-gray-200 hover:border-brand-red transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-none flex items-center justify-center font-bold text-white text-xs ${
                        supplier.id === 'eon' ? 'bg-orange-600' :
                        supplier.id === 'british-gas' ? 'bg-blue-600' :
                        supplier.id === 'scottish-power' ? 'bg-emerald-600' :
                        supplier.id === 'edf' ? 'bg-amber-500' :
                        supplier.id === 'yu-energy' ? 'bg-red-500' :
                        supplier.id === 'octopus' ? 'bg-purple-600' :
                        supplier.id === 'pozitive' ? 'bg-pink-600' :
                        supplier.id === 'utilita' ? 'bg-cyan-600' : 'bg-slate-700'
                      }`}>
                        {supplier.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">{supplier.name}</span>
                    </div>

                    <div className="flex gap-1">
                      {supplier.greenEnergy && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-black px-1.5 py-0.5 rounded-none uppercase tracking-wider">
                          Green
                        </span>
                      )}
                      {supplier.fixedRatesAvailable && (
                        <span className="bg-brand-dark-blue/5 text-brand-dark-blue border border-brand-dark-blue/15 text-[8px] font-black px-1.5 py-0.5 rounded-none uppercase tracking-wider">
                          Fixed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 mt-4 text-[10px] uppercase tracking-wider font-semibold">
                    <p className="text-gray-400">Supplier Tier: <strong className="text-gray-700 font-bold">{supplier.marketShare}</strong></p>
                    <p className="text-gray-400">Recommended For: <strong className="text-gray-700 font-bold">{supplier.bestFor}</strong></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 flex justify-between items-center text-[10px] uppercase tracking-wider">
                  <span className="text-slate-400 font-semibold">Rating: <strong className="text-amber-500">★ {supplier.rating}</strong></span>
                  
                  <button
                    onClick={() => handleOpenQuoteFormWithDefaults({
                      fuelType: 'both',
                      contractType: 'renewal',
                      numSites: 1,
                      currentSpend: 12000,
                      currentSupplier: supplier.name,
                      additionalDetails: `Specifically looking to procure and lock in a new contract under ${supplier.name} with competitive CGE negotiated broker rates.`
                    })}
                    className="text-brand-dark-blue hover:text-brand-red font-black hover:underline cursor-pointer flex items-center gap-0.5 transition-colors"
                  >
                    Select Supplier
                    <ChevronRight className="w-3.5 h-3.5 text-brand-red" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. AUTHENTIC CASE STUDIES */}
      <section className="py-20 bg-white border-b border-gray-100" id="case-studies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2">Our Proof</span>
            <h2 className="text-3xl font-black text-gray-950 uppercase tracking-tight">
              Tangible Financial Outcomes
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm uppercase font-semibold tracking-wider mt-0.5">
              Read how actual UK commercial clients achieved cheaper energy renewals and consolidated multi-site utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-gray-200 rounded-none p-6 md:p-8 flex flex-col justify-between hover:border-brand-red transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    <span className="bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-none">{cs.industry}</span>
                    <span>{cs.sites} Site(s)</span>
                  </div>
                  
                  <h4 className="text-sm font-black uppercase tracking-wider text-gray-900 leading-snug">{cs.title}</h4>
                  
                  <p className="text-[11px] text-gray-500 italic leading-relaxed bg-white p-4 rounded-none border border-gray-100 font-sans font-medium">
                    "{cs.quoteText}"
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between items-center text-[10px] uppercase tracking-wider">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-widest">Client Contact</span>
                    <strong className="text-slate-800 font-bold">{cs.author}</strong>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-brand-red font-mono font-black text-base block">-{cs.savingsPercent}%</span>
                    <span className="text-[9px] text-gray-400 block font-bold">Saved £{cs.savingsAnnual.toLocaleString()}/yr</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. EXPERT PROFILE & COMPLIANCE AUTHORITY */}
      <section className="py-20 bg-slate-950 text-white relative border-b border-slate-900" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-light-blue text-xs font-bold uppercase tracking-widest block">Our Corporate Identity</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Commercial Gas & Electricity Ltd
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                Our leadership team brings nearly <strong className="text-white">20 years of experience in the UK energy industry</strong>. The company director worked directly within <strong className="text-white">EDF Energy from 2006 to 2015</strong>, gaining deep internal expertise in business energy markets, complex supplier pricing matrices, customer solutions, and wholesale contracts.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                Following this industry-leading experience, he established <strong className="text-white">Commercial Gas & Electricity Ltd</strong> in the UK (<strong className="text-white">Company Registration No. 08760434</strong>), which began active trading operations in <strong className="text-white">2015</strong> under the brand name <strong className="text-white">CGE Business Energy Services</strong>.
              </p>

              <div className="bg-slate-900 p-5 rounded-none border border-slate-800 space-y-2.5 text-xs uppercase tracking-wider font-semibold">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-500 font-bold">Director Name</span>
                  <span className="text-white font-bold">{CONTACT_INFO.director}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-500 font-bold">Registered UK Company No.</span>
                  <span className="text-brand-coral font-mono font-bold">{CONTACT_INFO.registrationNo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold">Trading Name</span>
                  <span className="text-white font-bold">{CONTACT_INFO.tradingName}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Certificate Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-8 rounded-none space-y-6">
              <h4 className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2 border-b border-slate-800 pb-4">
                <ShieldCheck className="w-5 h-5 text-brand-light-blue" />
                Verified Registration Details
              </h4>
              
              <div className="space-y-4 text-xs text-slate-400 uppercase font-semibold tracking-wider">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-none mt-1.5 flex-shrink-0"></div>
                  <p>Registered Office: 46 Ramsgill Drive, Ilford, Essex, IG2 7TP</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-none mt-1.5 flex-shrink-0"></div>
                  <p>Incorporated on Companies House UK since 2015.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-none mt-1.5 flex-shrink-0"></div>
                  <p>Registered with Information Commissioner's Office (ICO) for complete GDPR protection.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-none mt-1.5 flex-shrink-0"></div>
                  <p>Independent brokerage partnering directly with 20+ licensed UK commercial suppliers.</p>
                </div>
              </div>

              <div className="bg-brand-dark-blue/10 border border-brand-dark-blue/20 rounded-none p-5 text-center">
                <span className="text-[10px] text-brand-light-blue font-bold block mb-1 uppercase tracking-widest">Direct Consultation Booking</span>
                <span className="text-lg font-black text-white font-mono">{CONTACT_INFO.landline}</span>
                <span className="text-[9px] text-slate-500 block mt-1 uppercase tracking-wider font-semibold">London Office Number</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. OVERCOMING OBJECTIONS (FAQ COLLAPSIBLE) */}
      <section className="py-20 bg-white border-b border-gray-100" id="objections">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2">Addressing Worries</span>
            <h2 className="text-3xl font-black text-gray-950 uppercase tracking-tight">
              We Address Your Concerns Directly
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm uppercase font-semibold tracking-wider mt-0.5">
              Have hesitations? Here is exactly how we solve common business energy friction points.
            </p>
          </div>

          <div className="space-y-3">
            {OBJECTIONS.map((obj, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={obj.id} 
                  className={`border rounded-none transition-colors overflow-hidden ${
                    isExpanded 
                      ? 'border-brand-dark-blue bg-brand-dark-blue/5' 
                      : 'border-gray-200 bg-slate-50 hover:bg-slate-100/50'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full text-left p-4 md:p-5 flex justify-between items-center gap-4 cursor-pointer font-bold text-gray-800 text-xs uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-brand-dark-blue text-[10px] sm:text-xs font-black">Objection {idx + 1}:</span>
                      "{obj.objection}"
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-brand-red' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="p-4 md:p-5 pt-0 border-t border-gray-100 text-xs text-gray-500 leading-relaxed space-y-2.5">
                          <p className="font-bold text-gray-700 flex items-center gap-1.5 text-[10px] uppercase tracking-widest">
                            <CheckCircle className="w-4 h-4 text-brand-red" />
                            Our Direct Answer
                          </p>
                          <p className="font-sans font-medium">{obj.response}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* FAQS Accordion List */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-950 mb-8 text-center">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="space-y-2 border-l-2 border-brand-red pl-3">
                  <h4 className="text-xs font-bold text-gray-950 uppercase tracking-wider flex items-start gap-1.5">
                    {faq.question}
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-medium">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 10. DETAILED CONTACT BLOCK */}
      <section className="py-20 bg-slate-50 border-b border-gray-100" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Info Column (7 cols) */}
            <div className="lg:col-span-7 p-6 md:p-10 space-y-8">
              <div>
                <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-1">Get in Touch</span>
                <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
                  Contact CGE Energy Brokers Today
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm uppercase font-semibold tracking-wider mt-0.5">
                  Reach out directly to arrange your Obligatory Free Quotation or inquire about new connections.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Office Details</h4>
                  
                  <div className="space-y-3.5 text-xs font-bold uppercase tracking-wider">
                    <div className="flex gap-2.5 items-start text-gray-500">
                      <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-800 block font-black">London Office</strong>
                        <span className="text-[10px] text-gray-400 font-medium normal-case">{CONTACT_INFO.address}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5 items-start text-gray-500">
                      <Clock className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-800 block font-black">Opening Hours</strong>
                        <span className="text-[10px] text-gray-400 font-mono font-medium">{CONTACT_INFO.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Telephones & Emails</h4>
                  
                  <div className="space-y-3.5 text-xs font-bold uppercase tracking-wider">
                    <div className="flex gap-2.5 items-start text-gray-500">
                      <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                      <div>
                        <strong className="text-gray-800 block font-black">Call Us Now</strong>
                        <a href={`tel:${CONTACT_INFO.phone}`} className="hover:underline text-brand-dark-blue font-black">{CONTACT_INFO.phone}</a>
                        <span className="block text-[9px] text-gray-400 font-mono mt-0.5">Office: {CONTACT_INFO.landline}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5 items-start text-gray-500">
                      <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                      <div>
                        <strong className="text-gray-800 block font-black">Email Inquiries</strong>
                        <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline text-brand-dark-blue font-black block text-[11px] normal-case">{CONTACT_INFO.email}</a>
                        <a href={`mailto:${CONTACT_INFO.secondaryEmail}`} className="hover:underline text-brand-dark-blue font-black block mt-0.5 text-[11px] normal-case">{CONTACT_INFO.secondaryEmail}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Booking calendar CTA */}
              <div className="bg-slate-50 p-4 rounded-none border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-800">Direct Consultation Booking</h5>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Schedule a secure, 1-on-1 procurement phone meeting with our staff.</p>
                </div>
                <a
                  href="https://www.commercialge.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-red hover:bg-brand-orange text-white px-5 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest shrink-0 transition-colors"
                >
                  Book Appointment
                </a>
              </div>
            </div>

            {/* Right Map Placeholder Grid (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-black tracking-widest uppercase text-brand-light-blue mb-2">Request A Call Back</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-6 uppercase tracking-wider font-semibold">
                  Don't want to fill the form? Click to chat instantly on WhatsApp or request a fast direct phone call back.
                </p>

                <div className="space-y-3">
                  <a
                    href={CONTACT_INFO.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-none text-xs flex items-center justify-center gap-2 transition-colors shadow-sm uppercase tracking-widest"
                  >
                    <Phone className="w-4 h-4" />
                    Open Chat on WhatsApp
                  </a>

                  <button
                    onClick={handleOpenGeneralQuote}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold py-3.5 px-4 rounded-none text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer uppercase tracking-widest"
                  >
                    <Mail className="w-4 h-4 text-slate-400" />
                    Secure Direct Phone Call Back
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/60 mt-8 text-center text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                Commercial Gas & Electricity Ltd is registered in England & Wales under Company No. 08760434. Registered office: {CONTACT_INFO.address}.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER & COMPLIANCE */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-14 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-slate-900">
            <CGELogo height={38} light={true} />
            
            <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="#interactive-suite" className="hover:text-slate-300">Savings Suite</a>
              <span>•</span>
              <a href="#services" className="hover:text-slate-300">Procurement</a>
              <span>•</span>
              <a href="#partners" className="hover:text-slate-300">Partner Suppliers</a>
              <span>•</span>
              <a href="#objections" className="hover:text-slate-300">Direct FAQ</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-slate-500 leading-relaxed">
            <div className="space-y-3 font-sans font-medium">
              <p>
                <strong>Company Profile:</strong> CGE Business Energy Services is the trading name of Commercial Gas & Electricity Ltd, registered in the United Kingdom under registration number <strong className="text-slate-400 font-mono">08760434</strong> since 2015. 
              </p>
              <p>
                <strong>Regulatory Compliance:</strong> We act as an independent intermediary between major commercial energy suppliers and business energy consumers. All comparison quotes generated are subject to supplier credit checks, meter profile class confirmation, and final pricing approval.
              </p>
            </div>
            
            <div className="space-y-4 font-sans font-medium">
              <p>
                <strong>Privacy & Security:</strong> We comply fully with the UK Data Protection Act (DPA) and GDPR regulations. Any documentation uploaded for auditing via our scanner is transferred over encrypted channels and shredded immediately upon audit compilation.
              </p>

              {/* Private leads panel button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLeadPortalOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-4 py-2.5 rounded-none text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Lock className="w-3 h-3 text-brand-coral" />
                  Broker CRM Leads Panel
                </button>
                <span className="text-[10px] text-slate-600 italic">For demonstration review of incoming quotes</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-900/60 text-[9px] text-slate-600 text-center uppercase tracking-wider font-semibold">
            <p>© 2026 Commercial Gas & Electricity Ltd (Trading as CGE Business Energy). All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* 12. FLOATING ENQUIRY MODAL (QUOTEFORM) */}
      <AnimatePresence>
        {isQuoteFormOpen && (
          <QuoteForm 
            isOpen={isQuoteFormOpen}
            onClose={() => setIsQuoteFormOpen(false)}
            defaultData={quoteFormDefaults}
          />
        )}
      </AnimatePresence>

      {/* 13. ADMINDASHBOARD LEAD MANAGER OVERLAY MODAL */}
      <AnimatePresence>
        {isLeadPortalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-6xl max-h-[92vh] overflow-y-auto">
              <LeadPortal onClose={() => setIsLeadPortalOpen(false)} />
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
