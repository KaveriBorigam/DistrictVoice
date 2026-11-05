import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  Sparkles, 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  Send, 
  RefreshCw, 
  Layers, 
  Check, 
  X, 
  Upload, 
  PhoneCall, 
  Activity, 
  FileText, 
  Calendar,
  AlertTriangle,
  Compass,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';

// --- INITIAL MOCK DATA (Nirmal District, Telangana) ---
const INITIAL_GRIEVANCES = [
  {
    id: "NML-2026-0841",
    title: "Broken drinking water pipeline causing road flood",
    description: "Main supply pipeline burst near Gandhi Chowk, Nirmal town. Clean water is spilling continuously on Mancherial road creating a sinkhole hazard.",
    category: "Water Supply & Sanitation (RWS)",
    mandal: "Nirmal Urban",
    village: "Gandhi Chowk, Ward 7",
    priority: "High",
    status: "In Progress", // Submitted, Assigned, In Progress, Pending Verification, Resolved
    submittedDate: "2026-10-30",
    citizenName: "K. Rajeshwar Rao",
    citizenPhone: "+91 98480 12345",
    assignedOfficer: "S. Anjaneyulu (AEE, RWS)",
    assignedWorker: "Mahesh Naik (Lineman)",
    workerNotes: "Excavated leak site. Cast-iron coupling arrived from district store. Welding underway.",
    beforePhoto: "https://images.unsplash.com/photo-1541888946425-d0fbb18f156b?w=600&auto=format&fit=crop&q=80",
    afterPhoto: null,
    coordinates: { lat: 19.0964, lng: 78.3438 },
    aiConfidence: 94,
    aiDuplicateRisk: "Low (12% similarity)"
  },
  {
    id: "NML-2026-0792",
    title: "TSSPDCL Transformer fire hazard and continuous sparks",
    description: "33kV distribution box sparking in heavy winds near RGUKT Basar Road intersection, Bhainsa. Power cuts frequently and sparks fall on dried grass.",
    category: "Electricity (TSSPDCL)",
    mandal: "Bhainsa",
    village: "Basar Cross Road, Bhainsa",
    priority: "Critical",
    status: "Pending Verification",
    submittedDate: "2026-10-28",
    citizenName: "Md. Farooq Ahmed",
    citizenPhone: "+91 94401 54321",
    assignedOfficer: "K. Venkatesh (DE, TSSPDCL)",
    assignedWorker: "Ramesh Goud (Field Technician)",
    workerNotes: "Replaced blown AB switch fuse and insulated tree branches clear of line. Safety test cleared.",
    beforePhoto: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&auto=format&fit=crop&q=80",
    coordinates: { lat: 19.1001, lng: 77.9622 },
    aiConfidence: 97,
    aiDuplicateRisk: "None"
  },
  {
    id: "NML-2026-0654",
    title: "Deep potholes on Khanapur to Kaddam bridge stretch",
    description: "Dangerous potholes spanning over 200m on NH bypass. Two two-wheeler skids observed yesterday night.",
    category: "Roads & Buildings (R&B)",
    mandal: "Khanapur",
    village: "Kaddam Ghat Road",
    priority: "High",
    status: "Resolved",
    submittedDate: "2026-10-22",
    citizenName: "B. Sunitha Devi",
    citizenPhone: "+91 91210 98765",
    assignedOfficer: "P. Ravinder (EE, R&B)",
    assignedWorker: "Ch. Laxman (Contract Foreman)",
    workerNotes: "Cold mix asphalt patching and roller compaction completed over 220 meters.",
    beforePhoto: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&auto=format&fit=crop&q=80",
    coordinates: { lat: 19.0345, lng: 78.6534 },
    aiConfidence: 91,
    aiDuplicateRisk: "None"
  },
  {
    id: "NML-2026-0912",
    title: "Uncollected municipal garbage pile near weekly Rythu Bazar",
    description: "Bio-waste piled for past 4 days creating foul odor and stray cattle congestion in Mudhole main street.",
    category: "Municipal Sanitation",
    mandal: "Mudhole",
    village: "Old Bus Stand, Mudhole",
    priority: "Medium",
    status: "Submitted",
    submittedDate: "2026-11-01",
    citizenName: "V. Sai Kumar",
    citizenPhone: "+91 83329 11223",
    assignedOfficer: "Unassigned",
    assignedWorker: "Unassigned",
    workerNotes: "",
    beforePhoto: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80",
    afterPhoto: null,
    coordinates: { lat: 18.9822, lng: 77.8921 },
    aiConfidence: 89,
    aiDuplicateRisk: "Possible Duplicate with NML-2026-0908 (78% match)"
  },
  {
    id: "NML-2026-0933",
    title: "Clogged drainage canal overflowing onto agricultural fields",
    description: "Silt blockage in minor irrigation canal causing tail-end cotton fields to submerge near Mamda.",
    category: "Irrigation & Agriculture",
    mandal: "Mamda",
    village: "Ponkal Revenue Shivar",
    priority: "Medium",
    status: "Assigned",
    submittedDate: "2026-11-03",
    citizenName: "G. Mallaiah",
    citizenPhone: "+91 97010 44556",
    assignedOfficer: "D. Srinivas (AEE, Irrigation)",
    assignedWorker: "G. Gangadhar (Canal Inspector)",
    workerNotes: "JCB excavator requested for desilting operation scheduled for tomorrow morning.",
    beforePhoto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
    afterPhoto: null,
    coordinates: { lat: 19.1234, lng: 78.4321 },
    aiConfidence: 93,
    aiDuplicateRisk: "Low"
  }
];

