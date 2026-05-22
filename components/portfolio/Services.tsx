"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Cpu, Database, Layout, Sparkles, MessageSquareCode } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & Agentic Workflows",
    description: "Designing and building custom LLM-powered applications. Architecting advanced Retrieval-Augmented Generation (RAG) pipelines, semantic search engines, and multi-agent workflows using LangChain, LangGraph, and DSPy.",
    features: ["LangGraph Agent Workflows", "Vector Databases (Pinecone, pgvector)", "DSPy Programmatic Prompting", "RAG Pipeline Retrievers"],
  },
  {
    icon: Database,
    title: "Scalable Backend Engineering",
    description: "Architecting high-performance, asynchronous REST APIs using FastAPI and Django REST Framework. Expert database modeling with PostgreSQL/MySQL, caching, and secure API system integrations.",
    features: ["Asynchronous Python code", "API Design (FastAPI & Django DRF)", "Database Optimization & Indexing", "Third-party API Integrations"],
  },
  {
    icon: Cpu,
    title: "MLOps & Cloud Infrastructure",
    description: "Deploying machine learning models to production. Structuring clean containerized microservices with Docker, configuring AWS cloud environments, and setting up automated deployments.",
    features: ["Docker Containerization", "AWS (EC2, S3, RDS, Lambda)", "AWS SageMaker Model Hosting", "AWS Glue ETL Pipelines"],
  },
  {
    icon: Layout,
    title: "Full-Stack AI SaaS Development",
    description: "Building responsive, modern user interfaces that connect to intelligent backends. Linking robust FastAPI/Django endpoints to sleek React frontends for a seamless user experience.",
    features: ["React UI integrations", "TypeScript Type Safety", "Tailwind CSS Layout grids", "Dynamic Form Handlers"],
  },
  {
    icon: MessageSquareCode,
    title: "Conversational Website Chatbots",
    description: "Developing intelligent conversational website widgets. Combining database storage, document parsing, Large Language Model reasoning, and real-time streaming for automated customer support.",
    features: ["Real-time response streaming", "Customizable widget scripts", "FAQ & doc upload parsing", "Workspace session handling"],
  },
  {
    icon: Sparkles,
    title: "Computer Vision & Object Detection",
    description: "Implementing computer vision custom models for real-world detection tasks. Fine-tuning models, utilizing annotated datasets, and building object detection pipelines.",
    features: ["YOLO Model Fine-tuning", "RetinaFace detection setups", "Custom dataset annotations", "Image/Video preprocessing"],
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="paper-interactive rounded-lg p-6 flex flex-col justify-between"
    >
      <div>
        {/* Icon & Glow */}
        <div className="w-8 h-8 rounded bg-[#FAF9F5] border border-[#EAEAE4] flex items-center justify-center mb-6 text-[#B45309] shadow-sm">
          <Icon className="w-4.5 h-4.5" />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#1C1917] mb-2 font-serif">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-stone-500 text-xs leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      {/* Bullet features */}
      <ul className="space-y-2 mt-auto border-t border-[#EAEAE4] pt-4">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-[9px] font-mono text-stone-500">
            <span className="w-1 h-1 rounded-full bg-[#B45309]" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-[#FAF9F5] border-t border-[#EAEAE4]">
      
      {/* Notebook guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 pl-0 sm:pl-8">
        
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-16 max-w-3xl"
        >
          <span className="inline-block px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest mb-4">
            ./services_catalog
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1917] mb-4">
            Functional Services <span className="text-stone-400 font-serif italic">I Offer</span>
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            High-performance API architectures, custom artificial intelligence models, and end-to-end cloud infrastructure engineering.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
