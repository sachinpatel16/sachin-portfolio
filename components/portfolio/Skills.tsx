"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Terminal, Database, Cpu, Cloud, Globe } from "lucide-react";

const categories = [
  { id: "all", label: "All Technologies" },
  { id: "backend", label: "Backend Core", icon: ServerIcon },
  { id: "ai", label: "AI & Machine Learning", icon: CpuIcon },
  { id: "infra", label: "Infra & DevOps", icon: CloudIcon },
  { id: "automation", label: "Automation & Tools", icon: GlobeIcon }
];

const skills = [
  // Backend
  { name: "Python", category: "backend", level: "Expert", desc: "Primary backend, scripts, and algorithmic services" },
  { name: "FastAPI", category: "backend", level: "Expert", desc: "High-performance asynchronous REST microservices" },
  { name: "Django & DRF", category: "backend", level: "Expert", desc: "Robust web logic, ORM access, and REST interfaces" },
  { name: "PostgreSQL", category: "backend", level: "Advanced", desc: "Relational database schema structures and indexes" },
  { name: "SQL DBs", category: "backend", level: "Advanced", desc: "Structured query optimization and normalization" },
  { name: "MySQL", category: "backend", level: "Advanced", desc: "Multi-tenant query writing and server configuration" },
  
  // AI/ML
  { name: "LLM Fine-Tuning", category: "ai", level: "Expert", desc: "Supervised fine-tuning of open-source models using LoRA/QLoRA" },
  { name: "LangGraph", category: "ai", level: "Expert", desc: "Intelligent agent state machines and stateful workflows" },
  { name: "LangChain", category: "ai", level: "Expert", desc: "Custom LLM prompt chains, tools, and retrievers" },
  { name: "DSPy", category: "ai", level: "Advanced", desc: "Programmatic model prompt tuning and reasoning chains" },
  { name: "RAG Systems", category: "ai", level: "Expert", desc: "Semantic retrieval, file chunking, and index queries" },
  { name: "Bedrock Agents", category: "ai", level: "Advanced", desc: "Fully managed conversational agent workflows" },
  { name: "Vector DBs", category: "ai", level: "Advanced", desc: "Pinecone and pgvector database integration" },
  { name: "LlamaIndex", category: "ai", level: "Advanced", desc: "Data connectors and context-aware indexing" },
  { name: "YOLO/RetinaFace", category: "ai", level: "Advanced", desc: "Computer vision custom object detection pipelines" },
  
  // DevOps
  { name: "AWS S3 & EC2", category: "infra", level: "Advanced", desc: "Virtual servers, storage configurations, and security groups" },
  { name: "AWS Lambda & RDS", category: "infra", level: "Advanced", desc: "Serverless functions and cloud database execution" },
  { name: "AWS SageMaker", category: "infra", level: "Advanced", desc: "Model compilation, training, and endpoint hosting" },
  { name: "AWS Glue", category: "infra", level: "Intermediate", desc: "Serverless data preparation and ETL jobs" },
  { name: "Docker", category: "infra", level: "Advanced", desc: "Standardized service container building and deployment" },
  
  // Automation & Tools
  { name: "n8n Automation", category: "automation", level: "Expert", desc: "Visual node-based API workflow automation and bots" },
  { name: "Problem-Solving", category: "automation", level: "Expert", desc: "Critical thinking, data structures, and algorithms" },
  { name: "Deep Agent Dev", category: "automation", level: "Advanced", desc: "Multi-agent tool invocation and loop handling" }
];

function ServerIcon(props: any) {
  return <Database {...props} />;
}
function CpuIcon(props: any) {
  return <Cpu {...props} />;
}
function CloudIcon(props: any) {
  return <Cloud {...props} />;
}
function GlobeIcon(props: any) {
  return <Terminal {...props} />;
}

export default function Skills() {
  const [activeCat, setActiveCat] = useState("all");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const filtered = activeCat === "all"
    ? skills
    : skills.filter(s => s.category === activeCat);

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-[#FAF9F5] border-t border-[#EAEAE4]">
      
      {/* Notebook sidebar guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 pl-0 sm:pl-8">
        
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-12 max-w-3xl"
        >
          <span className="inline-block px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest mb-4">
            ./runtime_vectors
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1917] mb-4">
            Technical Stack &amp; <span className="text-stone-400 font-serif italic">Core Expertise</span>
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            A scannable index of the programming languages, framework environments, and libraries I use.
          </p>
        </motion.div>

        {/* Category filtering buttons */}
        <div className="flex gap-2 flex-wrap mb-10 pb-4 border-b border-[#EAEAE4]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-4 py-2 rounded font-mono text-[10px] uppercase tracking-widest transition-all duration-200 border ${
                activeCat === cat.id
                  ? "bg-[#1C1917] text-[#FAF9F5] border-[#1C1917] font-bold"
                  : "bg-white border-[#EAEAE4] text-stone-500 hover:text-[#1C1917] hover:border-[#1C1917]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Modular Grid of compact high-contrast cards */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group p-4 bg-white border border-[#EAEAE4] hover:border-[#B45309]/30 rounded-lg transition-all duration-200 flex flex-col justify-between shadow-sm min-h-[110px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#1C1917] group-hover:text-[#B45309] transition-colors">
                      {skill.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#EAEAE4] text-[8px] font-mono text-stone-400 uppercase">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-stone-500 text-[10px] leading-relaxed pr-2">
                    {skill.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#FAF9F5] flex items-center justify-between text-[8px] font-mono text-stone-300 group-hover:text-[#B45309]/60 transition-colors">
                  <span>CATEGORY</span>
                  <span className="uppercase">{skill.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
