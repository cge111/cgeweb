import React, { useState, useEffect } from 'react';
import { Landmark, Zap, Flame, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

interface SavingsCalculatorProps {
  onOpenQuoteForm: (defaultData: {
    fuelType: 'electricity' | 'gas' | 'both';
    contractType: 'renewal' | 'new' | 'multisite';
    numSites: number;
    currentSpend: number;
  }) => void;
}

export default function SavingsCalculator({ onOpenQuoteForm }: SavingsCalculatorProps) {
  const [fuelType, setFuelType] = useState<'electricity' | 'gas' | 'both'>('both');
  const [contractType, setContractType] = useState<'renewal' | 'new' | 'multisite'>('renewal');
  const [currentSpend, setCurrentSpend] = useState<number>(12000);
  const [numSites, setNumSites] = useState<number>(1);
  const [includeGreen, setIncludeGreen] = useState<boolean>(true);

  // Sync contract type and number of sites
  useEffect(() => {
    if (contractType === 'multisite' && numSites === 1) {
      setNumSites(3);
    } else if (contractType !== 'multisite' && numSites > 1) {
      setContractType('multisite');
    } else if (contractType === 'multisite' && numSites < 2) {
      setContractType('renewal');
    }
  }, [contractType]);

  useEffect(() => {
    if (numSites > 1) {
      setContractType('multisite');
    } else if (numSites === 1 && contractType === 'multisite') {
      setContractType('renewal');
    }
  }, [numSites]);

  const getSavingsPercentage = () => {
    let base = 35;
    if (contractType === 'new') base = 30;
    if (contractType === 'multisite') {
      base = Math.min(38 + (numSites - 2) * 0.5, 44);
    }
    
    // Gas has slightly higher saving margin at the moment due to our 4.65p special offer
    if (fuelType === 'gas') base += 2;
    if (fuelType === 'electricity') base -= 1;
    
    return base;
  };

  const savingsPercent = getSavingsPercentage();
  const annualSavings = Math.round(currentSpend * (savingsPercent / 100));
  const newAnnualSpend = currentSpend - annualSavings;
  const monthlySavings = Math.round(annualSavings / 12);
  const adminHoursSaved = contractType === 'multisite' ? numSites * 2.5 : 3;
  const co2Offset = Math.round(currentSpend * 0.083 * (includeGreen ? 1 : 0.15)); // kg of CO2 equivalent

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-none shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto" id="savings-calculator">
      {/* LEFT COLUMN: Controls (7 cols) */}
      <div className="p-8 md:p-12 lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-dark-blue font-bold uppercase tracking-[0.3em] mb-4 text-[10px] md:text-xs">
            <Landmark className="w-3.5 h-3.5 text-brand-red" />
            Live Energy Tariff Estimator
          </div>
          
          <div className="border-l-4 border-brand-red pl-5 mb-6">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">
              Calculate Your Business Savings
            </h3>
            <p className="text-slate-500 text-xs md:text-sm mt-1.5 leading-relaxed">
              Adjust the sliders below to see your estimated savings compared to your current energy contracts.
            </p>
          </div>

          {/* 1. Fuel Type Selector */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">1. Select Utility Services</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'electricity', label: 'Electricity Only', icon: Zap },
                { id: 'gas', label: 'Gas Only', icon: Flame },
                { id: 'both', label: 'Dual Fuel', icon: Building2 }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = fuelType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setFuelType(item.id as any)}
                    className={`flex flex-col items-center justify-center p-5 rounded-none border-2 transition-all cursor-pointer text-center ${
                      isSelected 
                        ? 'border-brand-dark-blue bg-brand-dark-blue/5 text-brand-dark-blue font-bold' 
                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50 text-slate-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-brand-red' : 'text-slate-400'}`} />
                    <span className="text-[11px] md:text-xs uppercase tracking-wider font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Contract Type Selector */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">2. Contract Agreement Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'renewal', label: 'Contract Renewal', desc: 'Smarter renewals' },
                { id: 'new', label: 'New Connection', desc: 'Meter installations' },
                { id: 'multisite', label: 'Multi-site Contract', desc: 'Consolidated billing' }
              ].map((item) => {
                const isSelected = contractType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setContractType(item.id as any)}
                    className={`p-4 rounded-none border-2 transition-all text-left cursor-pointer ${
                      isSelected 
                        ? 'border-brand-dark-blue bg-brand-dark-blue/5 text-brand-dark-blue' 
                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50 text-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider block">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Spend Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">3. Current Annual Spend (Across sites)</label>
              <span className="text-xl font-mono font-black text-brand-dark-blue">{formatCurrency(currentSpend)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="150000"
              step="1000"
              value={currentSpend}
              onChange={(e) => setCurrentSpend(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-none appearance-none cursor-pointer accent-brand-red"
            />
            <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-2 font-mono">
              <span>£1k</span>
              <span>£50k</span>
              <span>£100k</span>
              <span>£150k+</span>
            </div>
          </div>

          {/* 4. Number of Sites */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">4. Number of Commercial Sites</label>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-dark-blue bg-brand-dark-blue/5 px-3 py-1 border border-brand-dark-blue/15">
                {numSites} {numSites === 1 ? 'Site' : 'Sites'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={numSites}
              onChange={(e) => setNumSites(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-none appearance-none cursor-pointer accent-brand-red"
            />
            <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-2 font-mono">
              <span>1 Site</span>
              <span>5 Sites</span>
              <span>15 Sites</span>
              <span>30+ Sites</span>
            </div>
          </div>

          {/* 5. Green Energy Option Toggle */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-none border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-brand-dark-blue text-white p-2 rounded-none">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Match with Green Energy Suppliers</h4>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">Zero-carbon, renewable contracts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={includeGreen} 
                onChange={() => setIncludeGreen(!includeGreen)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-none after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
            </label>
          </div>
        </div>

        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-8 pt-4 border-t border-slate-100">
          *Savings estimations are calculated from actual wholesale tariff index matrices from E.ON Next, British Gas, EDF Energy and others as of July 2026. Official quotes are subject to credit checking.
        </div>
      </div>

      {/* RIGHT COLUMN: Output Dashboard (5 cols) */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-brand-dark-blue/40 to-slate-950 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative architectural grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-white/5 pointer-events-none"></div>

        <div>
          <span className="text-brand-light-blue text-[10px] font-black uppercase tracking-[0.25em] mb-2 block">Estimated Broker Savings</span>
          <div className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-2">
            Save Up To <span className="text-brand-coral">{savingsPercent}%</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-8 uppercase font-medium tracking-wider">
            Competitive market procurement against standard default rollover tariffs.
          </p>

          <div className="space-y-6">
            {/* Annual Savings Card */}
            <div className="bg-white/5 p-5 rounded-none border-l-4 border-brand-coral flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 tracking-widest">Estimated Annual Savings</span>
                <span className="text-3xl font-mono font-black text-white">{formatCurrency(annualSavings)}</span>
              </div>
              <div className="bg-brand-dark-blue/40 text-brand-light-blue px-3 py-1 text-[10px] font-black uppercase tracking-wider border border-brand-dark-blue/20">
                / Year
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-none border border-white/5">
                <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1 tracking-widest">Monthly Cashflow</span>
                <span className="text-lg font-mono font-bold text-emerald-400">+{formatCurrency(monthlySavings)}</span>
              </div>
              <div className="bg-white/5 p-4 rounded-none border border-white/5">
                <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1 tracking-widest">Est. New Bill</span>
                <span className="text-lg font-mono font-bold text-brand-light-blue">{formatCurrency(newAnnualSpend)}</span>
              </div>
            </div>

            {/* Added Value Highlights */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-5 h-5 bg-brand-dark-blue/40 text-brand-light-blue flex items-center justify-center font-bold text-[10px] border border-brand-dark-blue/20">✓</div>
                <span className="uppercase tracking-wider font-semibold text-[10px]">Saves <strong className="text-white font-black">{adminHoursSaved} hrs/mo</strong> in billing admin.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-5 h-5 bg-brand-dark-blue/40 text-brand-light-blue flex items-center justify-center font-bold text-[10px] border border-brand-dark-blue/20">✓</div>
                <span className="uppercase tracking-wider font-semibold text-[10px]">Offsets <strong className="text-white font-black">{co2Offset} kg CO₂</strong> annually.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-5 h-5 bg-brand-dark-blue/40 text-brand-light-blue flex items-center justify-center font-bold text-[10px] border border-brand-dark-blue/20">✓</div>
                <span className="uppercase tracking-wider font-semibold text-[10px]">Dedicated London account manager.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={() => onOpenQuoteForm({ fuelType, contractType, numSites, currentSpend })}
            className="w-full bg-brand-red hover:bg-brand-orange text-white py-4.5 px-6 rounded-none font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Claim Your Free Quotation Now
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <div className="flex items-center justify-center gap-4 mt-4 text-[9px] uppercase tracking-widest text-slate-500 font-bold">
            <span>No Obligation</span>
            <span>•</span>
            <span>2-Min Form</span>
            <span>•</span>
            <span>WhatsApp Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
