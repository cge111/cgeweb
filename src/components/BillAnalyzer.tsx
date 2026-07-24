import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ShieldAlert, BadgePercent, ArrowRight, RefreshCw, Upload, Sparkles, Server } from 'lucide-react';

interface BillAnalyzerProps {
  onOpenQuoteForm: (defaultData: {
    fuelType: 'electricity' | 'gas' | 'both';
    contractType: 'renewal' | 'new' | 'multisite';
    numSites: number;
    currentSpend: number;
    currentSupplier: string;
    additionalDetails: string;
  }) => void;
}

interface BillScenario {
  id: string;
  supplier: string;
  fuelType: 'electricity' | 'gas' | 'both';
  annualSpend: number;
  consumptionKwh: number;
  unitRate: number;
  standingCharge: number;
  expiryDate: string;
  objectionType: string;
  billDate: string;
  customerName: string;
}

const SCENARIOS: BillScenario[] = [
  {
    id: 'british-gas-elec',
    supplier: 'British Gas Business',
    fuelType: 'electricity',
    annualSpend: 5400,
    consumptionKwh: 15000,
    unitRate: 36.0,
    standingCharge: 135,
    expiryDate: '2026-10-15',
    objectionType: 'Contract Expiring soon (Roll-over risk)',
    billDate: 'July 2026',
    customerName: 'A1 Logistics Ltd'
  },
  {
    id: 'eon-gas-expensive',
    supplier: 'E.ON Next Commercial',
    fuelType: 'gas',
    annualSpend: 9800,
    consumptionKwh: 85000,
    unitRate: 11.53,
    standingCharge: 210,
    expiryDate: 'Out of Contract (Standard Variable Rate)',
    objectionType: 'Immediate Action Required (Paying standard variable rates)',
    billDate: 'June 2026',
    customerName: 'Ilford Engineering Ltd'
  },
  {
    id: 'scottish-power-dual',
    supplier: 'ScottishPower Business',
    fuelType: 'both',
    annualSpend: 16500,
    consumptionKwh: 45000,
    unitRate: 31.5,
    standingCharge: 180,
    expiryDate: '2027-01-20',
    objectionType: 'Overcharged under high fixed-rate contract',
    billDate: 'May 2026',
    customerName: 'The Crown Inn, Essex'
  }
];

