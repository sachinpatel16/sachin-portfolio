"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Database, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function About() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const stats = [
    { label: "Completed Projects", value: "6+", desc: "AI chatbot platforms, RAG workflows, backends" },
    { label: "Client Satisfaction", value: "100%", desc: "Direct reviews and successful deliverables" },
    { label: "Industry Experience", value: "2+ Years", desc: "Python, Django, FastAPI & agentic workflows" },
    { label: "Response SLA", value: "< 24h", desc: "Available for active engineering contracts" }
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-[#FAF9F5] border-t border-[#EAEAE4]">
      
      {/* Notebook sidebar guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 pl-0 sm:pl-8">
        
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left max-w-3xl"
        >
          <span className="inline-block px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest mb-4">
            ./about_statement
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1917] mb-6">
            Architecting intelligent backend systems <span className="text-stone-400 font-serif italic">that scale.</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            I am Sachin Patel, a passionate Python &amp; AI/ML Developer with over 2+ years of experience building scalable backend architectures and AI-driven solutions. I specialize in backend frameworks like Django, DRF, and FastAPI, coupled with advanced agentic LLM pipelines using LangChain, LangGraph, DSPy, and Bedrock Agents.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Main Philosophy */}
          <div className="md:col-span-7 paper rounded-lg p-6 md:p-8 flex flex-col justify-between hover:border-[#B45309]/30 transition-colors duration-300">
            <div className="space-y-6">
              <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest block">core philosophy</span>
              <h3 className="text-xl md:text-2xl font-serif text-[#1C1917] leading-snug">
                I believe in engineering software with strict type annotations, thorough unit testing, and optimal memory management.
              </h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                Rather than jumping to bloated solutions, I focus on profiling queries, optimizing data structures (using Redis and event-driven Kafka logs), and setting up clean multi-tenant security layers. My goal is to build API microservices that run at sub-100ms response times.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#EAEAE4] text-xs">
              <div className="space-y-1">
                <span className="text-[#1C1917] font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#B45309]" />
                  Structured Data
                </span>
                <span className="text-stone-400 block text-[10px]">Optimized PostgreSQL models</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#1C1917] font-semibold flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-[#B45309]" />
                  Semantic Flows
                </span>
                <span className="text-stone-400 block text-[10px]">Vector retrieval architectures</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#1C1917] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B45309]" />
                  Reliability First
                </span>
                <span className="text-stone-400 block text-[10px]">99.9% uptime CI/CD targets</span>
              </div>
            </div>
          </div>

          {/* Card 2: Metrics */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 items-stretch">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="paper rounded-lg p-5 flex flex-col justify-between hover:border-[#B45309]/30 transition-colors duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl font-mono font-bold text-[#1C1917] group-hover:text-[#B45309] transition-colors">
                    {stat.value}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-[#B45309] transition-colors" />
                </div>
                <div className="space-y-1 mt-6">
                  <h4 className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">{stat.label}</h4>
                  <p className="text-[9px] text-stone-400 leading-normal">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Card 3: Deep Technical Focus Areas (Replaced progress bars with description boxes) */}
          <div className="md:col-span-12 paper rounded-lg p-6 md:p-8 hover:border-[#B45309]/30 transition-colors duration-300">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest block">operational target</span>
                <h4 className="text-lg font-serif font-bold text-[#1C1917]">Full-Cycle System Architecture</h4>
                <p className="text-stone-500 text-xs leading-relaxed font-sans">
                  From drawing system workflows to deploying live containers on AWS VPC subnets, I take full ownership of the product lifecycle.
                </p>
              </div>

              {/* Clean descriptive list items (no progress lines, no percentages) */}
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                <div className="p-4 rounded border border-[#EAEAE4] bg-[#FAF9F5] space-y-1">
                  <h5 className="font-mono text-[10px] font-bold text-[#1C1917] uppercase tracking-wider">AI Integration &amp; RAG</h5>
                  <p className="text-stone-500 text-[10px] leading-relaxed">
                    Custom LangChain/LangGraph systems, PEFT (LoRA &amp; QLoRA) LLM fine-tuning, sliding-window RAG, and vector database indexing.
                  </p>
                </div>

                <div className="p-4 rounded border border-[#EAEAE4] bg-[#FAF9F5] space-y-1">
                  <h5 className="font-mono text-[10px] font-bold text-[#1C1917] uppercase tracking-wider">Async Backend Services</h5>
                  <p className="text-stone-500 text-[10px] leading-relaxed">
                    Event-driven messaging logs, low-latency async routing channels, secure REST gateways, and background task handlers.
                  </p>
                </div>

                <div className="p-4 rounded border border-[#EAEAE4] bg-[#FAF9F5] space-y-1">
                  <h5 className="font-mono text-[10px] font-bold text-[#1C1917] uppercase tracking-wider">Containerization &amp; DevOps</h5>
                  <p className="text-stone-500 text-[10px] leading-relaxed">
                    Standardized Docker image builds, virtual private cloud setups, modular CI/CD actions, and continuous server auditing.
                  </p>
                </div>

                <div className="p-4 rounded border border-[#EAEAE4] bg-[#FAF9F5] space-y-1">
                  <h5 className="font-mono text-[10px] font-bold text-[#1C1917] uppercase tracking-wider">Enterprise Databases</h5>
                  <p className="text-stone-500 text-[10px] leading-relaxed">
                    PostgreSQL indexing, slow query analysis, transaction locks, and Redis key-value caching pipelines.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
