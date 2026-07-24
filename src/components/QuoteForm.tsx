import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, ArrowRight, ArrowLeft, CheckCircle2, Flame, Zap, Phone, Building2 } from 'lucide-react';
import { EnergyLead } from '../types';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultData?: {
    fuelType: 'electricity' | 'gas' | 'both';
    contractType: 'renewal' | 'new' | 'multisite';
    numSites: number;
    currentSpend: number;
    currentSupplier?: string;
    additionalDetails?: string;
  };
  onSubmitSuccess?: (lead: EnergyLead) => void;
}

export default function QuoteForm({ isOpen, onClose, defaultData, onSubmitSuccess }: QuoteFormProps) {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields
  const [fuelType, setFuelType] = useState<'electricity' | 'gas' | 'both'>('both');
  const [contractType, setContractType] = useState<'renewal' | 'new' | 'multisite'>('renewal');
  const [numSites, setNumSites] = useState<number>(1);
  const [currentSpend, setCurrentSpend] = useState<number>(12000);
  const [businessName, setBusinessName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentSupplier, setCurrentSupplier] = useState<string>('');
  const [contractExpiryDate, setContractExpiryDate] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  // Populate from defaults if provided
  useEffect(() => {
    if (defaultData) {
      if (defaultData.fuelType) setFuelType(defaultData.fuelType);
      if (defaultData.contractType) setContractType(defaultData.contractType);
      if (defaultData.numSites) setNumSites(defaultData.numSites);
      if (defaultData.currentSpend) setCurrentSpend(defaultData.currentSpend);
      if (defaultData.currentSupplier) setCurrentSupplier(defaultData.currentSupplier);
      if (defaultData.additionalDetails) setAdditionalDetails(defaultData.additionalDetails);
    }
  }, [defaultData]);

  if (!isOpen) return null;

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMsg(null);

    const uniqueId = 'LEAD-' + Math.floor(1000 + Math.random() * 9000);
    const newLead: EnergyLead = {
      id: uniqueId,
      businessName,
      contactName,
      phone,
      email,
      fuelType,
      contractType,
      numSites,
      currentAnnualSpend: currentSpend,
      currentSupplier,
      contractExpiryDate,
      additionalDetails,
      submittedAt: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
      status: 'new'
    };

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to send quote request. Please try again.');
      }

      // Store in localStorage
      const existingLeadsRaw = localStorage.getItem('cge_leads');
      const existingLeads = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
      localStorage.setItem('cge_leads', JSON.stringify([newLead, ...existingLeads]));

      setLeadId(uniqueId);
      setSubmitted(true);
      
      if (onSubmitSuccess) {
        onSubmitSuccess(newLead);
      }
    } catch (err: any) {
      console.error('Error submitting quote:', err);
      setErrorMsg(err.message || 'Connection error. Please check your network or try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        className="bg-white rounded-none w-full max-w-xl shadow-xl overflow-hidden relative border border-slate-200 flex flex-col max-h-[90vh]"
      >
        {/* Header bar */}
        <div className="px-6 py-5 bg-brand-dark-blue text-white flex justify-between items-center flex-shrink-0 border-b border-slate-800">
          <div>
            <h4 className="font-black text-xs md:text-sm uppercase tracking-[0.25em] flex items-center gap-2 text-white">
              Get Your Energy Quote
            </h4>
            <p className="text-brand-light-blue text-[10px] uppercase font-bold tracking-widest mt-1">Negotiated rates • 100% Free Consultation</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-none transition-colors text-white/90 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto flex-grow">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Stepper Header */}
              <div className="flex items-center gap-1.5 justify-center mb-8">
                {[1, 2, 3].map((s) => (
                  <React.Fragment key={s}>
                    <div className={`w-8 h-8 rounded-none border flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      step >= s 
                        ? 'bg-brand-red border-brand-red text-white font-black' 
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-14 h-[1px] ${
                        step > s ? 'bg-brand-red' : 'bg-slate-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* STEP 1: Core Configuration */}
              {step === 1 && (
                <div className="space-y-4">
                  <h5 className="font-black uppercase tracking-wider text-slate-900 text-xs mb-3 border-l-2 border-brand-red pl-3">Step 1: Utility & Contract Setup</h5>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Energy Service Required</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'electricity', label: 'Electricity', icon: Zap },
                        { id: 'gas', label: 'Gas', icon: Flame },
                        { id: 'both', label: 'Dual Fuel', icon: Building2 }
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setFuelType(item.id as any)}
                          className={`flex flex-col items-center p-4 rounded-none border-2 cursor-pointer transition-all ${
                            fuelType === item.id 
                              ? 'border-brand-red bg-brand-dark-blue/5 text-brand-red font-bold' 
                              : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50 text-slate-500'
                          }`}
                        >
                          <item.icon className="w-4 h-4 mb-1" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Agreement Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'renewal', label: 'Renewal' },
                        { id: 'new', label: 'New Meter' },
                        { id: 'multisite', label: 'Multi-site' }
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setContractType(item.id as any)}
                          className={`p-3 rounded-none border-2 text-center text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-all ${
                            contractType === item.id 
                              ? 'border-brand-red bg-brand-dark-blue/5 text-brand-red' 
                              : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50 text-slate-500'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Number of Sites</label>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={numSites}
                        onChange={(e) => setNumSites(Number(e.target.value))}
                        className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Est. Current Annual Spend (£)</label>
                      <input
                        type="number"
                        min="100"
                        step="500"
                        value={currentSpend}
                        onChange={(e) => setCurrentSpend(Number(e.target.value))}
                        className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-brand-red hover:bg-brand-orange text-white py-3 px-5 rounded-none text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Business & Current Situation */}
              {step === 2 && (
                <div className="space-y-4">
                  <h5 className="font-black uppercase tracking-wider text-slate-900 text-xs mb-3 border-l-2 border-brand-red pl-3">Step 2: Business Details</h5>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Registered Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Logistics Ltd"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Current Supplier (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. British Gas, SSE"
                        value={currentSupplier}
                        onChange={(e) => setCurrentSupplier(e.target.value)}
                        className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Contract End Date (Optional)</label>
                      <input
                        type="date"
                        value={contractExpiryDate}
                        onChange={(e) => setContractExpiryDate(e.target.value)}
                        className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Any Specific Requirements / Bill Details</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Need to lock in a new meter. Or, looking for cheaper prices for a renewal than the £3,400 quoted by EON."
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 resize-none font-semibold"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="text-slate-500 hover:text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-brand-red hover:bg-brand-orange text-white py-3 px-5 rounded-none text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Details & Submit */}
              {step === 3 && (
                <div className="space-y-4">
                  <h5 className="font-black uppercase tracking-wider text-slate-900 text-xs mb-3 border-l-2 border-brand-red pl-3">Step 3: Contact Representative</h5>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Smith"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Work Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. j.smith@acme.co.uk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Direct Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 07951 234054"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs p-3 rounded-none border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 text-slate-600 p-4 rounded-none border border-slate-200 flex items-start gap-3">
                    <Shield className="w-4 h-4 text-brand-dark-blue mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] leading-relaxed uppercase tracking-wider font-semibold">
                      By submitting, you agree to allow Commercial Gas & Electricity Ltd (CGE) to perform a direct comparison on your behalf. We will never share or sell your details.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-none border border-red-200 text-xs font-semibold flex items-center gap-2">
                      <span>⚠️</span> <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={isSending}
                      className="text-slate-500 hover:text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSending}
                      className={`bg-brand-red hover:bg-brand-orange text-white py-3.5 px-6 rounded-none text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer ${
                        isSending ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSending ? 'Sending...' : 'Submit Quote Request'}
                      {isSending ? (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-16 h-16 bg-brand-dark-blue/10 text-brand-dark-blue border border-brand-dark-blue/20 rounded-none flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-brand-red" />
              </div>
              
              <div>
                <h4 className="text-lg font-black uppercase tracking-wider text-slate-900 mb-1">Quote Requested</h4>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 max-w-sm mx-auto">
                  Your reference ID is <strong className="text-brand-red font-mono font-black">{leadId}</strong>. A dedicated CGE energy procurement expert is on the case.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-none max-w-sm mx-auto text-left text-[11px] uppercase tracking-wider font-semibold space-y-3.5 border border-slate-200">
                <div className="font-bold text-slate-950 tracking-widest text-xs border-b border-slate-200 pb-2">What happens next?</div>
                <div className="flex gap-2.5 text-slate-600">
                  <span className="font-bold text-brand-red">1.</span>
                  <span>We will cross-reference your consumption parameters with E.ON Next, British Gas, and other partners.</span>
                </div>
                <div className="flex gap-2.5 text-slate-600">
                  <span className="font-bold text-brand-red">2.</span>
                  <span>We will call you on <strong className="text-slate-950 font-bold">{phone}</strong> within 15 minutes to confirm details.</span>
                </div>
                <div className="flex gap-2.5 text-slate-600">
                  <span className="font-bold text-brand-red">3.</span>
                  <span>You receive your Obligatory Free Quotation outlining exact yearly savings.</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <a 
                  href={`https://wa.me/447951234054?text=Hello,%20I%20have%20submitted%20lead%20${leadId}%20for%20my%20business%20${encodeURIComponent(businessName)}.%20Please%20verify%20rates.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-red hover:bg-brand-orange text-white font-bold py-3.5 px-5 rounded-none text-xs uppercase tracking-widest flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <button
                  onClick={onClose}
                  className="bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-5 rounded-none text-xs uppercase tracking-widest cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