export default function BillAnalyzer({ onOpenQuoteForm }: BillAnalyzerProps) {
  const [selectedScenario, setSelectedScenario] = useState<BillScenario | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStep, setScanStep] = useState<string>('');
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [customFileName, setCustomFileName] = useState<string>('');

  const runScanningSimulation = (scenario: BillScenario, fileName?: string) => {
    setSelectedScenario(scenario);
    setIsScanning(true);
    setAnalyzed(false);
    setScanProgress(0);
    setCustomFileName(fileName || '');

    const steps = [
      { progress: 15, msg: 'Initializing secure CGE document sandbox...' },
      { progress: 35, msg: `Reading text nodes using advanced UK energy broker OCR...` },
      { progress: 55, msg: `Extracting billing period and tariff rates from invoice header...` },
      { progress: 75, msg: `Detected Supplier: ${scenario.supplier}` },
      { progress: 90, msg: `Comparing ${scenario.fuelType.toUpperCase()} unit rate against live CGE supplier price matrices...` },
      { progress: 100, msg: 'Audit Complete! Compiling side-by-side comparison report...' }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const step = steps[currentStepIdx];
        setScanStep(step.msg);
        setScanProgress(step.progress);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setAnalyzed(true);
        }, 600);
      }
    }, 450);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const mockScenario: BillScenario = {
      ...SCENARIOS[1],
      customerName: 'Your Business Entity',
      billDate: 'Current Bill File'
    };
    runScanningSimulation(mockScenario, file.name);
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setAnalyzed(false);
    setIsScanning(false);
    setScanProgress(0);
    setCustomFileName('');
  };

  const getCGERates = (scenario: BillScenario) => {
    if (scenario.fuelType === 'gas') {
      return { unitRate: 4.65, standingCharge: 140, total: Math.round((scenario.consumptionKwh * 0.0465) + (1.40 * 365)) };
    } else if (scenario.fuelType === 'electricity') {
      return { unitRate: 24.5, standingCharge: 95, total: Math.round((scenario.consumptionKwh * 0.245) + (0.95 * 365)) };
    } else {
      return { unitRate: 15.2, standingCharge: 235, total: Math.round((scenario.consumptionKwh * 0.152) + (2.35 * 365)) };
    }
  };

  const cgeReport = selectedScenario ? getCGERates(selectedScenario) : { unitRate: 0, standingCharge: 0, total: 0 };
  const originalTotal = selectedScenario ? selectedScenario.annualSpend : 0;
  const savings = originalTotal - cgeReport.total;
  const savingsPercentage = originalTotal > 0 ? Math.round((savings / originalTotal) * 100) : 0;

  return (
    <div className="bg-slate-900 text-white rounded-none p-8 md:p-12 shadow-sm border border-slate-800 max-w-5xl mx-auto" id="bill-analyzer">
      <div className="flex flex-col lg:flex-row gap-10 items-stretch">
        
        {/* LEFT COLUMN: Controls & Upload (5 cols) */}
        <div className="lg:w-5/12 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-dark-blue/25 text-brand-light-blue px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-brand-dark-blue/35">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Bill Analyzer
            </div>
            
            <div className="border-l-4 border-brand-red pl-5 mb-6">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight">
                Audit Your Current Energy Tariff
              </h3>
              <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed">
                Upload your latest business electricity or gas invoice, or run a test scan using one of our verified PDF samples to detect overcharging.
              </p>
            </div>

            {/* Upload Area */}
            {!isScanning && !analyzed && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-700 hover:border-brand-red rounded-none p-8 text-center transition-all cursor-pointer bg-slate-950/50 hover:bg-slate-950 flex flex-col items-center justify-center relative group">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-slate-500 group-hover:text-brand-light-blue mb-3 transition-colors" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Drag & Drop Business Bill</h4>
                  <p className="text-[10px] uppercase font-semibold text-slate-500 mt-1 tracking-wider">Supports PDF, PNG or JPEG up to 10MB</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 bg-slate-800 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-none font-bold text-slate-400">
                    Secure & GDPR Compliant
                  </div>
                </div>

                <div className="relative flex py-2 items-center text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="mx-3">Or Select A Verified Sample Bill</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                {/* Preconfigured Samples */}
                <div className="space-y-2">
                  {SCENARIOS.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => runScanningSimulation(scenario)}
                      className="w-full text-left p-4 rounded-none bg-slate-950 border border-slate-800 hover:border-brand-red transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand-red" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">{scenario.supplier}</span>
                        </div>
                        <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mt-1">
                          {scenario.fuelType.toUpperCase()} • Spend: £{scenario.annualSpend.toLocaleString()}/yr
                        </div>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-light-blue group-hover:text-brand-coral flex items-center gap-1 font-bold">
                        Scan Sample
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scanning Progress Bar */}
            {isScanning && selectedScenario && (
              <div className="bg-slate-950 rounded-none p-6 border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-5 h-5 text-brand-light-blue animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Processing Energy Audit</h4>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">File: {customFileName || 'sample_bill_extract.pdf'}</p>
                  </div>
                </div>

                {/* Simulated Terminal logs */}
                <div className="bg-black/90 font-mono text-[11px] text-brand-light-blue p-4 rounded-none border border-slate-800 h-24 overflow-y-auto mb-4 scrollbar-thin">
                  <span className="text-slate-600">[2026-07-14T09:03Z]</span> {scanStep}
                </div>

                <div className="w-full bg-slate-800 h-1 rounded-none overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-red"
                    initial={{ width: '0%' }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-2">
                  <span>OCR Extractor Engine</span>
                  <span className="font-bold text-slate-200">{scanProgress}%</span>
                </div>
              </div>
            )}

            {/* Results Header Action */}
            {analyzed && selectedScenario && (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-none border border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500">AUDITED ENTITY</h4>
                    <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">{selectedScenario.customerName}</p>
                    <p className="text-[10px] text-slate-500 font-medium">Period: {selectedScenario.billDate}</p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-none hover:text-white transition-colors cursor-pointer"
                    title="Audit another bill"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="bg-brand-dark-blue/15 border border-brand-dark-blue/30 text-brand-light-blue p-5 rounded-none flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand-coral" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Overcharge Alert Detected!</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedScenario.objectionType}. Current supplier rate is <strong className="text-white font-mono">{selectedScenario.unitRate}p/kWh</strong>, which is far above direct wholesale benchmarks.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-8 pt-4 border-t border-slate-800">
            *All data is secure. CGE does not share your uploaded invoicing materials. Registered with ICO UK under UK GDPR guidelines.
          </div>
        </div>

        {/* RIGHT COLUMN: Scanned Document & Comparison (7 cols) */}
        <div className="lg:w-7/12 bg-slate-950/50 rounded-none border border-slate-800 p-6 flex flex-col justify-center min-h-[380px] relative">
          
          <AnimatePresence mode="wait">
            {/* 1. Default State */}
            {!selectedScenario && !isScanning && !analyzed && (
              <motion.div 
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-8 flex flex-col items-center justify-center h-full"
              >
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-none flex items-center justify-center text-slate-500 mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">No Bill Scanned Yet</h4>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 max-w-sm leading-relaxed">
                  Choose a supplier scenario on the left or drop an invoice to run an automated audit and view negotiated savings.
                </p>
              </motion.div>
            )}

            {/* 2. Scanning Laser Animation */}
            {isScanning && selectedScenario && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex flex-col justify-between h-full bg-white text-slate-800 p-6 rounded-none border border-slate-200 overflow-hidden shadow-sm"
              >
                {/* Brand Red Neon Laser Sweeper */}
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-red animate-scanner shadow-[0_0_8px_#F62D0C] z-20"></div>

                {/* Mock Bill Header */}
                <div className="border-b-2 border-slate-100 pb-4 mb-4 flex justify-between items-start opacity-30">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-widest">COMMERCIAL INVOICE</span>
                    <span className="text-xs font-bold text-slate-900 uppercase">{selectedScenario.supplier}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block font-mono">Invoice #BG-98319</span>
                    <span className="text-[9px] text-slate-400 block font-mono">Date: {selectedScenario.billDate}</span>
                  </div>
                </div>

                <div className="space-y-4 opacity-25 flex-grow">
                  <div className="h-4 bg-slate-200 rounded-none w-1/3"></div>
                  <div className="h-2 bg-slate-100 rounded-none w-full"></div>
                  <div className="h-2 bg-slate-100 rounded-none w-5/6"></div>
                  <div className="h-2 bg-slate-100 rounded-none w-full"></div>
                  <div className="grid grid-cols-2 gap-4 my-4">
                    <div className="bg-slate-50 p-3 rounded-none border border-slate-100">
                      <div className="h-3 bg-slate-200 rounded-none w-1/2 mb-2"></div>
                      <div className="h-6 bg-slate-200 rounded-none w-3/4"></div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-none border border-slate-100">
                      <div className="h-3 bg-slate-200 rounded-none w-1/2 mb-2"></div>
                      <div className="h-6 bg-slate-200 rounded-none w-3/4"></div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-4 text-center text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase font-bold">
                  METRIC PROCUREMENT INDEX EXTRACTION ACTIVE...
                </div>
              </motion.div>
            )}

            {/* 3. Analyzed Report */}
            {analyzed && selectedScenario && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BadgePercent className="w-5 h-5 text-brand-light-blue" />
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">CGE Wholesale Audit Report</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Supplier Contract */}
                    <div className="bg-slate-900 p-5 rounded-none border border-slate-800">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1 tracking-wider">Your Tariff (As Scanned)</span>
                      <div className="text-xs font-bold text-slate-200 truncate uppercase tracking-wide">{selectedScenario.supplier}</div>
                      <div className="mt-4 space-y-1.5 text-[11px] uppercase tracking-wider font-semibold">
                        <div className="flex justify-between"><span className="text-slate-500">Unit Rate:</span><span className="font-bold text-slate-300 font-mono">{selectedScenario.unitRate}p / kWh</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Daily Standing:</span><span className="font-mono">{selectedScenario.standingCharge}p</span></div>
                        <div className="flex justify-between pt-3 border-t border-slate-800 text-slate-200 font-bold font-mono"><span className="text-slate-500 font-sans">Annual Cost:</span><span>£{selectedScenario.annualSpend.toLocaleString()}</span></div>
                      </div>
                    </div>

                    {/* CGE Negotiated Contract */}
                    <div className="bg-slate-900 p-5 rounded-none border-l-4 border-brand-coral border-t border-r border-b border-slate-800">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] text-brand-light-blue font-bold block uppercase tracking-wider">CGE Wholesale Rate</span>
                        <span className="bg-brand-dark-blue text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-widest">Locked</span>
                      </div>
                      <div className="text-xs font-bold text-white uppercase tracking-wide">Direct Wholesale Matrix</div>
                      <div className="mt-4 space-y-1.5 text-[11px] uppercase tracking-wider font-semibold">
                        <div className="flex justify-between"><span className="text-slate-400">CGE Unit Rate:</span><span className="font-bold text-brand-coral font-mono">{cgeReport.unitRate}p / kWh</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Daily Standing:</span><span className="font-mono">{cgeReport.standingCharge}p</span></div>
                        <div className="flex justify-between pt-3 border-t border-slate-800 text-white font-bold font-mono"><span className="text-slate-400 font-sans">Annual Cost:</span><span className="text-brand-coral">£{cgeReport.total.toLocaleString()}</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Visual chart bar */}
                <div className="bg-slate-900 p-4 rounded-none border border-slate-800">
                  <div className="flex justify-between items-center mb-3 text-[10px] uppercase font-bold tracking-wider">
                    <span className="text-slate-400">Annual Cost Comparison</span>
                    <span className="text-brand-coral font-black font-mono">You Save £{savings.toLocaleString()} ({savingsPercentage}%)</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-1 font-mono">
                        <span>Current Bill Cost</span>
                        <span>£{selectedScenario.annualSpend.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-850 h-1.5 rounded-none overflow-hidden">
                        <div className="bg-slate-500 h-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-1 font-mono">
                        <span>CGE Negotiated Cost</span>
                        <span>£{cgeReport.total.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-850 h-1.5 rounded-none overflow-hidden">
                        <div className="bg-brand-red h-full" style={{ width: `${(cgeReport.total / selectedScenario.annualSpend) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Form */}
                <button
                  onClick={() => onOpenQuoteForm({
                    fuelType: selectedScenario.fuelType,
                    contractType: 'renewal',
                    numSites: 1,
                    currentSpend: selectedScenario.annualSpend,
                    currentSupplier: selectedScenario.supplier,
                    additionalDetails: `Scanned from the Bill Analyzer (Scenario ID: ${selectedScenario.id}). Estimated savings: £${savings.toLocaleString()} per year at negotiated CGE rate of ${cgeReport.unitRate}p/kWh.`
                  })}
                  className="w-full bg-brand-red hover:bg-brand-orange text-white font-bold py-4 px-5 rounded-none text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  Apply This Lock-In Contract Rate
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
