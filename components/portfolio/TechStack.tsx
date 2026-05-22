"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Terminal as TermIcon, 
  Workflow, 
  Settings2, 
  Server,
  CloudLightning
} from "lucide-react";

const techCategories = [
  {
    icon: TermIcon,
    title: "Programming Languages",
    description: "Core languages used to construct robust logical flows and high-performance algorithms.",
    techs: [
      { name: "Python", desc: "Primary language for backend APIs, data pipelines, & ML integration." },
      { name: "SQL", desc: "Relational database querying, optimization, and normalization." },
      { name: "TypeScript", desc: "Strictly typed logic for building reliable frontends." },
      { name: "JavaScript", desc: "Client-side interactivity and script automation." }
    ]
  },
  {
    icon: Server,
    title: "Web & API Frameworks",
    description: "Architecting backend microservices and web application interfaces with maximum reliability.",
    techs: [
      { name: "FastAPI", desc: "Asynchronous high-performance REST APIs & automated docs." },
      { name: "Django & DRF", desc: "Clean MVC design, admin suites, ORM security, & REST APIs." },
      { name: "React & Next.js", desc: "Sleek frontend layouts, Server Components, and API routes." },
      { name: "Node.js", desc: "Environment support for client scripts and bundlers." }
    ]
  },
  {
    icon: Workflow,
    title: "AI & Machine Learning",
    description: "Integrating modern LLMs, stateful multi-agent workflows, and computer vision models.",
    techs: [
      { name: "LangGraph", desc: "Orchestrating complex multi-agent state loops and systems." },
      { name: "LangChain & LlamaIndex", desc: "Building prompt templates, retrievers, & semantic data indexes." },
      { name: "LoRA & QLoRA", desc: "Parameter-efficient fine-tuning (PEFT) of open-source LLMs under hardware constraints." },
      { name: "YOLO & RetinaFace", desc: "Fine-tuning neural nets for custom object detection." }
    ]
  },
  {
    icon: Settings2,
    title: "Databases & Storage",
    description: "Handling state persistence, fast caching systems, and vector search embeddings.",
    techs: [
      { name: "PostgreSQL", desc: "Primary relational storage with advanced transaction execution." },
      { name: "MySQL", desc: "Multi-tenant database configuration and optimization." },
      { name: "Pinecone / Vector DBs", desc: "High-performance vector indexing for semantic similarity." },
      { name: "Redis", desc: "Sub-millisecond key-value caching, sessions, and data buffers." }
    ]
  },
  {
    icon: CloudLightning,
    title: "Cloud & Automation",
    description: "Structuring containers, serverless scripts, and automated workflow pipelines.",
    techs: [
      { name: "AWS EC2 & S3", desc: "Deploying scalable VM servers and secure cloud file storage." },
      { name: "AWS Lambda & RDS", desc: "Running serverless execution scripts and relational database nodes." },
      { name: "n8n Automation", desc: "Visually scripting complex API triggers, voice bots, & alerts." },
      { name: "Docker", desc: "Standardizing service container building and deployment." }
    ]
  }
];

export default function TechStack() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="techstack" className="section-padding relative overflow-hidden bg-[#FAF9F5] border-t border-[#EAEAE4]">
      
      {/* Notebook guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-16 max-w-3xl"
        >
          <span className="inline-block px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest mb-4">
            ./runtime_env
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1917] mb-4">
            Engineering Tools &amp; <span className="text-stone-400 font-serif italic">Tech Stack</span>
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            A battle-tested set of technologies designed to build secure, robust, and lightning-fast software.
          </p>
        </motion.div>

        {/* Categories list */}
        <div className="space-y-6">
          {techCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="paper rounded-lg p-6 md:p-8 hover:border-[#B45309]/30 transition-all duration-300"
              >
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  
                  {/* Left Column: Title + Description */}
                  <div className="md:col-span-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#FAF9F5] border border-[#EAEAE4] flex items-center justify-center text-[#B45309] shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-[#1C1917]">{category.title}</h3>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed max-w-xs font-sans">
                      {category.description}
                    </p>
                  </div>

                  {/* Right Column: Mini Cards for each tech */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                    {category.techs.map((tech) => (
                      <div 
                        key={tech.name} 
                        className="p-4 rounded bg-[#FAF9F5] border border-[#EAEAE4] hover:border-[#B45309]/30 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-stone-700 group-hover:text-[#B45309] transition-colors">
                            {tech.name}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                        </div>
                        <p className="text-stone-500 text-[10px] leading-relaxed">
                          {tech.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
