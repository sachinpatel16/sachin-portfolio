"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowDown, BookOpen, Play, Download } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/sachinpatel16", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sachin-patel-9026b322a/", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#contact", label: "Email" },
];

const notebookPages = [
  { 
    id: "overview", 
    label: "Overview", 
    title: "systems_architecture.py",
    content: "class Engineer:\n    name = \"Sachin Patel\"\n    specialty = \"Python & AI/ML Development\"\n    experience = \"2+ Years\"\n    philosophy = \"Build clean, agentic systems. Optimize DB and memory.\"\n\n# Objective:\n# Deploy FastAPI/Django rest interfaces,\n# build intelligent RAG pipelines with LangGraph & DSPy,\n# fine-tune LLMs using LoRA & QLoRA,\n# optimize computer vision (YOLO) pipelines."
  },
  { 
    id: "llm", 
    label: "LLM Pipeline", 
    title: "rag_agent_chain.json",
    content: "{\n  \"frameworks\": [\"LangChain\", \"LangGraph\", \"DSPy\"],\n  \"retrieval\": \"RAG_Vector_Search_Pinecone\",\n  \"models\": [\"Amazon Bedrock Agents\", \"OpenAI/LLMs\"],\n  \"automation\": \"n8n Workflows\",\n  \"status\": \"production_ready\"\n}"
  },
  { 
    id: "backend", 
    label: "Backend", 
    title: "db_tuning.sql",
    content: "-- Caching & Query Latency Targets:\nSELECT service_name, avg_response_time_ms\nFROM system_metrics\nWHERE database = 'PostgreSQL'\n  AND caching = 'Redis'\n  AND async_processing = true;\n\n-- Target response: <80ms under load."
  }
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("overview");
  const [typedOutput, setTypedOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activePage = notebookPages.find(p => p.id === activeTab) || notebookPages[0];

  useEffect(() => {
    setIsTyping(true);
    setTypedOutput("");
    
    let index = 0;
    const content = activePage.content;
    
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    
    typingTimerRef.current = setInterval(() => {
      if (index < content.length) {
        const char = content.charAt(index);
        setTypedOutput((prev) => prev + char);
        index++;
      } else {
        setIsTyping(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 12);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [activeTab]);

  const handleScrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FAF9F5] pt-20">
      
      {/* Editorial Vertical and Horizontal structural line dividers */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />
      <div className="absolute top-[30%] left-0 right-0 h-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic intro */}
          <div className="lg:col-span-6 space-y-8 pl-0 sm:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
              Engineering Portfolio
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-[#1C1917] leading-[1.05] tracking-tight"
              >
                Sachin <br />
                <span className="text-[#B45309]">Patel.</span>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif italic text-lg sm:text-xl text-[#78716C]"
              >
                Passionate Python &amp; AI/ML Developer
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-stone-600 text-sm leading-relaxed max-w-md font-sans"
            >
              I build scalable backend systems, context-aware RAG pipelines using LangGraph and DSPy, and custom computer vision workflows. Focused on clean asynchronous code and solid system integration.
            </motion.p>

            {/* Action buttons with Download CV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-3 bg-[#1C1917] hover:bg-[#B45309] text-[#FAF9F5] font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 flex items-center gap-2"
              >
                <Play className="w-3 h-3 fill-[#FAF9F5] stroke-none" />
                Work Portfolio
              </button>
              
              <a
                href="/docs/Sachin_Patel_2.pdf"
                download
                className="px-5 py-3 bg-white hover:bg-stone-50 text-[#1C1917] border border-[#EAEAE4] hover:border-[#B45309] font-mono text-[10px] uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-stone-500" />
                Download CV
              </a>

              <a
                href="#contact"
                className="px-5 py-3 bg-white hover:bg-stone-50 text-[#1C1917] border border-[#EAEAE4] hover:border-[#B45309] font-mono text-[10px] uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                Contact Info
              </a>
            </motion.div>

            {/* Social Connectors */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 pt-6 border-t border-[#EAEAE4] max-w-sm"
            >
              <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest">Index:</span>
              <div className="flex gap-1.5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-7 h-7 bg-white border border-[#EAEAE4] hover:border-[#B45309] flex items-center justify-center text-stone-500 hover:text-[#B45309] transition-colors duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Notebook sandbox */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full max-w-xl mx-auto rounded-lg border border-[#EAEAE4] bg-white shadow-md overflow-hidden font-mono text-xs text-stone-800"
            >
              {/* Notebook header tabs */}
              <div className="bg-[#FAF9F5] border-b border-[#EAEAE4] flex items-center justify-between px-3 sm:px-4">
                <div className="flex gap-1.5 pt-3 overflow-x-auto scrollbar-none max-w-[calc(100%-40px)] sm:max-w-none shrink-0">
                  {notebookPages.map((page) => (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => setActiveTab(page.id)}
                      className={`px-3 py-2 text-[10px] uppercase tracking-wider font-mono border-t border-x rounded-t transition-colors duration-200 shrink-0 ${
                        activeTab === page.id
                          ? "bg-white border-[#EAEAE4] text-[#B45309] font-bold"
                          : "bg-transparent border-transparent text-stone-400 hover:text-stone-700"
                      }`}
                    >
                      {page.label}
                    </button>
                  ))}
                </div>
                <div className="text-[9px] text-stone-400 flex items-center gap-1.5 font-bold shrink-0 ml-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#B45309]" />
                  <span className="hidden sm:inline">sachin_notes</span>
                </div>
              </div>

              {/* Title bar of document */}
              <div className="bg-[#FAF9F5]/40 px-4 sm:px-6 py-2 border-b border-[#EAEAE4] text-[10px] text-stone-500 flex items-center justify-between">
                <span>FILE: {activePage.title}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              {/* Notebook page text writing block */}
              <div className="p-4 sm:p-6 h-60 bg-white overflow-y-auto leading-relaxed select-text font-mono text-[11px] text-stone-700 relative">
                {/* Horizontal guide lines */}
                <div className="absolute inset-0 editorial-grid opacity-[0.25] pointer-events-none" />
                
                <pre className="relative z-10 whitespace-pre-wrap break-words font-mono">
                  {typedOutput}
                  {isTyping && (
                    <span className="inline-block w-1.5 h-3.5 bg-[#B45309] ml-0.5 animate-pulse" />
                  )}
                </pre>
              </div>

              {/* Tab prompt */}
              <div className="border-t border-[#EAEAE4] bg-[#FAF9F5] p-3 text-[10px] font-mono text-center text-stone-400">
                // Click navigation page tabs to load different modules.
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Mini Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400 hover:text-[#B45309] transition-colors duration-200"
      >
        <span className="text-[9px] tracking-widest font-mono uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </section>
  );
}
