import React, { useState, useEffect } from 'react';
import { ShieldCheck, ClipboardList, TrendingUp, Users, Check, RefreshCw, Flame, Zap, Trash2, Mail, Phone, Clock } from 'lucide-react';
import { EnergyLead } from '../types';

interface LeadPortalProps {
  onClose: () => void;
}

const MOCK_PRELOADS: EnergyLead[] = [
  {
    id: 'LEAD-8219',
    businessName: 'Ilford Mouldings Ltd',
    contactName: 'Robert Sterling',
    phone: '020 8220 6063',
    email: 'r.sterling@ilfordmouldings.co.uk',
    fuelType: 'gas',
    contractType: 'renewal',
    numSites: 1,
    currentAnnualSpend: 84000,
    currentSupplier: 'EDF Energy',
    additionalDetails: 'Preloaded Case Study. Lock in gas renewal under the standard 4.65p/kWh promotion rate.',
    submittedAt: '13/07/2026, 14:24:00',
    status: 'completed'
  },
  {
    id: 'LEAD-4921',
    businessName: 'South-East Retail Group',
    contactName: 'Chloe Davenport',
    phone: '07490 156620',
    email: 'chloe@southeastretail.co.uk',
    fuelType: 'both',
    contractType: 'multisite',
    numSites: 12,
    currentAnnualSpend: 42500,
    currentSupplier: 'British Gas Business',
    additionalDetails: 'Preloaded Case Study. Looking to consolidate all 12 commercial retail properties into one single contract.',
    submittedAt: '14/07/2026, 08:12:00',
    status: 'negotiating'
  }
];