const MANDALS_NIRMAL = [
  "Nirmal Urban", "Nirmal Rural", "Bhainsa", "Khanapur", 
  "Mudhole", "Mamda", "Kaddampeddur", "Dasturabad", 
  "Laxmanchanda", "Sarangapur", "Soan", "Kubeer", "Tanur", "Basar"
];

const DEPARTMENTS = [
  "Water Supply & Sanitation (RWS)",
  "Electricity (TSSPDCL)",
  "Roads & Buildings (R&B)",
  "Municipal Sanitation",
  "Panchayat Raj & Rural Development",
  "Irrigation & Agriculture",
  "Revenue & Land Administration"
];

const FIELD_WORKERS = [
  { id: "FW-1", name: "Mahesh Naik", dept: "Water Supply & Sanitation (RWS)", phone: "+91 98491 11221", activeTasks: 2 },
  { id: "FW-2", name: "Ramesh Goud", dept: "Electricity (TSSPDCL)", phone: "+91 94402 33441", activeTasks: 1 },
  { id: "FW-3", name: "Ch. Laxman", dept: "Roads & Buildings (R&B)", phone: "+91 91211 44552", activeTasks: 0 },
  { id: "FW-4", name: "G. Gangadhar", dept: "Irrigation & Agriculture", phone: "+91 97012 88990", activeTasks: 1 },
  { id: "FW-5", name: "M. Swamy", dept: "Municipal Sanitation", phone: "+91 83321 00998", activeTasks: 3 }
];

