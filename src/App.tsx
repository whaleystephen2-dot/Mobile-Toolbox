import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Copy, 
  Check, 
  Cpu, 
  ShieldCheck, 
  RefreshCw, 
  Trash2, 
  Info, 
  ChevronRight, 
  Smartphone, 
  Hash,
  Wrench,
  ExternalLink,
  Terminal,
  Play,
  Loader2,
  Unlock,
  Camera,
  Monitor,
  Volume2,
  Zap
} from "lucide-react";
import { SECRET_CODES, TROUBLESHOOTING_GUIDES, type SecretCode, type TroubleshootingGuide } from "./constants";
import { cn, copyToClipboard } from "./lib/utils";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<TroubleshootingGuide | null>(null);

  // Test Mode State
  const [testInput, setTestInput] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const filteredCodes = useMemo(() => {
    return SECRET_CODES.filter(code => {
      const matchesSearch = 
        code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "all" || code.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleCopy = (code: string) => {
    copyToClipboard(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const simulateCodeExecution = (code: string) => {
    const found = SECRET_CODES.find(c => c.code === code);
    if (!found) {
      let errorType = "ERR_UNKNOWN_COMMAND";
      let cause1 = "Code not applicable to Moto G Pure (XT2163DL).";
      let cause2 = "Code requires specific carrier firmware.";
      let cause3 = "Code deprecated in Android 11+.";
      let action = "Verify syntax and try again.";

      const numbersOnly = code.replace(/\D/g, '');

      if (!code.includes("*") && !code.includes("#")) {
        errorType = "ERR_MISSING_SYMBOLS";
        cause1 = "Input contains no diagnostic symbols (* or #).";
        cause2 = "Standard codes must follow *#...# or *#*#...#*#* format.";
        cause3 = "Plain text or raw numbers are not recognized.";
        if (numbersOnly) action = `Try formatting as: *#${numbersOnly}# or *#*#${numbersOnly}#*#*`;
      } else if (!code.startsWith("*#")) {
        errorType = "ERR_INVALID_PREFIX";
        cause1 = "Diagnostic codes must begin with '*#'.";
        cause2 = "Missing or incorrect initialization sequence.";
        cause3 = "Typo in the command string.";
        if (numbersOnly) action = `Try formatting as: *#*#${numbersOnly}#*#*`;
      } else if (!code.endsWith("#") && !code.endsWith("*")) {
        errorType = "ERR_INVALID_SUFFIX";
        cause1 = "Diagnostic codes must end with '#' or '#*#*'.";
        cause2 = "Missing termination sequence.";
        cause3 = "Incomplete command string.";
        if (numbersOnly) action = `Try appending the suffix: ${code}# or ${code}#*#*`;
      } else if (code.length < 5) {
        errorType = "ERR_MALFORMED_INPUT";
        cause1 = "Input string is too short.";
        cause2 = "Incomplete command sequence.";
        cause3 = "Verify code length.";
      } else if (numbersOnly.length > 0) {
        const similarCode = SECRET_CODES.find(c => c.code.replace(/\D/g, '') === numbersOnly);
        if (similarCode) {
          action = `Did you mean: ${similarCode.code} (${similarCode.title})?`;
        }
      }

      return `${errorType}: Execution halted.\n\n[Diagnostic Analysis]\nInput: ${code}\nValidation: FAILED\n\n[Potential Causes]\nCause 1: ${cause1}\nCause 2: ${cause2}\nCause 3: ${cause3}\n\n[Recommended Action]\nAction: ${action}`;
    }
    
    switch(code) {
      case "*#06#": return "IMEI 1: 359283749201928\nIMEI 2: 359283749201936\nSVN: 01\n\nStatus: VALID";
      case "*#*#4636#*#*": return "Phone Info: [ACCESS GRANTED]\nBattery Info: Good, 4120mV, 32°C\nUsage Stats: Loaded\nWi-Fi Info: Connected (RSSI: -45dBm)";
      case "*#*#2486#*#*": return "CQATest Menu Initialized.\nHardware Diagnostics: READY\nSensors: OK\nAudio: OK\nDisplay: OK";
      case "*#*#3424#*#*": return "HTC/Moto Test Program Running...\nExecuting diagnostic suite...\nResult: PASS";
      case "*#*#7262626#*#*": return "Field Test Mode\nNetwork: LTE Band 4\nRSRP: -98 dBm\nRSRQ: -12 dB\nSNR: 15.2 dB";
      case "*#*#426#*#*": return "FCM Diagnostics\nStatus: CONNECTED\nEvents: 42 pending\nHeartbeat: OK";
      case "*#*#225#*#*": return "Calendar Storage\nLocal: 12 events\nGoogle: 145 events\nExchange: 0 events";
      case "*#*#759#*#*": return "RLZ Debug UI\nOEM Mode: ENABLED\nClient ID: moto-g-pure-2021\nPing: SUCCESS";
      case "*#*#0842#*#*": return "Hardware Test Mode\nVibration Motor: PASS\nBacklight Max: 450 nits (PASS)\nBacklight Min: 2 nits (PASS)";
      case "*#*#1472365#*#*": return "GPS Diagnostic\nSatellites Locked: 8/12\nSignal Strength: Good\nAccuracy: 3.2 meters\nStatus: READY";
      case "*#*#232338#*#*": return "WLAN MAC Address\nMAC: 00:1A:2B:3C:4D:5E\nInterface: wlan0\nStatus: VALID";
      case "*#*#0588#*#*": return "Proximity Sensor Test\nSensor: AL3320A\nDistance: 5.0 cm\nStatus: PASS";
      case "*#*#2664#*#*": return "Touch Screen Diagnostic\nMulti-touch: 10 points\nGhost touches: 0\nStatus: VALID";
      case "*#*#3264#*#*": return "RAM Information\nTotal: 3072 MB\nType: LPDDR4X\nVendor: SK Hynix\nStatus: OK";
      case "*#*#232331#*#*": return "Bluetooth Diagnostic\nModule: BCM43438\nAddress: 00:11:22:33:44:55\nStatus: PASS";
      case "*#*#197328640#*#*": return "Service Mode\n[1] Debug Screen\n[2] Version Info\n[3] UMTS RF NV\n[4] Audio\n[5] Common\nStatus: READY";
      case "*#*#34971539#*#*": return "Camera Firmware\nRear Cam: Ver 3.4.1\nFront Cam: Ver 2.1.0\nStatus: OK";
      case "*#*#0*#*#*": return "LCD Test\nRed: PASS\nGreen: PASS\nBlue: PASS\nStatus: VALID";
      case "*#*#0673#*#*": return "Audio Test\nSpeaker L: PASS\nSpeaker R: PASS\nStatus: OK";
      case "*#*#0283#*#*": return "Loopback Test\nMic 1 to Speaker: PASS\nMic 2 to Earpiece: PASS\nStatus: VALID";
      case "*#*#2663#*#*": return "Display Version\nTouch FW: 0x1A2B\nPanel: BOE_6.5_HD+\nStatus: READY";
      case "*#*#159753#*#*": return "Color Profile\nCurrent: DCI-P3\nTarget: sRGB\nStatus: APPLIED";
      case "*#*#6090120#*#*": return "Refresh Rate Override\nCurrent: Auto (Adaptive)\nLocked: 90Hz\nStatus: ACTIVE";
      case "*#*#225427#*#*": return "Display Calibration\nGamma: 2.2\nWhite Point: 6500K\nContrast: Default\nStatus: READY";
      case "*#*#4378378#*#*": return "HDR Test\nPeak Brightness: 850 nits\n10-bit Color: Supported\nStatus: PASS";
      case "*#*#287646#*#*": return "Burn-in Check\nPattern: Solid White\nDefects Found: 0\nStatus: CLEAN";
      default: return `Executing ${found.title}...\nSimulation complete.`;
    }
  };

  const handleRunTest = () => {
    if (!testInput.trim()) return;
    setIsTesting(true);
    setTestResult(null);
    
    setTimeout(() => {
      setTestResult(simulateCodeExecution(testInput.trim()));
      setIsTesting(false);
    }, 1200);
  };

  const categories = [
    { id: "all", label: "All Codes", icon: Hash },
    { id: "general", label: "General", icon: Info },
    { id: "motorola", label: "Motorola", icon: Smartphone },
    { id: "advanced", label: "Advanced", icon: Terminal },
    { id: "camera", label: "Camera", icon: Camera },
    { id: "display", label: "Display", icon: Monitor },
    { id: "audio", label: "Audio", icon: Volume2 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e4e3e0] font-sans selection:bg-[#e4e3e0] selection:text-[#0a0a0a]">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#e4e3e0 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <header className="relative border-b border-[#e4e3e0]/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#e4e3e0]/5 border border-[#e4e3e0]/10 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-[#e4e3e0]/60" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Mobile Toolbox</h1>
                <p className="text-sm text-[#e4e3e0]/40 font-mono italic">Diagnostic Utility v1.0.4 // Moto G Pure XT2163DL</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e4e3e0]/5 border border-[#e4e3e0]/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">System Ready</span>
              </div>
              <a 
                href="https://motorola-global-portal.custhelp.com/app/home" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e4e3e0] text-[#0a0a0a] text-sm font-bold hover:bg-[#e4e3e0]/90 transition-colors"
              >
                Official Support <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Search & Filter Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#e4e3e0]/20 group-focus-within:text-[#e4e3e0]/60 transition-colors" />
              <input 
                type="text" 
                placeholder="Search codes, titles, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#e4e3e0]/5 border border-[#e4e3e0]/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#e4e3e0]/20 focus:border-[#e4e3e0]/40 transition-all placeholder:text-[#e4e3e0]/20"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                    activeCategory === cat.id 
                      ? "bg-[#e4e3e0] text-[#0a0a0a] border-[#e4e3e0]" 
                      : "bg-transparent text-[#e4e3e0]/60 border-[#e4e3e0]/10 hover:border-[#e4e3e0]/30"
                  )}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCodes.map((code) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={code.code}
                  className="group relative bg-[#e4e3e0]/5 border border-[#e4e3e0]/10 rounded-2xl p-6 hover:bg-[#e4e3e0]/10 transition-all cursor-pointer overflow-hidden"
                  onClick={() => handleCopy(code.code)}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedCode === code.code ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-[#e4e3e0]/40" />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border",
                        code.category === 'motorola' ? "border-blue-500/50 text-blue-400 bg-blue-500/10" :
                        code.category === 'advanced' ? "border-red-500/50 text-red-400 bg-red-500/10" :
                        code.category === 'camera' ? "border-purple-500/50 text-purple-400 bg-purple-500/10" :
                        code.category === 'display' ? "border-cyan-500/50 text-cyan-400 bg-cyan-500/10" :
                        code.category === 'audio' ? "border-amber-500/50 text-amber-400 bg-amber-500/10" :
                        "border-[#e4e3e0]/20 text-[#e4e3e0]/60 bg-[#e4e3e0]/5"
                      )}>
                        {code.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-mono font-bold tracking-tighter text-[#e4e3e0]">
                      {code.code}
                    </h3>
                    
                    <div className="space-y-1">
                      <p className="font-bold text-sm">{code.title}</p>
                      <p className="text-xs text-[#e4e3e0]/40 leading-relaxed">
                        {code.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 border-t border-l border-[#e4e3e0]/10 rotate-45" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredCodes.length === 0 && (
            <div className="py-20 text-center space-y-4 border border-dashed border-[#e4e3e0]/10 rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-[#e4e3e0]/5 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-[#e4e3e0]/20" />
              </div>
              <p className="text-[#e4e3e0]/40 font-mono">No diagnostic codes found matching your query.</p>
            </div>
          )}
        </section>

        {/* Test Mode Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#e4e3e0]/5 border border-[#e4e3e0]/10 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-[#e4e3e0]/60" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Test Mode Simulator</h2>
          </div>

          <div className="bg-[#e4e3e0]/5 border border-[#e4e3e0]/10 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e4e3e0]/40 font-mono font-bold">{">"}</div>
                <input 
                  type="text" 
                  placeholder="Enter diagnostic code (e.g., *#06#)"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunTest()}
                  className="w-full bg-[#0a0a0a] border border-[#e4e3e0]/20 rounded-xl py-4 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#e4e3e0]/20 font-mono transition-all placeholder:text-[#e4e3e0]/20 placeholder:font-sans"
                />
              </div>
              <button
                onClick={handleRunTest}
                disabled={isTesting || !testInput.trim()}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#e4e3e0] text-[#0a0a0a] font-bold hover:bg-[#e4e3e0]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isTesting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                Run Test
              </button>
            </div>

            <div className="relative bg-[#0a0a0a] rounded-xl border border-[#e4e3e0]/10 overflow-hidden min-h-[200px]">
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#e4e3e0]/5 border-b border-[#e4e3e0]/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                <span className="ml-2 text-[10px] font-mono text-[#e4e3e0]/40">diagnostic_terminal.exe</span>
              </div>
              
              <div className="p-6 pt-12 font-mono text-sm text-[#e4e3e0]/80 whitespace-pre-wrap">
                {isTesting ? (
                  <div className="flex items-center gap-3 text-[#e4e3e0]/60">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Executing command sequence...</span>
                  </div>
                ) : testResult ? (
                  <div className="leading-relaxed">
                    {testResult.split('\n').map((line, i) => {
                      if (!line.trim()) return <div key={i} className="h-4" />;
                      
                      let content;
                      if (line.startsWith("ERR")) {
                        content = <span className="text-red-400 font-bold">{line}</span>;
                      } else if (line.startsWith("[")) {
                        content = <span className="text-[#e4e3e0] font-bold tracking-widest text-[10px] uppercase">{line}</span>;
                      } else if (line.includes(":")) {
                        const colonIndex = line.indexOf(":");
                        const key = line.substring(0, colonIndex);
                        const value = line.substring(colonIndex + 1);
                        
                        let valueClass = "text-yellow-200/80";
                        if (/\b(VALID|OK|PASS|SUCCESS|CONNECTED|READY|ENABLED)\b/.test(value)) {
                          valueClass = "text-green-400 font-bold";
                        } else if (/\b(FAILED|ERROR|DISABLED)\b/.test(value)) {
                          valueClass = "text-red-400 font-bold";
                        } else if (/\b(\[ACCESS GRANTED\])\b/.test(value)) {
                          valueClass = "text-emerald-400 font-bold";
                        }

                        content = (
                          <>
                            <span className="text-blue-400/90">{key}:</span>
                            <span className={valueClass}>{value}</span>
                          </>
                        );
                      } else {
                        content = <span className="text-[#e4e3e0]/60">{line}</span>;
                      }

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {content}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-[#e4e3e0]/40">Ready for input. Enter a code above to simulate its execution.</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#e4e3e0]/5 border border-[#e4e3e0]/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#e4e3e0]/60" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Troubleshooting Guides</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              {TROUBLESHOOTING_GUIDES.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-2xl border transition-all text-left group",
                    selectedGuide?.id === guide.id
                      ? "bg-[#e4e3e0] text-[#0a0a0a] border-[#e4e3e0]"
                      : "bg-[#e4e3e0]/5 border-[#e4e3e0]/10 hover:border-[#e4e3e0]/30"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      selectedGuide?.id === guide.id ? "bg-[#0a0a0a]/10" : "bg-[#e4e3e0]/5"
                    )}>
                      {guide.icon === "RefreshCw" && <RefreshCw className="w-5 h-5" />}
                      {guide.icon === "ShieldCheck" && <ShieldCheck className="w-5 h-5" />}
                      {guide.icon === "Trash2" && <Trash2 className="w-5 h-5" />}
                      {guide.icon === "Terminal" && <Terminal className="w-5 h-5" />}
                      {guide.icon === "Unlock" && <Unlock className="w-5 h-5" />}
                      {guide.icon === "Cpu" && <Cpu className="w-5 h-5" />}
                      {guide.icon === "Zap" && <Zap className="w-5 h-5" />}
                    </div>
                    <span className="font-bold text-sm">{guide.title}</span>
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 transition-transform",
                    selectedGuide?.id === guide.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"
                  )} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selectedGuide ? (
                  <motion.div
                    key={selectedGuide.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-[#e4e3e0]/5 border border-[#e4e3e0]/10 rounded-3xl p-8 h-full"
                  >
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-12 h-12 rounded-2xl bg-[#e4e3e0]/5 flex items-center justify-center">
                        {selectedGuide.icon === "RefreshCw" && <RefreshCw className="w-6 h-6" />}
                        {selectedGuide.icon === "ShieldCheck" && <ShieldCheck className="w-6 h-6" />}
                        {selectedGuide.icon === "Trash2" && <Trash2 className="w-6 h-6" />}
                        {selectedGuide.icon === "Terminal" && <Terminal className="w-6 h-6" />}
                        {selectedGuide.icon === "Unlock" && <Unlock className="w-6 h-6" />}
                        {selectedGuide.icon === "Cpu" && <Cpu className="w-6 h-6" />}
                        {selectedGuide.icon === "Zap" && <Zap className="w-6 h-6" />}
                      </div>
                      <h3 className="text-2xl font-bold">{selectedGuide.title}</h3>
                    </div>

                    <div className="space-y-6">
                      {selectedGuide.steps.map((step, index) => (
                        <div key={index} className="flex gap-6 group">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-[#e4e3e0]/20 flex items-center justify-center text-xs font-mono font-bold shrink-0 group-hover:border-[#e4e3e0]/60 transition-colors">
                              {index + 1}
                            </div>
                            {index !== selectedGuide.steps.length - 1 && (
                              <div className="w-px h-full bg-[#e4e3e0]/10" />
                            )}
                          </div>
                          <p className="text-[#e4e3e0]/70 leading-relaxed pt-1 group-hover:text-[#e4e3e0] transition-colors">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-12 border border-dashed border-[#e4e3e0]/10 rounded-3xl text-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-[#e4e3e0]/5 flex items-center justify-center">
                      <Info className="w-8 h-8 text-[#e4e3e0]/20" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-lg">Select a guide to begin</p>
                      <p className="text-sm text-[#e4e3e0]/40 max-w-xs mx-auto">
                        Choose a troubleshooting procedure from the left to view detailed step-by-step instructions.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <footer className="pt-12 border-t border-[#e4e3e0]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40">Disclaimer</h4>
              <p className="text-xs text-[#e4e3e0]/30 leading-relaxed">
                Use these codes and procedures at your own risk. Some codes may perform factory resets or wipe data without confirmation. Always backup your data before attempting advanced procedures.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40">Device Specs</h4>
              <ul className="text-xs text-[#e4e3e0]/40 space-y-2 font-mono">
                <li>Model: Moto G Pure (2021)</li>
                <li>SKU: XT2163DL</li>
                <li>OS: Android 11+</li>
                <li>Chipset: MediaTek Helio G25</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40">Resources</h4>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="text-xs text-[#e4e3e0]/40 hover:text-[#e4e3e0] transition-colors underline underline-offset-4">User Manual</a>
                <a href="#" className="text-xs text-[#e4e3e0]/40 hover:text-[#e4e3e0] transition-colors underline underline-offset-4">Firmware Updates</a>
                <a href="#" className="text-xs text-[#e4e3e0]/40 hover:text-[#e4e3e0] transition-colors underline underline-offset-4">Community Forums</a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#e4e3e0]/5">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-20">
              © 2026 Mobile Toolbox // Diagnostic Environment
            </p>
            <div className="flex items-center gap-6 opacity-20">
              <Smartphone className="w-4 h-4" />
              <ShieldCheck className="w-4 h-4" />
              <Terminal className="w-4 h-4" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
