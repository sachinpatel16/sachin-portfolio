"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Check } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Python Developer",
    company: "Qrious Tech Team LLP",
    location: "Ahmedabad, Gujarat, India",
    period: "03/2026 — Present",
    current: true,
    description:
      "Hands-on experience building AI agents and agentic workflows. Focus on fine-tuning models, prompt engineering, and developing scalable backend systems to deliver real-world AI applications.",
    achievements: [
      "Built multi-agent conversational workflows using LangGraph and DSPy frameworks",
      "Fine-tuned LLM parameters and engineered optimized system prompts for context accuracy",
      "Developed and optimized scalable API services running on AWS infrastructure",
    ],
  },
  {
    type: "work",
    title: "Python Developer",
    company: "Karmaleen Technology",
    location: "Ahmedabad, Gujarat, India",
    period: "02/2025 — 02/2026",
    current: false,
    description:
      "Built AI-driven applications using FastAPI. Implemented advanced Retrieval-Augmented Generation (RAG) pipelines with LangChain and LlamaIndex for intelligent, context-aware data retrieval.",
    achievements: [
      "Designed and deployed vector database storage indexing systems to query custom documents",
      "Created sub-100ms FastAPI rest service layers to handle real-time database lookups",
      "Programmed semantic search pipelines to clean, chunk, and index unstructured company files",
    ],
  },
  {
    type: "work",
    title: "Python Developer",
    company: "Codefencers Pvt. Ltd.",
    location: "Ahmedabad, Gujarat, India",
    period: "01/2024 — 02/2025",
    current: false,
    description:
      "Focused on Django backend development, constructing secure REST APIs and robust web applications. Enhanced code robustness and delivered scalable solutions for real-world projects.",
    achievements: [
      "Developed high-throughput API endpoints utilizing Django REST Framework (DRF)",
      "Improved query performance by resolving N+1 issues and optimizing database indexing",
      "Maintained modular MVC structures and integrated external payment and automation APIs",
    ],
  },
  {
    type: "education",
    title: "B.E. in Information Technology",
    company: "Sal Engineering And Technical Institute",
    location: "Ahmedabad, Gujarat, India",
    period: "2020 — 2024",
    current: false,
    description:
      "Completed Bachelor of Engineering degree in IT. Focused on database systems, data structures, algorithms, software engineering principles, and modular system design.",
    achievements: [
      "Gained deep understanding of relational database design, normalization, and optimization",
      "Implemented various software engineering patterns and completed backend project modules",
      "Graduated with practical experience in full-stack project building and code logic styling",
    ],
  },
];

function TimelineItem({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
      className={`relative flex ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-0 gap-4`}
    >
      {/* Card */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
        <div className="paper rounded-lg p-6 hover:border-[#B45309]/30 transition-all duration-300 group">
          
          {/* Title & Icon Header */}
          <div className={`flex items-start gap-3 ${isLeft ? "md:flex-row-reverse" : ""} mb-3`}>
            <div className="w-8 h-8 rounded bg-[#FAF9F5] border border-[#EAEAE4] flex items-center justify-center flex-shrink-0 text-[#B45309] shadow-sm">
              {exp.type === "work" ? (
                <Briefcase className="w-4 h-4" />
              ) : (
                <GraduationCap className="w-4 h-4" />
              )}
            </div>
            <div className={`flex-1 ${isLeft ? "md:text-right" : ""}`}>
              <div className={`flex items-center gap-2 flex-wrap mb-0.5 ${isLeft ? "md:justify-end" : ""}`}>
                <h3 className="text-sm font-bold text-[#1C1917]">{exp.title}</h3>
                {exp.current && (
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-[#B45309]/10 border border-[#B45309]/20 text-[#B45309]">
                    CURRENT
                  </span>
                )}
              </div>
              <p className="font-mono text-[10px] text-stone-500 font-semibold uppercase tracking-wider">{exp.company}</p>
            </div>
          </div>

          {/* Location / Period Meta details */}
          <div className={`flex flex-wrap gap-3 mb-4 font-mono text-[9px] text-stone-400 ${isLeft ? "md:justify-end" : ""}`}>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-300" /> {exp.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-300" /> {exp.location}
            </span>
          </div>

          <p className={`text-stone-600 text-xs leading-relaxed mb-4 ${isLeft ? "md:text-right" : ""}`}>
            {exp.description}
          </p>

          {/* Bullet achievements list */}
          <ul className={`space-y-1.5 ${isLeft ? "md:items-end" : ""} flex flex-col`}>
            {exp.achievements.map((a) => (
              <li key={a} className={`flex items-start gap-2 text-xs text-stone-500 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}>
                <Check className="w-3.5 h-3.5 text-[#B45309] flex-shrink-0 mt-0.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Middle Center Timeline circular dot anchor */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#B45309] shadow-sm ring-4 ring-[#FAF9F5]"
        />
      </div>

      {/* Spacer helper */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="section-padding relative overflow-hidden bg-[#FAF9F5] border-t border-[#EAEAE4]">
      
      {/* Notebook guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-16 max-w-3xl"
        >
          <span className="inline-block px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest mb-4">
            ./work_history
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1917] mb-4">
            Experience <span className="text-stone-400 font-serif italic">&amp; Education Timeline</span>
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            A chronological timeline of roles in development teams, software houses, and academic roots.
          </p>
        </motion.div>

        {/* Vertical Timeline container */}
        <div className="relative">
          {/* Center line divider */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#EAEAE4]" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.title} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