export default function LeadPortal({ onClose }: LeadPortalProps) {
  const [leads, setLeads] = useState<EnergyLead[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const stored = localStorage.getItem('cge_leads');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as EnergyLead[];
        const combined = [...parsed];
        MOCK_PRELOADS.forEach(preload => {
          if (!combined.some(item => item.id === preload.id)) {
            combined.push(preload);
          }
        });
        setLeads(combined);
      } catch (e) {
        setLeads(MOCK_PRELOADS);
      }
    } else {
      setLeads(MOCK_PRELOADS);
      localStorage.setItem('cge_leads', JSON.stringify(MOCK_PRELOADS));
    }
  };

  const handleUpdateStatus = (id: string, newStatus: EnergyLead['status']) => {
    const updated = leads.map(l => {
      if (l.id === id) return { ...l, status: newStatus };
      return l;
    });
    setLeads(updated);
    localStorage.setItem('cge_leads', JSON.stringify(updated.filter(item => !item.id.includes('MOCK'))));
  };

  const handleRemoveLead = (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('cge_leads', JSON.stringify(updated));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Reset the broker portal to default mock cases?')) {
      localStorage.setItem('cge_leads', JSON.stringify(MOCK_PRELOADS));
      setLeads(MOCK_PRELOADS);
    }
  };

  const activeCount = leads.length;
  const totalAnnualSpend = leads.reduce((sum, l) => sum + l.currentAnnualSpend, 0);
  
  const estimatedCommissions = Math.round(totalAnnualSpend * 0.025);
  const totalNegotiatedSavings = Math.round(totalAnnualSpend * 0.38);

  const filteredLeads = leads.filter(l => {
    if (filter === 'all') return true;
    return l.status === filter;
  });

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-none p-8 md:p-12 max-w-6xl mx-auto shadow-sm text-slate-100" id="broker-leads-portal">
      {/* Portal Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-brand-dark-blue/25 text-brand-light-blue border border-brand-dark-blue/35 px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <ClipboardList className="w-3.5 h-3.5" />
            CGE CRM Broker Panel
          </div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">
            Lead Management Portal
          </h3>
          <p className="text-slate-400 text-xs mt-1.5 uppercase font-semibold tracking-wider">
            Admin console for managing incoming commercial tariff quotes and wholesale savings audits.
          </p>
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={loadLeads}
            className="p-3 bg-slate-900 border border-slate-800 hover:border-brand-red text-slate-300 rounded-none hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleClearAll}
            className="p-3 bg-slate-900 border border-slate-800 hover:border-brand-red hover:text-brand-light-blue text-slate-300 rounded-none transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          >
            Reset CRM
          </button>
          <button
            onClick={onClose}
            className="bg-brand-red hover:bg-brand-orange text-white font-bold text-[10px] uppercase tracking-widest px-5 py-3 rounded-none cursor-pointer transition-colors"
          >
            Exit Portal
          </button>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-none border-l-4 border-brand-red">
          <div className="flex justify-between items-start mb-2 text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-widest">Total Active Leads</span>
            <Users className="w-4 h-4 text-brand-red" />
          </div>
          <div className="text-2xl font-mono font-black text-white">{activeCount}</div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-brand-light-blue mt-1.5 block">Pipeline queue size</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-none border-l-4 border-brand-red">
          <div className="flex justify-between items-start mb-2 text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-widest">Total Portfolio Value</span>
            <Zap className="w-4 h-4 text-brand-light-blue" />
          </div>
          <div className="text-2xl font-mono font-black text-white">£{totalAnnualSpend.toLocaleString()}</div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 mt-1.5 block">Combined annual spend</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-none border-l-4 border-brand-red">
          <div className="flex justify-between items-start mb-2 text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-widest">Savings Secured</span>
            <TrendingUp className="w-4 h-4 text-brand-light-blue" />
          </div>
          <div className="text-2xl font-mono font-black text-brand-light-blue">£{totalNegotiatedSavings.toLocaleString()}</div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 mt-1.5 block">Negotiated Broker index</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-none border-l-4 border-brand-red">
          <div className="flex justify-between items-start mb-2 text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-widest">Broker Commissions</span>
            <ShieldCheck className="w-4 h-4 text-brand-light-blue" />
          </div>
          <div className="text-2xl font-mono font-black text-brand-light-blue">£{estimatedCommissions.toLocaleString()}</div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 mt-1.5 block">Paid by utility suppliers</span>
        </div>

      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: 'All Inquiries' },
          { id: 'new', label: 'New / Unopened' },
          { id: 'contacted', label: 'Contacted' },
          { id: 'negotiating', label: 'Negotiation Matrix' },
          { id: 'completed', label: 'Completed Agreements' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors ${
              filter === tab.id
                ? 'bg-brand-red text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leads Table / Cards */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="bg-slate-950 rounded-none border-2 border-dashed border-slate-800 p-12 text-center text-xs uppercase tracking-widest font-bold text-slate-500">
            No leads match the selected filter category. Try submitting a test quote in the landing page!
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div 
              key={lead.id} 
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-none transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-slate-300 uppercase bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-none">{lead.id}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> {lead.submittedAt}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-white uppercase mt-1.5">{lead.businessName}</h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-none border ${
                    lead.status === 'new' ? 'bg-brand-light-blue/10 text-brand-light-blue border-brand-light-blue/20' :
                    lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    lead.status === 'negotiating' ? 'bg-brand-coral/10 text-brand-coral border-brand-coral/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {lead.status === 'new' ? '● New Enquiry' :
                     lead.status === 'contacted' ? '✓ Contacted' :
                     lead.status === 'negotiating' ? '⚡ Negotiating' :
                     '★ Completed Contract'}
                  </span>
                  
                  <span className="text-[9px] bg-slate-950 text-slate-400 px-2.5 py-1 rounded-none border border-slate-800 font-bold uppercase tracking-wider">
                    {lead.fuelType}
                  </span>
                  <span className="text-[9px] bg-slate-950 text-slate-400 px-2.5 py-1 rounded-none border border-slate-800 font-bold uppercase tracking-wider">
                    {lead.contractType === 'renewal' ? 'Renewal' : lead.contractType === 'new' ? 'New Meter' : `${lead.numSites} Sites`}
                  </span>
                </div>
              </div>

              {/* CRM Lead Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs uppercase font-semibold tracking-wider">
                {/* Contact Column */}
                <div className="md:col-span-4 space-y-2.5">
                  <h5 className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Representative Contacts</h5>
                  <div className="space-y-1.5 NormalText font-sans">
                    <p className="font-bold text-slate-200">{lead.contactName}</p>
                    <p className="flex items-center gap-2 text-slate-400 hover:text-white"><Phone className="w-3.5 h-3.5 text-slate-500" /> {lead.phone}</p>
                    <p className="flex items-center gap-2 text-slate-400 hover:text-white truncate"><Mail className="w-3.5 h-3.5 text-slate-500" /> {lead.email}</p>
                  </div>
                </div>

                {/* Energy Params */}
                <div className="md:col-span-4 space-y-2.5">
                  <h5 className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Contract Parameters</h5>
                  <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-500 font-sans text-xs">Annual Spend:</span><span className="font-bold text-white">£{lead.currentAnnualSpend.toLocaleString()}</span></div>
                    {lead.currentSupplier && <div className="flex justify-between"><span className="text-slate-500 font-sans text-xs">Current Supplier:</span><span>{lead.currentSupplier}</span></div>}
                    {lead.contractExpiryDate && <div className="flex justify-between"><span className="text-slate-500 font-sans text-xs">Contract End Date:</span><span>{lead.contractExpiryDate}</span></div>}
                    <div className="flex justify-between text-brand-coral font-bold pt-1.5 border-t border-slate-800/60 font-sans text-xs"><span className="text-slate-500">Broker Savings:</span><span>£{Math.round(lead.currentAnnualSpend * 0.38).toLocaleString()} (38%)</span></div>
                  </div>
                </div>

                {/* Notes Column */}
                <div className="md:col-span-4 space-y-2.5">
                  <h5 className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Requirements / Audit Notes</h5>
                  <div className="bg-slate-950 p-4 rounded-none border border-slate-800/60 min-h-[60px] text-[10px] text-slate-400 leading-relaxed italic NormalText font-sans">
                    {lead.additionalDetails || 'No additional details provided.'}
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex flex-wrap sm:justify-between items-center gap-3 pt-3 border-t border-slate-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Update CRM Status:</span>
                  <div className="flex gap-1.5">
                    {lead.status !== 'contacted' && (
                      <button
                        onClick={() => handleUpdateStatus(lead.id, 'contacted')}
                        className="bg-slate-800 hover:bg-brand-red border border-slate-700 text-slate-300 px-3 py-1.5 rounded-none font-bold text-[9px] uppercase tracking-widest cursor-pointer transition-colors"
                      >
                        Contacted
                      </button>
                    )}
                    {lead.status !== 'negotiating' && (
                      <button
                        onClick={() => handleUpdateStatus(lead.id, 'negotiating')}
                        className="bg-slate-800 hover:bg-brand-red border border-slate-700 text-slate-300 px-3 py-1.5 rounded-none font-bold text-[9px] uppercase tracking-widest cursor-pointer transition-colors"
                      >
                        Negotiate
                      </button>
                    )}
                    {lead.status !== 'completed' && (
                      <button
                        onClick={() => handleUpdateStatus(lead.id, 'completed')}
                        className="bg-slate-800 hover:bg-brand-red border border-slate-700 text-slate-300 px-3 py-1.5 rounded-none font-bold text-[9px] uppercase tracking-widest cursor-pointer transition-colors flex items-center gap-0.5"
                      >
                        <Check className="w-3 h-3" /> Lock Contract
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveLead(lead.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-none transition-colors cursor-pointer flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Dequeue Lead
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
