"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#EAEAE4] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Elegant Serif name */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group text-left"
              whileHover={{ scale: 1.005 }}
            >
              <span className="font-serif text-lg font-bold tracking-tight text-[#1C1917] group-hover:text-[#B45309] transition-colors">
                Sachin Patel<span className="text-[#B45309]">.</span>
              </span>
            </motion.button>

            {/* Desktop Nav - Book layout style */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-[#B45309] font-bold"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {activeSection === link.href.replace("#", "") && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#B45309]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
              
              {/* CV Download button */}
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="ml-3 px-4 py-2 font-mono text-[10px] uppercase tracking-widest bg-white border border-[#EAEAE4] text-[#1C1917] hover:border-[#B45309] hover:text-[#B45309] transition-all duration-200 flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3 h-3 text-stone-500" />
                CV
              </motion.a>

              <motion.button
                onClick={() => handleNavClick("#contact")}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 font-mono text-[10px] uppercase tracking-widest bg-[#1C1917] text-[#FAF9F5] hover:bg-[#B45309] transition-colors duration-200"
              >
                Hire
              </motion.button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-stone-500 hover:text-[#1C1917] p-2 hover:bg-stone-100 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-[#FAF9F5] pt-24 px-6 flex flex-col gap-2"
          >
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-stone-500 hover:text-[#1C1917] p-2 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-4 py-3 font-mono text-xs uppercase tracking-widest border-b border-[#EAEAE4] ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#B45309] font-bold"
                    : "text-stone-500 hover:text-[#1C1917]"
                }`}
              >
                {link.label}
              </motion.button>
            ))}
            
            <motion.a
              href="/resume.pdf"
              download
              className="mt-6 px-4 py-3 font-mono text-xs uppercase tracking-widest bg-white border border-[#EAEAE4] text-[#1C1917] text-center flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download CV
            </motion.a>

            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="px-4 py-3 font-mono text-xs uppercase tracking-widest bg-[#1C1917] text-[#FAF9F5] text-center"
            >
              Hire
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
