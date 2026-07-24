import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building, Plus, Trash2, ArrowRight, Layers, Flame, Zap } from 'lucide-react';
import { SiteConfig } from '../types';

interface MultiSitePlannerProps {
  onOpenQuoteForm: (defaultData: {
    fuelType: 'electricity' | 'gas' | 'both';
    contractType: 'renewal' | 'new' | 'multisite';
    numSites: number;
    currentSpend: number;
    additionalDetails: string;
  }) => void;
}

const DEFAULT_SITES: SiteConfig[] = [
  { id: '1', name: 'HQ & Main Office (London)', postcode: 'EC1A 1BB', fuelType: 'both', annualSpend: 15400 },
  { id: '2', name: 'Distribution Warehouse (Ilford)', postcode: 'IG2 7TP', fuelType: 'electricity', annualSpend: 28000 }
];

export default function MultiSitePlanner({ onOpenQuoteForm }: MultiSitePlannerProps) {
  const [sites, setSites] = useState<SiteConfig[]>(DEFAULT_SITES);
  const [newSiteName, setNewSiteName] = useState<string>('');
  const [newSitePostcode, setNewSitePostcode] = useState<string>('');
  const [newSiteFuel, setNewSiteFuel] = useState<'electricity' | 'gas' | 'both'>('both');
  const [newSiteSpend, setNewSiteSpend] = useState<number>(5000);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteName) return;

    const newSite: SiteConfig = {
      id: Date.now().toString(),
      name: newSiteName,
      postcode: newSitePostcode || 'UK SITE',
      fuelType: newSiteFuel,
      annualSpend: newSiteSpend
    };

    setSites([...sites, newSite]);
    setNewSiteName('');
    setNewSitePostcode('');
    setNewSiteFuel('both');
    setNewSiteSpend(5000);
    setShowAddForm(false);
  };

  const handleRemoveSite = (id: string) => {
    setSites(sites.filter(site => site.id !== id));
  };

  const totalSpend = sites.reduce((sum, s) => sum + s.annualSpend, 0);
  
  const getVolumeDiscount = (count: number) => {
    if (count <= 1) return 35;
    if (count === 2) return 38;
    if (count <= 5) return 41;
    return 44;
  };

  const discountPercent = getVolumeDiscount(sites.length);
  const annualSavings = Math.round(totalSpend * (discountPercent / 100));
  const newSpend = totalSpend - annualSavings;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-none p-8 md:p-12 max-w-5xl mx-auto shadow-sm" id="multisite-planner">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-dark-blue/15 text-brand-dark-blue border border-brand-dark-blue/10 px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
          <Layers className="w-3.5 h-3.5 text-brand-red" />
          Multi-Site Consolidation Engine
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase leading-none mb-3">
          Consolidate Multiple Meter Locations
        </h3>
        <p className="text-slate-500 text-xs md:text-sm uppercase tracking-wider font-semibold">
          Do you operate multiple outlets, branches, or logistics warehouses? Simulating bulk procurement leverage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Manage Sites (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Active Premises ({sites.length})</h4>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-1.5 bg-brand-red hover:bg-brand-orange text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-none transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Another Site
              </button>
            )}
          </div>

          {/* Add Site Form Toggle */}
          <AnimatePresence>
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddSite}
                className="bg-white p-6 rounded-none border border-slate-200 shadow-sm space-y-4 overflow-hidden"
              >
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Configure New Site Location</h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Site / Branch Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Retail Branch C"
                      value={newSiteName}
                      onChange={(e) => setNewSiteName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 focus:bg-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Postcode / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. IG2 7TP"
                      value={newSitePostcode}
                      onChange={(e) => setNewSitePostcode(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 focus:bg-white font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Energy Required</label>
                    <select
                      value={newSiteFuel}
                      onChange={(e) => setNewSiteFuel(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 focus:bg-white font-bold text-slate-800"
                    >
                      <option value="both">Both (Electricity & Gas)</option>
                      <option value="electricity">Electricity Only</option>
                      <option value="gas">Gas Only</option>
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Est. Annual Spend</label>
                      <span className="text-xs font-bold font-mono text-brand-dark-blue">£{newSiteSpend.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={newSiteSpend}
                      onChange={(e) => setNewSiteSpend(Number(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-none appearance-none cursor-pointer accent-brand-red"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-none text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
                  >
                    Add Site Node
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Sites Grid */}
          <div className="space-y-3">
            {sites.length === 0 ? (
              <div className="bg-white rounded-none border-2 border-dashed border-slate-200 p-8 text-center text-xs uppercase font-bold tracking-wider text-slate-400">
                All sites removed. Please add at least one site to compute consolidation savings.
              </div>
            ) : (
              sites.map((site, idx) => (
                <motion.div
                  key={site.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-5 rounded-none border border-slate-100 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 border border-slate-150 text-brand-dark-blue w-8 h-8 flex items-center justify-center font-bold text-xs font-mono rounded-none hidden sm:flex">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="text-xs md:text-sm font-bold uppercase text-slate-800 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {site.name}
                      </h5>
                      <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                        <span className="bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded-none font-semibold">Postcode: {site.postcode}</span>
                        <span className="flex items-center gap-0.5">
                          {site.fuelType === 'gas' && <Flame className="w-3 h-3 text-brand-red" />}
                          {site.fuelType === 'electricity' && <Zap className="w-3 h-3 text-brand-red" />}
                          {site.fuelType === 'both' && (
                            <>
                              <Zap className="w-3 h-3 text-brand-red" />
                              <Flame className="w-3 h-3 text-brand-red" />
                            </>
                          )}
                          <span>{site.fuelType}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block">Annual Spend</span>
                      <span className="text-xs md:text-sm font-mono font-bold text-slate-700">£{site.annualSpend.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveSite(site.id)}
                      className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-none transition-colors cursor-pointer"
                      title="Remove Site"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Consolidation Stats (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-brand-dark-blue/40 to-slate-950 text-white rounded-none p-8 flex flex-col justify-between shadow-sm relative overflow-hidden border border-slate-800">
          <div>
            <span className="text-brand-light-blue text-[10px] font-black uppercase tracking-[0.25em] mb-2 block">Centralized Contract Proposal</span>
            <h4 className="text-lg font-black tracking-tight uppercase border-b border-white/10 pb-4">CGE Multi-Site Leverage</h4>

            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-xs">
                <span className="text-slate-400 uppercase font-semibold text-[10px]">Total Outlets Count</span>
                <span className="font-mono font-bold uppercase">{sites.length} Premise(s)</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-xs">
                <span className="text-slate-400 uppercase font-semibold text-[10px]">Combined Baseline Spend</span>
                <span className="font-mono font-bold">£{totalSpend.toLocaleString()} / yr</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-xs">
                <span className="text-slate-400 uppercase font-semibold text-[10px]">Procurement Leverage</span>
                <span className="font-bold text-brand-coral uppercase">+{discountPercent}% Group Discount</span>
              </div>
            </div>

            {/* Simulated Consolidated Flow graphic */}
            <div className="my-6 bg-white/5 p-4 rounded-none border border-white/5 space-y-4">
              <span className="text-[9px] uppercase tracking-widest text-brand-light-blue font-bold block mb-1">Visualizing Unified Billing</span>
              
              <div className="flex justify-between items-center gap-1">
                <div className="flex -space-x-2">
                  {sites.slice(0, 4).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-none bg-slate-800 border border-slate-950 flex items-center justify-center text-[9px] font-mono text-white font-bold">
                      S{i+1}
                    </div>
                  ))}
                  {sites.length > 4 && (
                    <div className="w-8 h-8 rounded-none bg-brand-dark-blue border border-slate-950 flex items-center justify-center text-[9px] text-white font-bold">
                      +{sites.length - 4}
                    </div>
                  )}
                </div>
                <div className="flex-grow h-0.5 border-t border-dashed border-slate-700 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-dark-blue text-[8px] font-black text-white px-2 py-0.5 rounded-none uppercase tracking-widest">
                    Centralized
                  </div>
                </div>
                {/* Rotated square branding */}
                <div className="w-9 h-9 bg-brand-red rotate-45 flex items-center justify-center shadow-sm border border-white/10 flex-shrink-0">
                  <span className="text-[10px] font-black -rotate-45 font-mono">CGE</span>
                </div>
              </div>
              
              <p className="text-[10px] text-slate-400 leading-relaxed font-semibold uppercase tracking-wider">
                Instead of managing {sites.length} billing cycles, we bundle them into a single centralized agreement with one dedicated corporate contact.
              </p>
            </div>

            <div className="bg-slate-900 border-l-4 border-brand-coral p-4 rounded-none flex items-center justify-between border-t border-r border-b border-slate-800">
              <div>
                <span className="text-[9px] text-brand-light-blue block font-bold uppercase tracking-wider">Est. Combined Savings</span>
                <span className="text-2xl font-mono font-black text-white">£{annualSavings.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-bold">New Net Spend</span>
                <span className="text-sm font-mono font-bold text-brand-light-blue">£{newSpend.toLocaleString()} / yr</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => onOpenQuoteForm({
                fuelType: sites.some(s => s.fuelType === 'both') ? 'both' : (sites.some(s => s.fuelType === 'electricity') ? 'electricity' : 'gas'),
                contractType: 'multisite',
                numSites: sites.length,
                currentSpend: totalSpend,
                additionalDetails: `Configured via Multi-Site Planner with ${sites.length} sites. Total baseline spend: £${totalSpend.toLocaleString()}. Estimated consolidated savings: £${annualSavings.toLocaleString()} per year.`
              })}
              className="w-full bg-brand-red hover:bg-brand-orange text-white font-bold py-4 px-4 rounded-none text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
              disabled={sites.length === 0}
            >
              Secure Consolidated Multi-site Tariff
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex justify-center gap-4 mt-3 text-[9px] uppercase tracking-widest font-bold text-slate-500">
              <span>Zero auditing friction</span>
              <span>•</span>
              <span>1 Corporate Contract</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
