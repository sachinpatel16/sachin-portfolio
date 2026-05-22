"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    slug: "qbot",
    title: "QBot – AI Chatbot Platform",
    description:
      "An AI-powered chatbot platform that enables businesses to integrate intelligent chatbots into their websites using their own knowledge base. Admins can create workspaces, upload docs/FAQs, and activate selected data. Includes a customizable widget script that embeds easily and handles real-time, context-aware user support.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80",
    tags: ["Reactjs", "FastAPI", "PostgreSQL", "Pinecone", "Amazon Bedrock", "EC2"],
    category: "AI/ML",
  },
  {
    slug: "tms-system",
    title: "TMS System – AI-Powered Hiring",
    description:
      "A Team Management System to streamline requirement gathering and hiring. Users input project specifications through a chatbot, which generates detailed job descriptions and requirements. The platform automatically indexes and filters matching resumes, reducing manual screening effort and boosting productivity.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    tags: ["Reactjs", "FastAPI", "LangChain", "PostgreSQL", "AWS EC2", "AWS S3", "CloudWatch"],
    category: "AI/ML",
  },
  {
    slug: "learnify-ai",
    title: "Learnify AI – Exam Prep Platform",
    description:
      "An AI education tool that simplifies exam preparation. Users upload syllabus/study documents, and the system extracts core concepts to dynamically generate customized exam papers (MCQs, short/long answers) aligned with difficulty preferences, helping educators and students save time.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    tags: ["Reactjs", "FastAPI", "LangChain", "LangGraph", "LangSmith", "RAG Pipeline", "PostgreSQL", "AWS Lambda", "AWS S3"],
    category: "AI/ML",
  },
  {
    slug: "website-generator",
    title: "Website Generator AI",
    description:
      "A conversational site-creation platform. After users describe their business and answer follow-up queries, the system automatically designs and writes single-page or multi-page websites with structured, responsive components and tailored copy, minimizing launch time.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tags: ["FastAPI", "DSPy", "LangGraph", "LangChain", "Deep Agents", "Amazon Bedrock", "AWS S3", "AWS Lambda"],
    category: "AI/ML",
  },
  {
    slug: "barter-club",
    title: "Barter Club – Voucher Platform",
    description:
      "A digital barter and gift card management app. Merchants create, distribute, and track vouchers, while customers purchase, redeem, and trade them using a wallet system. Utilizes secure transaction flows, custom analytics, and a highly scalable RESTful API design.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    tags: ["Django", "Django REST Framework", "PostgreSQL", "Razorpay", "AWS CloudWatch"],
    category: "Backend",
  },
  {
    slug: "telegram-support-bot",
    title: "AI-Powered Telegram Support Bot",
    description:
      "An automated Telegram customer care assistant. Handles text and voice notes (via automatic voice transcription and processing), leverages LLMs for intelligent response generation, and triggers custom n8n workflows for error logging, CRM routing, and live alerts.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    tags: ["n8n", "OpenAI API", "Voice Transcription", "API Automation", "Webhooks"],
    category: "Automation",
  },
];

const categories = ["All", "AI/ML", "Backend", "Automation"];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="group paper-interactive rounded-lg overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden bg-stone-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 rounded bg-white/95 border border-[#EAEAE4] text-[9px] font-mono text-[#B45309] font-bold uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {/* Direct link tags */}
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a
              href="#"
              aria-label="GitHub Repository"
              className="w-7 h-7 bg-white/90 border border-[#EAEAE4] rounded flex items-center justify-center text-stone-700 hover:text-[#B45309] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Live Demo link"
              className="w-7 h-7 bg-white/90 border border-[#EAEAE4] rounded flex items-center justify-center text-stone-700 hover:text-[#B45309] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 space-y-3">
          <Link href={`/projects/${project.slug}`} className="flex items-start justify-between gap-2 group/title block">
            <h3 className="text-base font-bold text-[#1C1917] group-hover/title:text-[#B45309] transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover/title:text-[#B45309] transition-colors flex-shrink-0 mt-0.5" />
          </Link>
          <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <Link 
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-[#B45309] hover:text-[#1C1917] uppercase tracking-widest transition-colors pt-2 border-t border-[#EAEAE4]/60 w-full"
          >
            ./view_case_study &rarr;
          </Link>
        </div>
      </div>

      {/* Tags bottom */}
      <div className="p-5 pt-0">
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#EAEAE4] text-[9px] font-mono text-stone-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-[#FAF9F5] border-t border-[#EAEAE4]">
      
      {/* Notebook guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 pl-0 sm:pl-8">
        
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-10 max-w-3xl"
        >
          <span className="inline-block px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest mb-4">
            ./featured_repos
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1917] mb-4">
            Selected Engineering <span className="text-stone-400 font-serif italic">Shipped Work</span>
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            A showcase of production-ready systems, custom microservices, and AI integrations.
          </p>
        </motion.div>

        {/* Tab Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-2 flex-wrap mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded font-mono text-[10px] uppercase tracking-widest transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]"
                  : "bg-white border-[#EAEAE4] text-stone-500 hover:text-[#1C1917] hover:border-[#1C1917]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
