"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Mail,
  MessageSquare,
  Calendar,
  Smartphone,
  Lock,
  Shield,
  Zap,
  ArrowRight,
  Check,
  ChevronRight,
  Menu,
  X,
  Bell,
  RefreshCw,
  Eye,
  Settings,
  Workflow,
  Clock,
  Send,
  Database,
  Briefcase
} from "lucide-react";

// Types for playground mock data
interface Scenario {
  id: string;
  sender: string;
  time: string;
  subject?: string;
  rawInput: string;
  summary: string[];
  actionItems: string[];
  suggestedReply: string;
}

interface MockData {
  [key: string]: Scenario;
}

export default function Home() {
  // Mobile Nav Open/Close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Connection Toggles
  const [connections, setConnections] = useState({
    gmail: true,
    whatsapp: true,
    sms: false,
    outlook: true,
    calendar: true,
  });

  // Toggle helper
  const toggleConnection = (key: keyof typeof connections) => {
    setConnections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Playground Scenario State
  const [activePlatform, setActivePlatform] = useState<string>("gmail");

  // Simulated AI Processing State for Playground
  const [isProcessing, setIsProcessing] = useState(false);
  const [playgroundScenario, setPlaygroundScenario] = useState<string>("gmail");

  // FAQ states (index of expanded item)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Email input state
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Live Queue simulator for Hero section (list of simulated events popping in)
  const [liveEvents, setLiveEvents] = useState<Array<{ id: number; text: string; time: string; type: string }>>([
    { id: 1, text: "Gmail: Q3 Budget review request", time: "Just now", type: "gmail" },
    { id: 2, text: "WhatsApp: Alex asking about dinner tonight", time: "2 min ago", type: "whatsapp" },
    { id: 3, text: "Calendar: Conflict alert - Demo vs Dental", time: "5 min ago", type: "calendar" },
  ]);

  // Periodically add/rotate events to make the page feel alive
  useEffect(() => {
    const eventTemplates = [
      { text: "Outlook: System maintenance notice", type: "outlook" },
      { text: "SMS: Package delivered to front door", type: "sms" },
      { text: "WhatsApp: Project update from design team", type: "whatsapp" },
      { text: "Gmail: Client feedback on onboarding proposal", type: "gmail" },
      { text: "Calendar: Rescheduling request from Sarah", type: "calendar" },
    ];

    const interval = setInterval(() => {
      // Pick a random template
      const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      const newEvent = {
        id: Date.now(),
        text: template.text,
        time: "Just now",
        type: template.type,
      };

      setLiveEvents((prev) => {
        // Keep only active integrations, update time of others, keep list short (max 3)
        const updatedPrev = prev.map(ev => ({
          ...ev,
          time: ev.time === "Just now" ? "1 min ago" : ev.time === "1 min ago" ? "3 min ago" : "5 min ago"
        }));
        return [newEvent, ...updatedPrev.slice(0, 2)];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Trigger processing effect when playground platform changes
  const handlePlatformChange = (platform: string) => {
    setIsProcessing(true);
    setPlaygroundScenario(platform);
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 7000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    handlePlatformChange(activePlatform);
  }, [activePlatform]);

  const mockScenarios: MockData = {
    gmail: {
      id: "gmail",
      sender: "Sarah Jenkins (Project Manager)",
      time: "9:24 AM",
      subject: "Q3 Deliverables & Budget Alignment",
      rawInput: `Hi Team,\n\nI hope you are doing well. I've reviewed the project scope for Q3 and noticed we are slightly over our initial budget allocation by about $5,000. We need to cut down some of the design hours or look for alternative hosting providers to optimize our infrastructure costs.\n\nCould we jump on a call this Thursday at 2:00 PM EST to align on this? Also, please ensure the updated slides draft is uploaded to the shared folder by Wednesday evening so I can review it beforehand.\n\nBest,\nSarah`,
      summary: [
        "Budget overage of $5,000 detected in Q3 project scope.",
        "Needs to reduce design hours or optimize infrastructure hosting costs.",
        "Sarah requested a sync call on Thursday at 2:00 PM EST.",
        "Action required: Upload updated slides draft by Wednesday evening."
      ],
      actionItems: [
        "📅 Thursday at 2:00 PM EST - Budget Alignment Call (Check schedule: Free)",
        "⚠️ Upload Q3 slides draft (Due: Wednesday 5:00 PM)",
        "💡 Review AWS hosting tier and design estimates for potential cuts"
      ],
      suggestedReply: "Hi Sarah, sounds good. I will check our infrastructure billing details and review the design estimates today. I have added the sync call on Thursday at 2:00 PM EST to my calendar and will make sure the updated slides draft is in the shared folder by Wednesday evening. Thanks!"
    },
    whatsapp: {
      id: "whatsapp",
      sender: "Alex Carter (Client - Fintech Corp)",
      time: "10:05 AM",
      rawInput: `Hey! Are you around for a quick call today? Our legal team went through the contract proposal and had a few questions about the indemnity clause on page 4. Also, the CEO wants to know if we can expedite the timeline for Phase 1 by two weeks. Let me know if 3:30 PM works for you, or we can do tomorrow morning. Oh, and send over the latest api spec sheet if you have it handy!`,
      summary: [
        "Fintech Corp legal team has questions regarding the indemnity clause on page 4.",
        "Client CEO requested to accelerate Phase 1 timeline by 2 weeks.",
        "Proposed call times: Today at 3:30 PM or tomorrow morning.",
        "Action required: Send the latest API specification document."
      ],
      actionItems: [
        "📞 Today at 3:30 PM - Call with Alex (Conflict Check: Dentist at 3:30 PM - Conflict detected! ⚠️)",
        "📄 Send API spec sheet to Alex",
        "⚖️ Consult legal representative regarding page 4 indemnity adjustments"
      ],
      suggestedReply: "Hey Alex! I have an appointment today at 3:30 PM. Can we do tomorrow at 10:00 AM instead? In the meantime, I've attached our latest API spec sheet here for your reference. I will also check with our legal team about the indemnity clause on page 4 so we are prepared to review it tomorrow."
    },
    sms: {
      id: "sms",
      sender: "+1 (555) 382-9012 (Personal)",
      time: "10:14 AM",
      rawInput: `Hey there! Just checking if we are still on for dinner tonight at 7:30 PM? We are meeting at the Italian Bistro downtown. Let me know by 3 PM so I can lock in the reservation. Also, don't forget to grab the dry cleaning on your way back, they close at 6!`,
      summary: [
        "Confirm dinner tonight at 7:30 PM at Italian Bistro.",
        "RSVP required by 3:00 PM for booking reservation.",
        "Reminded to pick up dry cleaning before 6:00 PM closing time."
      ],
      actionItems: [
        "🍽️ Dinner at Italian Bistro tonight at 7:30 PM (No calendar conflicts)",
        "👕 Pick up dry cleaning before 6:00 PM today"
      ],
      suggestedReply: "Hey! Yes, I'm absolutely still on for dinner tonight at 7:30 PM. Go ahead and lock in the reservation. I've added a reminder to grab the dry cleaning before 6 PM too. See you tonight!"
    },
    outlook: {
      id: "outlook",
      sender: "IT Security Ops",
      time: "8:00 AM",
      subject: "[URGENT] Mandatory MFA Migration & Key Rotations",
      rawInput: `Dear Employee,\n\nAs part of our compliance update, all users must migrate to the new Okta Multi-Factor Authentication by this Friday, June 12th at midnight. Failure to complete this migration will result in temporary lockouts from your email and workstation. Additionally, any API credentials created before March 1st must be rotated by the end of this week. Please follow the instructions in the attached PDF to complete your migration.\n\nRegards,\nIT Security & Compliance Department`,
      summary: [
        "Mandatory Okta MFA migration deadline: Friday, June 12th, 11:59 PM.",
        "Risk of account lockout from workstation and corporate email if neglected.",
        "API credentials created prior to March 1st must be rotated by Friday."
      ],
      actionItems: [
        "🔐 Migrate to Okta MFA (Deadline: Friday midnight)",
        "🔑 Rotate API credentials older than March 1st (Due: Friday)",
        "📄 Review attached IT Security PDF guide"
      ],
      suggestedReply: "Thank you for the notification. I will review the instructions and complete my Okta MFA migration and rotate the active API keys today to avoid any access disruption."
    },
    calendar: {
      id: "calendar",
      sender: "Aviora Calendar Agent",
      time: "System Alert",
      rawInput: `Conflict Detected: Friday, June 12th\n- Event 1: 'Q3 Product Demo to Executive Sponsors' (2:30 PM - 3:30 PM)\n- Event 2: 'Annual Dental Checkup - Dr. Aris' (3:00 PM - 4:00 PM)\n\nBoth events overlap by 30 minutes. Event 1 is flagged as high-priority (includes 4 external attendees). Event 2 is personal.`,
      summary: [
        "Overlapping schedule conflict detected on Friday between 2:30 PM and 4:00 PM.",
        "Conflict: Executive Q3 Demo (high priority, 4 guests) overlaps with Dentist checkup (personal).",
        "Overlap duration: 30 minutes."
      ],
      actionItems: [
        "⚠️ Resolve schedule conflict for Friday 3:00 PM",
        "🤖 Let Aviora draft rescheduling email to Dental Office (Dr. Aris)",
        "📌 Lock in Q3 Product Demo for 2:30 PM"
      ],
      suggestedReply: "Draft email to dentist: 'Dear Dr. Aris Office, I have a critical work conflict on Friday, June 12th at 3:00 PM. Could we please reschedule my appointment? I am available next Monday morning at 9:00 AM or Tuesday afternoon. Thank you for understanding!'"
    }
  };

  const currentScenario = mockScenarios[playgroundScenario];

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 grid-bg relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] radial-glow-1 pointer-events-none z-0" />
      <div className="absolute top-[800px] left-0 w-[50%] h-[800px] radial-glow-2 pointer-events-none z-0" />
      <div className="absolute top-[1600px] right-0 w-[50%] h-[800px] radial-glow-3 pointer-events-none z-0" />

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#08080a]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-5.5 w-5.5 text-white animate-pulse-glow" />
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-[#08080a]" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Aviora
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">Features</a>
            <a href="#integrations" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">Integrations</a>
            <a href="#playground" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">Sandbox Demo</a>
            <a href="#security" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">Security</a>
            <a href="#faqs" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">FAQ</a>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200">
              Sign In
            </button>
            <button className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 group-hover:scale-105" />
              <span className="relative block px-5 py-2.5 rounded-full bg-[#08080a] text-sm font-medium text-white transition-colors duration-200 group-hover:bg-[#08080a]/80">
                Get Started Free
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/[0.06] bg-[#08080a] px-6 py-6 flex flex-col gap-5 animate-in slide-in-from-top-4 duration-200">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-zinc-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#integrations" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-zinc-300 hover:text-white transition-colors"
            >
              Integrations
            </a>
            <a 
              href="#playground" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-zinc-300 hover:text-white transition-colors"
            >
              Sandbox Demo
            </a>
            <a 
              href="#security" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-zinc-300 hover:text-white transition-colors"
            >
              Security
            </a>
            <a 
              href="#faqs" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-zinc-300 hover:text-white transition-colors"
            >
              FAQ
            </a>
            <div className="h-[1px] bg-white/[0.06] my-1" />
            <div className="flex flex-col gap-3">
              <button className="w-full py-2.5 text-center text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-lg border border-white/10">
                Sign In
              </button>
              <button className="w-full py-2.5 text-center text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors shadow-lg">
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Container */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 text-center sm:px-8 md:pt-24 lg:pt-32">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs font-semibold text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.1)] mb-6 animate-float-slow">
            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Introducing Aviora 1.0</span>
            <span className="text-zinc-500">|</span>
            <span className="flex items-center gap-0.5 text-indigo-200">
              Next-Gen Autonomous Agent Orchestration <ChevronRight className="h-3 w-3" />
            </span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Your email, chat, and schedule.
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Orchestrated by AI Agents.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg md:text-xl leading-relaxed">
            Stop drowning in notifications. Aviora safely connects to your <strong className="text-zinc-200">Gmail, WhatsApp, SMS, Outlook,</strong> and <strong className="text-zinc-200">Calendar</strong>, automatically synthesising digests, setting smart reminders, and drafting context-aware responses.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold text-white shadow-xl shadow-indigo-500/20 hover:opacity-95 transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 group">
              Start Free Trial <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#playground" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] font-semibold text-zinc-200 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm">
              Watch Demo Sandbox
            </a>
          </div>

          {/* Active Integration Icons Strip */}
          <div className="mt-16 border-t border-white/[0.05] pt-8 max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-6">
              Supported Platforms & Live Agent Connections
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {[
                { name: "Gmail", key: "gmail" as const, icon: Mail, color: "text-[#ea4335] bg-[#ea4335]/10 border-[#ea4335]/20" },
                { name: "WhatsApp", key: "whatsapp" as const, icon: MessageSquare, color: "text-[#25d366] bg-[#25d366]/10 border-[#25d366]/20" },
                { name: "SMS", key: "sms" as const, icon: Smartphone, color: "text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/20" },
                { name: "Outlook", key: "outlook" as const, icon: Mail, color: "text-[#0078d4] bg-[#0078d4]/10 border-[#0078d4]/20" },
                { name: "Calendar", key: "calendar" as const, icon: Calendar, color: "text-[#4285f4] bg-[#4285f4]/10 border-[#4285f4]/20" }
              ].map((plat) => {
                const isConnected = connections[plat.key];
                return (
                  <button
                    key={plat.name}
                    onClick={() => toggleConnection(plat.key)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      isConnected 
                        ? `${plat.color} opacity-100 scale-100 shadow-[0_0_12px_rgba(255,255,255,0.02)]` 
                        : "opacity-40 border-white/5 bg-transparent grayscale scale-95"
                    }`}
                  >
                    <plat.icon className="h-4 w-4" />
                    <span className="text-sm font-semibold text-zinc-300">{plat.name}</span>
                    <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"}`} />
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-zinc-500 mt-3">
              *Click platforms above to simulate connecting or disconnecting them in real-time.
            </p>
          </div>

          {/* DYNAMIC DASHBOARD PREVIEW */}
          <div className="mt-16 mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-[#0e0e12]/80 p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
            {/* Ambient background glow inside dashboard */}
            <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-pink-500/5 rounded-full blur-[60px] -z-10" />

            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-xs text-zinc-500 font-mono ml-3">aviora-agent-dashboard // live</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-white/5 text-[11px] text-zinc-400 font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  AGENTS ACTIVE: 4/5
                </div>
                <div className="h-6 w-[1px] bg-white/[0.06] hidden sm:block" />
                <RefreshCw className="h-3.5 w-3.5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                <Settings className="h-3.5 w-3.5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left">
              
              {/* Left Column - Connected Feeds */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                  <span>Input Streams</span>
                  <span className="text-[10px] text-indigo-400 lowercase font-mono">listening...</span>
                </h3>
                
                {/* Simulated Feed Events */}
                <div className="flex flex-col gap-2.5">
                  {/* Gmail feed */}
                  <div className={`p-3 rounded-xl border transition-all duration-300 ${
                    connections.gmail ? "bg-white/[0.02] border-white/5 opacity-100" : "bg-transparent border-dashed border-white/[0.03] opacity-30"
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-[#ea4335]" />
                        <span className="text-xs font-semibold text-zinc-300">Gmail Stream</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">Connected</span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {connections.gmail ? "New message: Sarah Jenkins re: Q3 Budget review request" : "Integration paused"}
                    </p>
                  </div>

                  {/* WhatsApp feed */}
                  <div className={`p-3 rounded-xl border transition-all duration-300 ${
                    connections.whatsapp ? "bg-white/[0.02] border-white/5 opacity-100" : "bg-transparent border-dashed border-white/[0.03] opacity-30"
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-3.5 w-3.5 text-[#25d366]" />
                        <span className="text-xs font-semibold text-zinc-300">WhatsApp Stream</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">Connected</span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {connections.whatsapp ? "New message: Alex Carter re: urgent call today" : "Integration paused"}
                    </p>
                  </div>

                  {/* SMS feed */}
                  <div className={`p-3 rounded-xl border transition-all duration-300 ${
                    connections.sms ? "bg-white/[0.02] border-white/5 opacity-100" : "bg-transparent border-dashed border-white/[0.03] opacity-30"
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-3.5 w-3.5 text-[#ff9900]" />
                        <span className="text-xs font-semibold text-zinc-300">SMS Stream</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">{connections.sms ? "Connected" : "Disconnected"}</span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {connections.sms ? "New SMS: Code 4921 for transaction verification" : "Click toggle above to connect SMS"}
                    </p>
                  </div>

                  {/* Outlook feed */}
                  <div className={`p-3 rounded-xl border transition-all duration-300 ${
                    connections.outlook ? "bg-white/[0.02] border-white/5 opacity-100" : "bg-transparent border-dashed border-white/[0.03] opacity-30"
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-[#0078d4]" />
                        <span className="text-xs font-semibold text-zinc-300">Outlook Stream</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">Connected</span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {connections.outlook ? "New message: IT Security Ops re: MFA migration" : "Integration paused"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle Column - Synthesized AI Brain */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                  <span>AI Synthesizer Agent</span>
                  <span className="text-[10px] text-pink-400 font-mono flex items-center gap-1">
                    <span className="h-1 w-1 bg-pink-400 rounded-full animate-ping" />
                    structuring digest...
                  </span>
                </h3>
                
                <div className="flex-1 p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/[0.02] flex flex-col gap-4">
                  {/* Summary Card */}
                  <div className="border-b border-white/[0.04] pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
                        Today's Unified Briefing
                      </span>
                      <span className="text-[10px] text-zinc-500">Compiled 8m ago</span>
                    </div>
                    <ul className="text-xs text-zinc-300 space-y-1.5 list-disc pl-3">
                      {connections.gmail && <li>Sarah needs Q3 Slides draft by Wednesday evening. Meeting proposed for Thursday.</li>}
                      {connections.whatsapp && <li>Client Alex (Fintech) requested Phase 1 timeline acceleration and a call.</li>}
                      {connections.outlook && <li>Okta MFA migration deadline is Friday midnight. Lockout threat if missed.</li>}
                      {connections.sms && <li>Personal SMS alert: Pickup dry cleaning before 6 PM and dinner RSVP by 3 PM.</li>}
                    </ul>
                  </div>

                  {/* Live Queue Feed */}
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      Recent Stream Logs
                    </div>
                    <div className="space-y-2">
                      {liveEvents.map((ev) => (
                        <div key={ev.id} className="flex items-center justify-between bg-white/[0.01] border border-white/[0.03] p-2 rounded-lg text-xs animate-in fade-in duration-300">
                          <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              ev.type === "gmail" ? "bg-red-400" : ev.type === "whatsapp" ? "bg-green-400" : ev.type === "calendar" ? "bg-blue-400" : "bg-amber-400"
                            }`} />
                            {ev.text}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">{ev.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Reminders & Calendar Sync */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Auto-Created Actions
                </h3>
                
                <div className="flex-1 flex flex-col gap-3.5">
                  {/* Calendar Sync Card */}
                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#4285f4]" />
                      <span className="text-xs font-bold text-zinc-200">Calendar Agenda</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-zinc-900/50 border-l-2 border-red-500 text-xs">
                        <div className="flex justify-between font-semibold text-zinc-300">
                          <span>Dentist vs. Client Call</span>
                          <span className="text-[9px] text-red-400 font-mono">Conflict!</span>
                        </div>
                        <p className="text-[10px] text-zinc-500">Friday, 3:00 PM - 3:30 PM</p>
                      </div>
                      <div className="p-2 rounded bg-zinc-900/50 border-l-2 border-indigo-500 text-xs">
                        <div className="font-semibold text-zinc-300">Sarah Sync Proposal</div>
                        <p className="text-[10px] text-zinc-500">Thursday, 2:00 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Tasks & Action Items */}
                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-4 w-4 text-purple-400 animate-bounce" />
                      <span className="text-xs font-bold text-zinc-200">Pending Reminders</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <span>Send updated Slides to Sarah (Wednesday)</span>
                      </div>
                      <div className="flex items-start gap-2 text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <span>Okta MFA migration setup (Due Friday)</span>
                      </div>
                      <div className="flex items-start gap-2 text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <span>Review indemnity on Page 4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* BENTO GRID FEATURE SECTION */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/[0.05]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Complete Feature Suite
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              An intelligent nervous system for all communications.
            </p>
            <p className="mt-4 text-base text-zinc-400">
              Aviora leverages specialized agents that focus on distinct channels to keep your information safe, cross-referenced, and structured.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Large Card (2 columns, 1 row) */}
            <div className="md:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/15 transition-all duration-300" />
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                    <Workflow className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Cross-Channel Context Stitching
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                    Aviora links emails on Outlook, quick messages on WhatsApp, and files on Slack into single unified topic streams. If a client follows up on WhatsApp regarding a proposal you emailed, Aviora connects the dots instantly. No more search anxiety.
                  </p>
                </div>
                {/* Visual indicator within card */}
                <div className="mt-8 p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-1 rounded bg-[#ea4335]/10 text-[#ea4335] border border-[#ea4335]/20 font-semibold">Email</span>
                    <ChevronRight className="h-3 w-3 text-zinc-600" />
                    <span className="px-2 py-1 rounded bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/20 font-semibold">WhatsApp</span>
                  </div>
                  <span className="text-indigo-400">Linked context: Project Omega</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Small Card (1 column, 1 row) */}
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/15 transition-all duration-300" />
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                    <Clock className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    The 2-Minute Briefing
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Wake up to a highly condensed, bulleted brief outlining key details. Instead of scrolling through 120 unread items, read a simple bulleted synopsis.
                  </p>
                </div>
                <div className="mt-6 text-xs text-zinc-500 font-mono">
                  ✓ Reclaims ~9 hours per week
                </div>
              </div>
            </div>

            {/* Bento Card 3: Small Card (1 column, 1 row) */}
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-pink-500/10 rounded-full blur-[60px] group-hover:bg-pink-500/15 transition-all duration-300" />
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6">
                    <Calendar className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Schedule Guard
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Instantly flags conflicts between dentist appointments, personal calendar slots, and corporate syncs, proposing draft emails to reschedule conflicts dynamically.
                  </p>
                </div>
                <div className="mt-6 text-xs text-pink-400 font-mono">
                  ⚠ Conflict Rescheduler active
                </div>
              </div>
            </div>

            {/* Bento Card 4: Large Card (2 columns, 1 row) */}
            <div className="md:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/15 transition-all duration-300" />
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                    <Zap className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Tone-Matching Reply Agent
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                    Aviora templates your specific tone based on past conversations. For WhatsApp messages, it drafts responses that sound friendly and concise. For corporate client emails on Gmail or Outlook, it automatically structures professional prose.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-white/5">
                    <div className="text-zinc-500 mb-1">WhatsApp Agent</div>
                    <div className="text-zinc-300">"Sure thing! On it."</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-white/5">
                    <div className="text-zinc-500 mb-1">Outlook Agent</div>
                    <div className="text-zinc-300">"Understood. I will complete this."</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECURITY & PRIVACY SECTION */}
        <section id="security" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/[0.05] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-xs font-semibold text-emerald-400 shadow-[0_0_15px_rgba(37,211,102,0.05)] mb-6">
                <Shield className="h-4 w-4" />
                <span>Enterprise Grade Security</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Your data stays private. Period.
              </h2>
              <p className="mt-4 text-base text-zinc-400 leading-relaxed">
                Aviora does not sell, train on, or store your communications permanently. All integrations operate under OAuth 2.0 secure handshakes, and messages are processed in-memory with end-to-end encryption.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  { title: "AES-256 In-Memory Encryption", desc: "Data is analyzed inside volatile memory and instantly wiped post-synthesis." },
                  { title: "Granular OAuth Consents", desc: "Revoke access to specific email folders or chat accounts at any time with one click." },
                  { title: "Zero LLM Training Data", desc: "We enforce strict enterprise data policies, ensuring no AI models are trained on your data." }
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Vault Mockup */}
            <div className="relative flex justify-center items-center">
              <div className="w-full max-w-md p-6 rounded-3xl border border-white/[0.08] bg-[#0c0c10] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-[50px] -z-10" />
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">OAuth Handshake Shield</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-400/10 px-2 py-0.5 rounded-full">Active</span>
                </div>
                
                {/* Security Visual Grid */}
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-500">Google OAuth 2.0 Token</span>
                    <span className="text-emerald-400">SECURE SHA-256</span>
                  </div>
                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-500">WhatsApp Session key</span>
                    <span className="text-emerald-400">ROTATED DAILY</span>
                  </div>
                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-500">In-Memory Session</span>
                    <span className="text-pink-400">AUTO-EXPIRING</span>
                  </div>
                  
                  {/* Status Indicator Bar */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[10px] text-zinc-400">Live Encryption Audits</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">v1.2.9 compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PLAYGROUND (SANDBOX DEMO) */}
        <section id="playground" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 border-t border-white/[0.05]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Interactive Sandbox
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              See the AI Agent in action.
            </p>
            <p className="mt-4 text-base text-zinc-400">
              Select one of the mock channel scenarios below to preview how Aviora's agents parse messy, unstructured message streams and synthesize structured, actionable outcomes in real-time.
            </p>
          </div>

          {/* Interactive UI Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Side: Selectors & Raw Input */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                1. Select Platform & Stream Scenario
              </div>
              
              {/* Platform Selector buttons */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: "gmail", label: "Gmail", icon: Mail, color: "hover:border-red-500 hover:bg-red-500/5", activeColor: "border-red-500 bg-red-500/10 text-white" },
                  { id: "whatsapp", label: "WA", icon: MessageSquare, color: "hover:border-green-500 hover:bg-green-500/5", activeColor: "border-green-500 bg-green-500/10 text-white" },
                  { id: "sms", label: "SMS", icon: Smartphone, color: "hover:border-orange-500 hover:bg-orange-500/5", activeColor: "border-orange-500 bg-orange-500/10 text-white" },
                  { id: "outlook", label: "Outlook", icon: Mail, color: "hover:border-blue-500 hover:bg-blue-500/5", activeColor: "border-blue-500 bg-blue-500/10 text-white" },
                  { id: "calendar", label: "Cal", icon: Calendar, color: "hover:border-indigo-500 hover:bg-indigo-500/5", activeColor: "border-indigo-500 bg-indigo-500/10 text-white" }
                ].map((plat) => {
                  const isActive = activePlatform === plat.id;
                  return (
                    <button
                      key={plat.id}
                      onClick={() => setActivePlatform(plat.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                        isActive ? plat.activeColor : "border-white/5 bg-white/[0.01] text-zinc-400 " + plat.color
                      }`}
                    >
                      <plat.icon className="h-4.5 w-4.5" />
                      <span>{plat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Raw Input Feed Preview */}
              <div className="flex-1 p-5 rounded-2xl border border-white/[0.08] bg-[#0c0c10] flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <div>
                      <div className="text-xs text-zinc-500">From</div>
                      <div className="text-sm font-bold text-zinc-200">{currentScenario.sender}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-500">Time Received</div>
                      <div className="text-xs text-zinc-300 font-mono">{currentScenario.time}</div>
                    </div>
                  </div>
                  
                  {currentScenario.subject && (
                    <div className="mb-3">
                      <span className="text-xs text-zinc-500 font-bold uppercase mr-2">Subject:</span>
                      <span className="text-xs font-bold text-zinc-300">{currentScenario.subject}</span>
                    </div>
                  )}

                  <div className="text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed max-h-[200px] overflow-y-auto font-mono bg-zinc-950/40 p-3 rounded-lg border border-white/5">
                    {currentScenario.rawInput}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                  <span>Input size: {currentScenario.rawInput.length} chars</span>
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-ping" />
                    Incoming Stream Active
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: AI Synthesis connection (Animated Arrow) */}
            <div className="lg:col-span-2 flex flex-row lg:flex-col items-center justify-center gap-3 py-4">
              <div className="h-[2px] w-8 lg:w-[2px] lg:h-12 bg-gradient-to-r lg:bg-gradient-to-b from-indigo-500 to-purple-500 shrink-0" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-lg text-indigo-400 animate-pulse-glow shrink-0">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <div className="h-[2px] w-8 lg:w-[2px] lg:h-12 bg-gradient-to-r lg:bg-gradient-to-b from-purple-500 to-pink-500 shrink-0" />
            </div>

            {/* Right Side: Processed Output */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex justify-between">
                <span>2. AI Generated Synthesis</span>
                {isProcessing && <span className="text-xs text-pink-400 font-mono animate-pulse">thinking...</span>}
              </div>

              <div className="flex-1 p-5 rounded-2xl border border-indigo-500/20 bg-indigo-950/10 flex flex-col gap-4 relative min-h-[300px]">
                
                {/* Simulated processing loading overlay */}
                {isProcessing ? (
                  <div className="absolute inset-0 bg-[#08080a]/80 backdrop-blur-xs flex flex-col items-center justify-center rounded-2xl gap-3">
                    <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin" />
                    <span className="text-xs font-mono text-indigo-300">Orchestrating agent variables...</span>
                  </div>
                ) : null}

                {/* Summaries list */}
                <div>
                  <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" /> Bullet Synthesis Summary
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-2 list-disc pl-4 leading-relaxed">
                    {currentScenario.summary.map((sum, index) => (
                      <li key={index}>{sum}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions list */}
                <div>
                  <div className="text-[11px] font-bold text-pink-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Bell className="h-3 w-3" /> Auto-Created Actions & Reminders
                  </div>
                  <div className="space-y-1.5">
                    {currentScenario.actionItems.map((act, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white/[0.02] border border-white/5 rounded-lg text-xs text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drafting Box */}
                <div>
                  <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Send className="h-3 w-3" /> Smart suggested draft reply
                  </div>
                  <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl text-xs text-zinc-400 leading-relaxed font-mono relative">
                    <p>{currentScenario.suggestedReply}</p>
                    <button 
                      onClick={() => alert("Simulated response copied to clipboard!")}
                      className="absolute bottom-2 right-2 px-2.5 py-1 text-[9px] font-bold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded transition-colors"
                    >
                      Copy Draft
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* TRUST / METRICS SECTION */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 border-t border-white/[0.05] bg-gradient-to-b from-transparent to-white/[0.01]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "99.99%", label: "System Uptime" },
              { val: "250M+", label: "Syntheses Processed" },
              { val: "2-Sec", label: "In-Memory Cleanup Latency" },
              { val: "9.2 hrs", label: "Weekly Average Hours Saved" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.val}
                </div>
                <div className="text-xs sm:text-sm font-medium text-zinc-500 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section id="faqs" className="mx-auto max-w-4xl px-6 py-20 sm:px-8 border-t border-white/[0.05]">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Got Questions?
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does Aviora connect to my accounts securely?",
                a: "Aviora utilizes standard OAuth 2.0 protocols to connect to Gmail, Outlook, and Calendar. For WhatsApp and SMS, we use secure sandboxed gateways. This means we never see or store your raw account passwords, and you can revoke Aviora's access instantly via your account management panel."
              },
              {
                q: "Does Aviora store or sell my communication data?",
                a: "No, absolutely not. Privacy is our core foundation. Your incoming streams are processed temporarily in volatile server memory (RAM) and immediately cleared once the synthesis digest is created. We have zero database retention for your raw communications, and your data is never used to train global LLM models."
              },
              {
                q: "Can I choose which folders or chats to synthesize?",
                a: "Yes. Aviora allows granular control. You can specify only to track emails from specific senders, skip promotional folders entirely, or only trigger the SMS agent for security notifications and scheduling queries."
              },
              {
                q: "Is there a conflict resolver for calendar events?",
                a: "Yes! The Calendar Agent monitors overlapping slots across multiple calendars. If you have a dentist appointment on your personal calendar and a corporate sync on Outlook, Aviora flags the overlap and drafts email proposals to reschedule one of the slots."
              },
              {
                q: "What pricing tiers are available?",
                a: "We offer a Free tier which includes up to 2 accounts and daily briefing summaries. The Pro tier ($12/mo) includes unlimited account integration, real-time trigger summaries, smart reply drafting, and automatic calendar conflict rescheduling."
              }
            ].map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-white/[0.06] bg-[#0c0c10] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="font-semibold text-zinc-100 hover:text-white transition-colors">
                      {faq.q}
                    </span>
                    <span className={`shrink-0 transition-transform duration-200 text-zinc-500 ${isExpanded ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-white/[0.03] pt-4 animate-in fade-in duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA FORM CARD */}
        <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
          <div className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/30 to-purple-950/20 p-8 sm:p-12 text-center overflow-hidden">
            {/* Glow dots inside signup box */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -z-10" />

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Take back hours of your day.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
              Join thousands of founders, executives, and builders who use Aviora to orchestrate their digital lives. Get started in less than 2 minutes.
            </p>

            {emailSubmitted ? (
              <div className="mt-8 max-w-md mx-auto p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold text-sm">
                🎉 Thank you! You've been added to our early access queue. We'll reach out soon.
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setEmailSubmitted(true);
                }}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your professional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold text-white text-sm hover:opacity-95 transition-opacity"
                >
                  Join Early Access
                </button>
              </form>
            )}
            <p className="text-[11px] text-zinc-600 mt-4">
              Free 14-day trial. No credit card required. OAuth integration secure.
            </p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-[#050507] relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            
            {/* Branding Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">Aviora</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
                The secure personal AI assistant that coordinates messages and schedules, enabling you to reclaim your attention and time.
              </p>
              <div className="flex gap-4">
                {/* Social icons fallback */}
                {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                  <span 
                    key={social} 
                    className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
              
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Product
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs text-zinc-500">
                  <li><a href="#features" className="hover:text-zinc-300 transition-colors">Features</a></li>
                  <li><a href="#integrations" className="hover:text-zinc-300 transition-colors">Integrations</a></li>
                  <li><a href="#playground" className="hover:text-zinc-300 transition-colors">Sandbox Demo</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">Pricing Plans</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Security & Trust
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs text-zinc-500">
                  <li><a href="#security" className="hover:text-zinc-300 transition-colors">Data Privacy</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">GDPR & Compliance</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">OAuth Consents</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">Status Feed</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Company
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs text-zinc-500">
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">Developer API</a></li>
                  <li><a href="#" className="hover:text-zinc-300 transition-colors">Contact Support</a></li>
                </ul>
              </div>

            </div>

          </div>

          <div className="mt-12 border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} Aviora Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-zinc-600">
              <a href="#" className="hover:text-zinc-500">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-500">Terms of Service</a>
              <a href="#" className="hover:text-zinc-500">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
