"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, Phone } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const infoRef = useRef(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-60px" });

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setError("Please fill out all required fields.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Direct Email",
      value: "sachinpatel7496007@gmail.com",
      href: "mailto:sachinpatel7496007@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Ahmedabad, Gujarat",
      href: "#",
    },
    {
      icon: Phone,
      title: "Phone / Contact",
      value: "+91 9824117496",
      href: "tel:+919824117496",
    }
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[#FAF9F5] border-t border-[#EAEAE4]">
      
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
            ./open_connection
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1917] mb-4">
            Let&apos;s Build <span className="text-stone-400 font-serif italic">Something Great</span>
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Have a project in mind, an opportunity to discuss, or just want to chat about Python &amp; LLMs? Drop me a line.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct info */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: -20 }}
            animate={infoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="paper rounded-lg p-6 md:p-8 space-y-8 bg-white">
              <div>
                <h3 className="text-sm font-bold text-[#1C1917] mb-2 font-mono uppercase tracking-wider">Connect Channels</h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Feel free to use direct channels or send a secure note via the adjacent form interface.
                </p>
              </div>

              {/* Links */}
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.title}
                      href={info.href}
                      className="flex items-center gap-4 group p-3 rounded border border-transparent hover:border-[#EAEAE4] hover:bg-[#FAF9F5] transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded bg-[#FAF9F5] border border-[#EAEAE4] flex items-center justify-center text-[#B45309] group-hover:border-[#B45309] transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-stone-500 text-[9px] font-mono font-semibold uppercase tracking-wider">{info.title}</h4>
                        <p className="text-[#1C1917] text-xs font-semibold group-hover:text-[#B45309] transition-colors mt-0.5">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Status Banner */}
              <div className="pt-6 border-t border-[#EAEAE4]">
                <div className="flex items-center gap-3 px-4 py-3 rounded bg-[#B45309]/5 border border-[#B45309]/15 text-[#B45309]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-pulse flex-shrink-0" />
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold">Accepting inquiries &amp; contracts</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Secure Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 20 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="paper rounded-lg p-6 md:p-8 relative overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-stone-500 text-[10px] font-mono uppercase tracking-widest">
                          ./sender_name <span className="text-[#B45309]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 rounded bg-[#FAF9F5] border border-[#EAEAE4] focus:border-[#B45309] focus:bg-white text-[#1C1917] placeholder-stone-400 outline-none transition-all duration-200 text-xs"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-stone-500 text-[10px] font-mono uppercase tracking-widest">
                          ./sender_email <span className="text-[#B45309]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded bg-[#FAF9F5] border border-[#EAEAE4] focus:border-[#B45309] focus:bg-white text-[#1C1917] placeholder-stone-400 outline-none transition-all duration-200 text-xs"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-stone-500 text-[10px] font-mono uppercase tracking-widest">
                        ./subject_line
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="Inquiry Topic"
                        className="w-full px-4 py-3 rounded bg-[#FAF9F5] border border-[#EAEAE4] focus:border-[#B45309] focus:bg-white text-[#1C1917] placeholder-stone-400 outline-none transition-all duration-200 text-xs"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-stone-500 text-[10px] font-mono uppercase tracking-widest">
                        ./message_body <span className="text-[#B45309]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Type message here..."
                        className="w-full px-4 py-3 rounded bg-[#FAF9F5] border border-[#EAEAE4] focus:border-[#B45309] focus:bg-white text-[#1C1917] placeholder-stone-400 outline-none transition-all duration-200 text-xs resize-none"
                      />
                    </div>

                    {error && <p className="text-rose-600 text-xs font-mono">{error}</p>}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded bg-[#1C1917] hover:bg-[#B45309] text-[#FAF9F5] font-mono text-[10px] uppercase tracking-widest disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 font-bold"
                    >
                      {loading ? (
                        <>
                          <div className="w-3.5 h-3.5 rounded-full border border-white/30 border-t-white animate-spin" />
                          Sending packets...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          ./submit_inquiry
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-center py-10 px-4 space-y-6"
                  >
                    <div className="inline-flex w-12 h-12 rounded-full bg-[#B45309]/5 border border-[#B45309]/20 items-center justify-center text-[#B45309] mb-2 animate-pulse">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-bold text-[#1C1917] font-mono uppercase tracking-wider">./transmission_complete</h3>
                      <p className="text-stone-500 text-xs max-w-xs mx-auto leading-relaxed">
                        Secure message packets successfully transmitted. I will reply via direct email soon.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-5 py-2 rounded bg-[#FAF9F5] border border-[#EAEAE4] text-stone-600 font-mono text-[10px] uppercase tracking-widest hover:border-[#B45309] hover:text-[#B45309] transition-all duration-200"
                    >
                      ./send_another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
