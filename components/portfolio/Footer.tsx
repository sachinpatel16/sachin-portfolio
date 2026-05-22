"use client";

import { useState } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/sachinpatel16", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sachin-patel-9026b322a/", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:sachinpatel7496007@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-[#FAF9F5] border-t border-[#EAEAE4] overflow-hidden">
      
      {/* Notebook guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12">
          
          {/* Logo & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-bold tracking-tight text-[#1C1917]">
                Sachin Patel<span className="text-[#B45309]">.</span>
              </span>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed max-w-xs">
              Python Developer &amp; AI Engineer specializing in high-performance backends, custom language model architectures, and scalable cloud deployments.
            </p>
            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-7 h-7 bg-white border border-[#EAEAE4] hover:border-[#B45309] flex items-center justify-center text-stone-500 hover:text-[#B45309] transition-all duration-200 shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[#1C1917] font-mono text-[10px] font-bold uppercase tracking-widest">Navigation</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-stone-500 hover:text-[#B45309] transition-colors py-1 block font-mono text-[10px] uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Focus areas */}
          <div className="space-y-4">
            <h4 className="text-[#1C1917] font-mono text-[10px] font-bold uppercase tracking-widest">Core Focus</h4>
            <ul className="space-y-2 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B45309]" />
                Large Language Models
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B45309]" />
                Async Microservices
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B45309]" />
                Event-driven Pipelines
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B45309]" />
                Cloud Infrastructure
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-[#1C1917] font-mono text-[10px] font-bold uppercase tracking-widest">Newsletter</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Subscribe to receive technical guides on Python caching, RAG development, and backend scalability.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2 rounded bg-white border border-[#EAEAE4] focus:border-[#B45309] text-[#1C1917] placeholder-stone-400 outline-none text-xs transition-all duration-200"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#1C1917] hover:bg-[#B45309] text-[#FAF9F5] rounded font-mono text-[9px] uppercase font-bold tracking-widest transition-colors"
              >
                {subscribed ? "Joined" : "Join"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="border-t border-[#EAEAE4] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-stone-400">
          <p>&copy; {new Date().getFullYear()} Sachin Patel. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-600">Privacy Policy</a>
            <a href="#" className="hover:text-stone-600">Terms of Service</a>
          </div>
          <button
            onClick={handleScrollTop}
            className="group flex items-center gap-1.5 text-stone-500 hover:text-[#B45309] transition-colors uppercase tracking-widest text-[9px] font-bold"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