export default function App() {
  // Navigation & Role State
  const [activeRole, setActiveRole] = useState("citizen"); // citizen | officer | worker | admin
  const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [filterMandal, setFilterMandal] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Chatbot State (Nirmal Mitra AI)
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Namaskaram! I am **Nirmal Mitra AI**, your digital grievance assistant for Nirmal District. You can check your complaint status, understand departmental contacts, or get help filing a grievance. How can I assist you today?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Citizen Submission Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newMandal, setNewMandal] = useState("Nirmal Urban");
  const [newVillage, setNewVillage] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [citizenName, setCitizenName] = useState("");
  const [citizenPhone, setCitizenPhone] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [trackingIdInput, setTrackingIdInput] = useState("");
  const [trackedGrievance, setTrackedGrievance] = useState(null);

  // Field Worker proof submission modal state
  const [workerModalGrievance, setWorkerModalGrievance] = useState(null);
  const [workerWorkNotes, setWorkerWorkNotes] = useState("");
  const [workerAfterPhoto, setWorkerAfterPhoto] = useState(null);

  // Officer Verification modal state
  const [verifyModalGrievance, setVerifyModalGrievance] = useState(null);
  const [officerRejectionReason, setOfficerRejectionReason] = useState("");

  // AI Categorizer trigger on typing description
  useEffect(() => {
    if (newDesc.trim().length > 12) {
      setIsAnalyzingAi(true);
      const timer = setTimeout(() => {
        const text = (newTitle + " " + newDesc).toLowerCase();
        let cat = "Panchayat Raj & Rural Development";
        let prio = "Medium";
        let dup = "No duplicate complaints detected in this mandal.";
        let matchScore = 88;

        if (text.includes("water") || text.includes("pipe") || text.includes("leak") || text.includes("borewell") || text.includes("drinking")) {
          cat = "Water Supply & Sanitation (RWS)";
          prio = text.includes("burst") || text.includes("overflow") ? "High" : "Medium";
          matchScore = 95;
        } else if (text.includes("wire") || text.includes("power") || text.includes("transformer") || text.includes("spark") || text.includes("current")) {
          cat = "Electricity (TSSPDCL)";
          prio = "Critical";
          matchScore = 98;
        } else if (text.includes("road") || text.includes("pothole") || text.includes("tar") || text.includes("bridge") || text.includes("highway")) {
          cat = "Roads & Buildings (R&B)";
          prio = "High";
          matchScore = 91;
        } else if (text.includes("garbage") || text.includes("drain") || text.includes("waste") || text.includes("smell") || text.includes("sanitation")) {
          cat = "Municipal Sanitation";
          prio = "Medium";
          matchScore = 89;
          if (text.includes("bazar") || text.includes("market")) {
            dup = "Warning: Similar grievance NML-2026-0912 already reported in this mandal (72% text match).";
          }
        }

        setAiSuggestions({
          category: cat,
          priority: prio,
          confidence: matchScore,
          duplicateNote: dup,
          summary: `Identified domain issue requiring ${cat} intervention with estimated resolution SLA of ${prio === "Critical" ? "24 hours" : prio === "High" ? "48 hours" : "4 days"}.`
        });
        setNewCategory(cat);
        setNewPriority(prio);
        setIsAnalyzingAi(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setAiSuggestions(null);
    }
  }, [newDesc, newTitle]);

  // Handle Citizen Submit
  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newVillage || !citizenName) {
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newGrievance = {
      id: `NML-2026-${randomNum}`,
      title: newTitle,
      description: newDesc,
      category: newCategory || "Panchayat Raj & Rural Development",
      mandal: newMandal,
      village: newVillage,
      priority: newPriority,
      status: "Submitted",
      submittedDate: new Date().toISOString().split("T")[0],
      citizenName: citizenName,
      citizenPhone: citizenPhone || "+91 99887 76655",
      assignedOfficer: "Pending Triage",
      assignedWorker: "Unassigned",
      workerNotes: "",
      beforePhoto: photoPreview || "https://images.unsplash.com/photo-1541888946425-d0fbb18f156b?w=600&auto=format&fit=crop&q=80",
      afterPhoto: null,
      coordinates: { lat: 19.0964, lng: 78.3438 },
      aiConfidence: aiSuggestions ? aiSuggestions.confidence : 85,
      aiDuplicateRisk: aiSuggestions ? aiSuggestions.duplicateNote : "None"
    };

    setGrievances([newGrievance, ...grievances]);
    setTrackedGrievance(newGrievance);
    // Reset Form
    setNewTitle("");
    setNewDesc("");
    setNewVillage("");
    setPhotoPreview(null);
    setAiSuggestions(null);
  };

  // Chatbot logic
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    const newHistory = [...chatMessages, { sender: "user", text: userMsg }];
    setChatMessages(newHistory);
    setChatInput("");

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "I understand you need assistance with civic issues in Nirmal District. Could you specify your Grievance ID or the Mandal area?";

      if (lower.includes("status") || lower.includes("track")) {
        const found = grievances.find(g => lower.includes(g.id.toLowerCase()));
        if (found) {
          reply = `Complaint **${found.id}** (${found.title}) is currently in **${found.status}** state. Assigned department: ${found.category}. Assigned worker: ${found.assignedWorker}.`;
        } else {
          reply = "To check your grievance status, please provide your 12-digit complaint ID (e.g., 'NML-2026-0841') or view it in the Tracking tab above.";
        }
      } else if (lower.includes("contact") || lower.includes("collector") || lower.includes("office") || lower.includes("helpline")) {
        reply = "📞 **Nirmal District Collectorate Civic Helpline**: 08734-222123 | Toll Free: 1800-425-1110. Collectorate Complex, Mancherial Road, Nirmal. For electricity emergencies call 1912 (TSSPDCL).";
      } else if (lower.includes("water") || lower.includes("pipeline") || lower.includes("rws")) {
        reply = "For drinking water issues in rural mandals, Rural Water Supply (RWS) office is at Collectorate Complex. In urban wards, Nirmal Municipality engineers inspect daily between 9 AM and 11 AM.";
      } else if (lower.includes("how") || lower.includes("file") || lower.includes("submit")) {
        reply = "To register a grievance: 1. Click 'File Grievance' tab. 2. Select your Mandal and Village. 3. Enter issue description & upload a site photo. Our AI will automatically tag the department and prioritize it.";
      } else if (lower.includes("telugu") || lower.includes("బాసర") || lower.includes("నిర్మల్")) {
        reply = "నమస్కారం! నిర్మల్ జిల్లా ప్రజావాణి పోర్టల్ ద్వారా మీ సమస్యను నమోదు చేయవచ్చు. నీటి సరఫరా, విద్యుత్, రోడ్లు మరియు శానిటేషన్ సమస్యలను 48 గంటల్లోగా అధికారులు పరిష్కరిస్తారు.";
      }

      setChatMessages([...newHistory, { sender: "bot", text: reply }]);
    }, 500);
  };

  // Filtered grievances for dashboard
  const filteredGrievances = useMemo(() => {
    return grievances.filter(g => {
      const matchMandal = filterMandal === "All" || g.mandal === filterMandal;
      const matchStatus = filterStatus === "All" || g.status === filterStatus;
      const matchQuery = !searchQuery || 
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        g.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.village.toLowerCase().includes(searchQuery.toLowerCase());
      return matchMandal && matchStatus && matchQuery;
    });
  }, [grievances, filterMandal, filterStatus, searchQuery]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = grievances.length;
    const resolved = grievances.filter(g => g.status === "Resolved").length;
    const inProgress = grievances.filter(g => g.status === "In Progress" || g.status === "Assigned").length;
    const pendingVerification = grievances.filter(g => g.status === "Pending Verification").length;
    const critical = grievances.filter(g => g.priority === "Critical" && g.status !== "Resolved").length;
    return {
      total,
      resolved,
      inProgress,
      pendingVerification,
      critical,
      resolutionRate: Math.round((resolved / (total || 1)) * 100)
    };
  }, [grievances]);

  // Mock Photo selector helper
  const handlePhotoUploadSim = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Banner / Header */}
      <header className="bg-slate-800/90 backdrop-blur border-b border-slate-700/80 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Region Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white font-bold text-xl ring-2 ring-emerald-400/30">
              ద్వ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  DISTRICT VOICE
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Nirmal District, TG
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Citizen Grievance Redressal & Field Accountability Engine • Govt of Telangana
              </p>
            </div>
          </div>

          {/* Role Switcher Toolbar */}
          <div className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-700/70">
            <span className="text-xs font-medium text-slate-400 px-2 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Role:
            </span>
            <div className="flex gap-1">
              {[
                { id: "citizen", label: "Citizen", icon: Users },
                { id: "officer", label: "Dept Officer", icon: ShieldCheck },
                { id: "worker", label: "Field Worker", icon: Truck },
                { id: "admin", label: "District Admin", icon: BarChart3 }
              ].map(role => {
                const Icon = role.icon;
                const isActive = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isActive 
                        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/50" 
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* ============================================================== */}
        {/* ROLE 1: CITIZEN VIEW                                          */}
        {/* ============================================================== */}
        {activeRole === "citizen" && (
          <div className="space-y-6">
            {/* Citizen Welcome Card */}
            <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/20 to-slate-800 border border-emerald-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Nirmal Prajavani • Citizen Portal
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                    Report municipal, electricity, rural water or road infrastructure issues directly to Nirmal District authorities. Our AI automatically classifies, tags priority, and checks for duplication.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300">
                    <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Active SLAs</span>
                    <span className="font-semibold text-emerald-400">92.4% Resolved on time</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Grievance Submission Form */}
              <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Plus className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-white text-base">File a New Grievance</h3>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700">
                    Step 1 of 1 • Fast Filing
                  </span>
                </div>

                <form onSubmit={handleCitizenSubmit} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Issue Summary / Headline *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Leaking drinking water pipeline near Market Road"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Description with AI Assistant trigger */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-slate-300">
                        Detailed Description *
                      </label>
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3 animate-spin text-emerald-400" /> AI Auto-Categorization Active
                      </span>
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the issue, landmark, hazard level, or since when it has been occurring..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  {/* AI Recommendation Badge (Dynamic) */}
                  {isAnalyzingAi && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300 animate-pulse">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Analyzing natural language keywords & matching Nirmal departmental mandates...
                    </div>
                  )}

                  {aiSuggestions && !isAnalyzingAi && (
                    <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> AI Recommendation Engine
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                          {aiSuggestions.confidence}% Confidence
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-300">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Suggested Dept:</span>
                          <span className="font-semibold text-slate-100">{aiSuggestions.category}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Recommended Priority:</span>
                          <span className={`font-semibold ${aiSuggestions.priority === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>
                            {aiSuggestions.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-1.5">
                        {aiSuggestions.duplicateNote}
                      </p>
                    </div>
                  )}

                  {/* Mandal & Village Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Mandal (Nirmal District) *
                      </label>
                      <select
                        value={newMandal}
                        onChange={(e) => setNewMandal(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {MANDALS_NIRMAL.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Village / Ward / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Ward 4 or RGUKT Gate"
                        value={newVillage}
                        onChange={(e) => setNewVillage(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Citizen Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., K. Suresh"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Mobile Number (For SMS updates) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g., 9848012345"
                        value={citizenPhone}
                        onChange={(e) => setCitizenPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Photo Upload Attachment */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Upload Site Photo (Geo-tagged evidence)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer bg-slate-900 hover:bg-slate-750 border border-dashed border-slate-600 rounded-xl px-4 py-3 flex items-center justify-center gap-2 text-xs text-slate-300 hover:text-white transition w-full">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>{photoPreview ? "Change Photo" : "Upload Image or Take Photo"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUploadSim}
                        />
                      </label>
                    </div>
                    {photoPreview && (
                      <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-emerald-500/40">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute top-1 right-1 bg-red-600/80 p-0.5 rounded-full text-white hover:bg-red-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 text-sm mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Grievance to Nirmal District Portal
                  </button>
                </form>
              </div>

              {/* Citizen Tracking & Status Timeline */}
              <div className="lg:col-span-5 space-y-5">
                {/* Track Grievance Widget */}
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
                  <h3 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-400" /> Track Grievance Status
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., NML-2026-0841"
                      value={trackingIdInput}
                      onChange={(e) => setTrackingIdInput(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs flex-1 text-slate-200 uppercase"
                    />
                    <button
                      onClick={() => {
                        const found = grievances.find(g => g.id.toLowerCase() === trackingIdInput.trim().toLowerCase());
                        if (found) {
                          setTrackedGrievance(found);
                        }
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-xs font-medium"
                    >
                      Track
                    </button>
                  </div>

                  {/* Active Tracked Grievance Details */}
                  {trackedGrievance ? (
                    <div className="mt-4 bg-slate-900/90 rounded-xl p-4 border border-slate-700/80 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[11px] font-mono text-emerald-400">{trackedGrievance.id}</span>
                          <h4 className="text-sm font-semibold text-slate-100">{trackedGrievance.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{trackedGrievance.village}, {trackedGrievance.mandal}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                          trackedGrievance.status === 'Resolved' 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                            : trackedGrievance.status === 'Pending Verification'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          {trackedGrievance.status}
                        </span>
                      </div>

                      {/* Interactive Stepper */}
                      <div className="py-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span>Workflow Timeline</span>
                          <span className="text-emerald-400 font-medium">Assigned to: {trackedGrievance.assignedWorker}</span>
                        </div>
                        <div className="relative flex items-center justify-between w-full pt-3">
                          <div className="absolute top-5 left-2 right-2 h-0.5 bg-slate-700 z-0"></div>
                          {[
                            { step: "Submitted", done: true },
                            { step: "Assigned", done: trackedGrievance.status !== "Submitted" },
                            { step: "In Progress", done: ["In Progress", "Pending Verification", "Resolved"].includes(trackedGrievance.status) },
                            { step: "Resolved", done: trackedGrievance.status === "Resolved" }
                          ].map((s, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                s.done ? 'bg-emerald-500 text-slate-900 shadow-md shadow-emerald-500/40' : 'bg-slate-700 text-slate-400'
                              }`}>
                                {s.done ? "✓" : idx + 1}
                              </div>
                              <span className="text-[10px] text-slate-400 mt-1">{s.step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {trackedGrievance.workerNotes && (
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                          <span className="text-slate-400 block text-[10px] font-medium">Field Worker Status Update:</span>
                          <p className="text-slate-200 italic mt-0.5">"{trackedGrievance.workerNotes}"</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 text-xs text-slate-400 text-center py-4 border border-dashed border-slate-700/60 rounded-xl">
                      Select or search a complaint above or click one from recent filings below.
                    </div>
                  )}
                </div>

                {/* Recent Complaints from your Mandal */}
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
                  <h3 className="font-semibold text-white text-sm mb-3">Recently Reported in Nirmal</h3>
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {grievances.slice(0, 4).map(g => (
                      <div
                        key={g.id}
                        onClick={() => {
                          setTrackedGrievance(g);
                          setTrackingIdInput(g.id);
                        }}
                        className="p-2.5 bg-slate-900/70 hover:bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition flex items-center justify-between"
                      >
                        <div className="truncate pr-2">
                          <p className="text-xs font-medium text-slate-200 truncate">{g.title}</p>
                          <span className="text-[10px] text-slate-400">{g.mandal} • {g.submittedDate}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                          {g.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ROLE 2: DEPARTMENT OFFICER VIEW                                */}
        {/* ============================================================== */}
        {activeRole === "officer" && (
          <div className="space-y-6">
            {/* Officer Header Info */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-bold text-white">Department Officer Portal • Nirmal Division</h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Responsible Officer: <span className="text-slate-200 font-medium">S. Anjaneyulu (AEE, RWS / Municipal Triage Officer)</span>
                </p>
              </div>

              {/* Triage Summary Badges */}
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-3 py-1.5 rounded-xl font-medium">
                  {grievances.filter(g => g.status === 'Submitted').length} Pending Triage
                </span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-3 py-1.5 rounded-xl font-medium">
                  {grievances.filter(g => g.status === 'Pending Verification').length} Awaiting Verification
                </span>
              </div>
            </div>

            {/* Filter and Control Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
              <div className="relative md:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by ID, keyword, or village..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200"
                />
              </div>

              <select
                value={filterMandal}
                onChange={(e) => setFilterMandal(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
              >
                <option value="All">All Mandals</option>
                {MANDALS_NIRMAL.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted (Needs Assignment)</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Verification">Pending Verification</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Grievance Management Table */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">Grievance ID & Title</th>
                      <th className="py-3 px-4">Mandal & Location</th>
                      <th className="py-3 px-4">AI Triage / Priority</th>
                      <th className="py-3 px-4">Assigned Worker</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {filteredGrievances.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-750/50 transition">
                        <td className="py-3 px-4">
                          <span className="font-mono text-[11px] text-emerald-400 font-semibold">{g.id}</span>
                          <p className="font-medium text-slate-100 max-w-xs truncate">{g.title}</p>
                          <span className="text-[10px] text-slate-400">{g.category}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-200">{g.mandal}</div>
                          <div className="text-[10px] text-slate-400">{g.village}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              g.priority === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                              g.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                              {g.priority}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-medium">
                              ★ {g.aiConfidence}% AI
                            </span>
                          </div>
                          {g.aiDuplicateRisk && g.aiDuplicateRisk.includes("Similar") && (
                            <span className="text-[9px] text-red-400 block mt-0.5">⚠️ Duplicate flagged</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {g.assignedWorker !== "Unassigned" ? (
                            <div className="flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-slate-200 font-medium">{g.assignedWorker}</span>
                            </div>
                          ) : (
                            <select
                              onChange={(e) => {
                                const selectedWorkerName = e.target.value;
                                if (!selectedWorkerName) return;
                                setGrievances(prev => prev.map(item => {
                                  if (item.id === g.id) {
                                    return {
                                      ...item,
                                      assignedWorker: selectedWorkerName,
                                      status: "Assigned"
                                    };
                                  }
                                  return item;
                                }));
                              }}
                              className="bg-slate-900 border border-emerald-500/50 text-emerald-300 rounded px-2 py-1 text-[11px] focus:outline-none"
                              defaultValue=""
                            >
                              <option value="" disabled>Assign Worker</option>
                              {FIELD_WORKERS.map(w => (
                                <option key={w.id} value={w.name}>{w.name} ({w.activeTasks} tasks)</option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            g.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                            g.status === 'Pending Verification' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse' :
                            g.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                            'bg-slate-700/60 text-slate-300 border-slate-600'
                          }`}>
                            {g.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {g.status === "Pending Verification" ? (
                            <button
                              onClick={() => setVerifyModalGrievance(g)}
                              className="bg-purple-600 hover:bg-purple-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1 ml-auto"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Verify Work
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedGrievance(g)}
                              className="text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-xs border border-slate-700"
                            >
                              Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ROLE 3: FIELD WORKER VIEW                                     */}
        {/* ============================================================== */}
        {activeRole === "worker" && (
          <div className="space-y-6">
            {/* Field Worker Header */}
            <div className="bg-gradient-to-r from-blue-900/30 to-slate-800 border border-blue-500/30 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Field Task Dispatch • Nirmal Circle</h2>
                  <p className="text-xs text-slate-300">
                    Logged in as: <span className="font-semibold text-blue-300">Mahesh Naik</span> (Water Works Lineman) • Vehicle ID: AP-01-T-4421
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300">
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Assigned Queue</span>
                <span className="font-bold text-emerald-400">
                  {grievances.filter(g => g.assignedWorker.includes("Mahesh") || g.status === "Assigned" || g.status === "In Progress").length} Tasks
                </span>
              </div>
            </div>

            {/* Task Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {grievances
                .filter(g => g.status !== "Resolved")
                .map((g) => (
                  <div 
                    key={g.id} 
                    className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-600 transition"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-emerald-400 font-semibold">{g.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          g.priority === "Critical" ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}>
                          {g.priority} Priority
                        </span>
                      </div>

                      <h3 className="font-semibold text-white text-sm leading-tight mb-2">{g.title}</h3>
                      <p className="text-xs text-slate-300 mb-3 line-clamp-2">{g.description}</p>

                      {/* Location & Citizen contact */}
                      <div className="space-y-1.5 text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800 mb-4">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-medium truncate">{g.village}, {g.mandal}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Citizen: {g.citizenName} ({g.citizenPhone})</span>
                        </div>
                      </div>

                      {/* Before Evidence Thumbnail */}
                      {g.beforePhoto && (
                        <div className="mb-4">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Citizen Reported Photo:</span>
                          <div className="h-28 rounded-xl overflow-hidden border border-slate-700">
                            <img src={g.beforePhoto} alt="Site" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2 border-t border-slate-700/80">
                      <div className="flex items-center gap-2">
                        {g.status === "Assigned" && (
                          <button
                            onClick={() => {
                              setGrievances(prev => prev.map(item => item.id === g.id ? { ...item, status: "In Progress" } : item));
                            }}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                          >
                            <Truck className="w-3.5 h-3.5" /> Start Trip / In Progress
                          </button>
                        )}

                        {g.status === "In Progress" && (
                          <button
                            onClick={() => {
                              setWorkerModalGrievance(g);
                              setWorkerWorkNotes("");
                              setWorkerAfterPhoto(null);
                            }}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                          >
                            <Upload className="w-3.5 h-3.5" /> Upload Resolution Proof
                          </button>
                        )}

                        {g.status === "Pending Verification" && (
                          <div className="w-full text-center py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-xs text-purple-300 font-medium">
                            Awaiting Officer Sign-off
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ROLE 4: DISTRICT ADMINISTRATOR VIEW                            */}
        {/* ============================================================== */}
        {activeRole === "admin" && (
          <div className="space-y-6">
            {/* Collectorate KPI Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { label: "Total Registered", val: stats.total, color: "text-white", bg: "bg-slate-800" },
                { label: "Resolved Grievances", val: stats.resolved, color: "text-emerald-400", bg: "bg-emerald-950/20" },
                { label: "Active in Field", val: stats.inProgress, color: "text-blue-400", bg: "bg-blue-950/20" },
                { label: "Pending Verification", val: stats.pendingVerification, color: "text-purple-400", bg: "bg-purple-950/20" },
                { label: "Resolution SLA Rate", val: `${stats.resolutionRate}%`, color: "text-teal-400", bg: "bg-teal-950/20" }
              ].map((kpi, idx) => (
                <div key={idx} className={`${kpi.bg} border border-slate-700/80 p-4 rounded-2xl shadow-lg`}>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{kpi.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.val}</p>
                </div>
              ))}
            </div>

            {/* Analytics & Geographic Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Mandal Hotspot Distribution Chart */}
              <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white text-sm">Mandal-wise Complaint Volume</h3>
                    <p className="text-xs text-slate-400">Grievances distribution across Nirmal District administrative mandals</p>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Live Telemetry
                  </span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { mandal: "Nirmal", count: 8 },
                        { mandal: "Bhainsa", count: 6 },
                        { mandal: "Khanapur", count: 5 },
                        { mandal: "Mudhole", count: 3 },
                        { mandal: "Mamda", count: 2 },
                        { mandal: "Basar", count: 4 },
                        { mandal: "Kaddam", count: 2 }
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="mandal" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "0.75rem", fontSize: "12px" }} 
                      />
                      <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Department Resolution Share */}
              <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white text-sm">Department Workload</h3>
                    <p className="text-xs text-slate-400">Share of incoming civic grievances</p>
                  </div>
                </div>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Water (RWS)", value: 35 },
                          { name: "Electricity (TSSPDCL)", value: 25 },
                          { name: "Roads (R&B)", value: 20 },
                          { name: "Sanitation", value: 15 },
                          { name: "Others", value: 5 }
                        ]}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#3b82f6" />
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#64748b" />
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "0.75rem", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Water (35%)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Electricity (25%)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Roads (20%)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Sanitation (15%)</span>
                </div>
              </div>
            </div>

            {/* AI District Insights & Early Warning Alerts */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="font-semibold text-white text-sm">Nirmal District AI Predictive Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-900/90 border border-amber-500/30 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" /> High Pipeline Fracture Cluster
                  </div>
                  <p className="text-slate-300">
                    3 drinking water pipeline complaints clustered along Gandhi Chowk to Mancherial Road within 48h. Suggests main feeder valve pressure anomaly.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-900/90 border border-emerald-500/30 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Quickest Redressal Mandal
                  </div>
                  <p className="text-slate-300">
                    Khanapur Mandal logged an average turnaround time of 19.4 hours for R&B pothole complaints this week, 32% faster than district benchmark.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-900/90 border border-blue-500/30 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                    <Layers className="w-3.5 h-3.5" /> Seasonal Monsoonal Pre-alert
                  </div>
                  <p className="text-slate-300">
                    Kaddam river tail-end drainage complaints historically surge by 40% next week. Pre-positioning 2 excavator squads at Mamda and Khanapur recommended.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL 1: FIELD WORKER EVIDENCE UPLOAD MODAL                    */}
      {/* ============================================================== */}
      {workerModalGrievance && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="font-bold text-white text-base">Submit Work Completion Proof</h3>
              <button 
                onClick={() => setWorkerModalGrievance(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p><strong className="text-slate-200">Grievance:</strong> {workerModalGrievance.title}</p>
              <p><strong className="text-slate-200">Location:</strong> {workerModalGrievance.village}, {workerModalGrievance.mandal}</p>
            </div>

            {/* Upload After Photo */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Upload Resolved Work Site Photo (Evidence) *
              </label>
              <label className="cursor-pointer bg-slate-900 hover:bg-slate-750 border border-dashed border-slate-600 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-xs text-slate-300 hover:text-white transition">
                <Upload className="w-6 h-6 text-emerald-400" />
                <span>Click to attach photo of completed repair</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setWorkerAfterPhoto(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              {workerAfterPhoto && (
                <div className="mt-2 h-28 rounded-xl overflow-hidden border border-emerald-500">
                  <img src={workerAfterPhoto} alt="After work" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Work Notes */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Work Action Notes / Parts Replaced *
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g., Repaired 63mm PVC pipeline joint, tested water flow with normal pressure, no leakages found."
                value={workerWorkNotes}
                onChange={(e) => setWorkerWorkNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWorkerModalGrievance(null)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 py-2.5 rounded-xl text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setGrievances(prev => prev.map(item => {
                    if (item.id === workerModalGrievance.id) {
                      return {
                        ...item,
                        status: "Pending Verification",
                        workerNotes: workerWorkNotes || "Field repair completed as per departmental standard.",
                        afterPhoto: workerAfterPhoto || "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&auto=format&fit=crop&q=80"
                      };
                    }
                    return item;
                  }));
                  setWorkerModalGrievance(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/30"
              >
                Submit for Officer Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: OFFICER WORK VERIFICATION MODAL                       */}
      {/* ============================================================== */}
      {verifyModalGrievance && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Officer Verification & Quality Audit</h3>
              </div>
              <button 
                onClick={() => setVerifyModalGrievance(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="font-mono text-xs text-emerald-400">{verifyModalGrievance.id}</span>
              <h4 className="font-semibold text-white text-sm">{verifyModalGrievance.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{verifyModalGrievance.description}</p>
            </div>

            {/* Before vs After Photo Proof Comparison */}
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                Evidence Comparison (Reported vs Resolved)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-400 font-medium">BEFORE (Citizen Photo)</span>
                  <div className="h-36 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img 
                      src={verifyModalGrievance.beforePhoto || "https://images.unsplash.com/photo-1541888946425-d0fbb18f156b?w=600&auto=format&fit=crop&q=80"} 
                      alt="Before" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-400 font-medium">AFTER (Worker Proof)</span>
                  <div className="h-36 rounded-xl overflow-hidden border border-emerald-500/50 bg-slate-900">
                    <img 
                      src={verifyModalGrievance.afterPhoto || "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&auto=format&fit=crop&q=80"} 
                      alt="After" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Worker Remarks */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-xs">
              <span className="text-slate-400 block text-[10px]">Worker Field Remarks ({verifyModalGrievance.assignedWorker}):</span>
              <p className="text-slate-200 mt-0.5">{verifyModalGrievance.workerNotes || "Repairs executed per site specifications."}</p>
            </div>

            {/* Approval / Rejection Controls */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setGrievances(prev => prev.map(item => {
                    if (item.id === verifyModalGrievance.id) {
                      return {
                        ...item,
                        status: "In Progress",
                        workerNotes: "Officer requested rework: Evidence insufficient or incomplete."
                      };
                    }
                    return item;
                  }));
                  setVerifyModalGrievance(null);
                }}
                className="flex-1 bg-red-600/80 hover:bg-red-600 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <X className="w-4 h-4" /> Reject & Request Rework
              </button>

              <button
                type="button"
                onClick={() => {
                  setGrievances(prev => prev.map(item => {
                    if (item.id === verifyModalGrievance.id) {
                      return {
                        ...item,
                        status: "Resolved"
                      };
                    }
                    return item;
                  }));
                  setVerifyModalGrievance(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition"
              >
                <Check className="w-4 h-4" /> Approve & Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: GRIEVANCE DETAIL VIEW                                 */}
      {/* ============================================================== */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <span className="font-mono text-xs text-emerald-400 font-semibold">{selectedGrievance.id}</span>
                <h3 className="font-bold text-white text-base">{selectedGrievance.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedGrievance(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">{selectedGrievance.description}</p>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-750">
              <div>
                <span className="text-slate-400 block text-[10px]">Mandal & Village:</span>
                <span>{selectedGrievance.village}, {selectedGrievance.mandal}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Department:</span>
                <span>{selectedGrievance.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Assigned Worker:</span>
                <span>{selectedGrievance.assignedWorker}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Current Status:</span>
                <span className="font-semibold text-emerald-400">{selectedGrievance.status}</span>
              </div>
            </div>

            {selectedGrievance.beforePhoto && (
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Site Evidence</span>
                <div className="h-32 rounded-xl overflow-hidden border border-slate-700">
                  <img src={selectedGrievance.beforePhoto} alt="Site" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedGrievance(null)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl text-xs font-semibold"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FLOATING CONTEXT-AWARE CHATBOT: NIRMAL MITRA AI                */}
      {/* ============================================================== */}
      <div className="fixed bottom-5 right-5 z-40">
        {isChatOpen ? (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-80 sm:w-96 shadow-2xl flex flex-col h-[460px] overflow-hidden">
            {/* Chatbot Header */}
            <div className="bg-emerald-600 p-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-100" />
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-none">Nirmal Mitra AI</h4>
                  <span className="text-[10px] text-emerald-100">District Grievance Assistant</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-emerald-100 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chatbot Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs bg-slate-900/60">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-2.5 ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white rounded-br-none"
                        : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="p-2 bg-slate-800/90 border-t border-slate-700 flex gap-1.5 overflow-x-auto text-[10px]">
              <button
                onClick={() => setChatInput("Check status of NML-2026-0841")}
                className="whitespace-nowrap bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300"
              >
                🔍 Check Status
              </button>
              <button
                onClick={() => setChatInput("Nirmal Collectorate Helpline numbers?")}
                className="whitespace-nowrap bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300"
              >
                📞 Helplines
              </button>
              <button
                onClick={() => setChatInput("How to file water pipeline issue?")}
                className="whitespace-nowrap bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300"
              >
                💧 Water Complaint
              </button>
            </div>

            {/* Chat Input Bar */}
            <div className="p-2.5 bg-slate-800 border-t border-slate-700 flex gap-2">
              <input
                type="text"
                placeholder="Type your civic query..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={handleSendChat}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold border-2 border-emerald-400/40 hover:scale-105 transition"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Nirmal Mitra AI Assistant</span>
          </button>
        )}
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-3 text-center text-xs text-slate-500">
        DISTRICT VOICE • Nirmal District Collectorate & RGUKT Basar Student Academic Prototype • Telangana
      </footer>
    </div>
  );
}