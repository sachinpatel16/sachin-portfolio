"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        setProgress((scrolled / totalHeight) * 100);
      }

      setVisible(scrolled > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Circumference of 18px radius circle is 2 * pi * r = ~113
  const strokeDashoffset = 113 - (113 * progress) / 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          onClick={handleScrollTop}
          className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full bg-white border border-[#EAEAE4] shadow-md flex items-center justify-center text-stone-500 hover:text-[#B45309] hover:border-[#B45309] transition-all duration-200"
          aria-label="Scroll to top"
        >
          {/* Scroll progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="transparent"
              stroke="#FAF9F5"
              strokeWidth="2"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="transparent"
              stroke="#B45309"
              strokeWidth="2"
              strokeDasharray="113"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp className="w-4 h-4 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
