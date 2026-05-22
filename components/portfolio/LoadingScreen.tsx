"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

const steps = [
  "Initializing Sachin's runtime workspace...",
  "Formatting skills database schemas...",
  "Validating project API routes...",
  "Loading systems notebook sandbox...",
  "Workspace ready."
];

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 550);

    const endTimeout = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2800);

    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(textInterval);
      clearTimeout(endTimeout);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#FAF9F5] flex flex-col items-center justify-center text-[#1C1917]"
        >
          {/* Central Indicator */}
          <div className="relative flex flex-col items-center max-w-sm px-6">
            <motion.div
              animate={{ 
                scale: [1, 1.03, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-10 h-10 rounded bg-white border border-[#EAEAE4] flex items-center justify-center text-[#B45309] shadow-sm mb-6"
            >
              <BookOpen className="w-5 h-5" />
            </motion.div>

            {/* Title */}
            <h1 className="text-sm font-serif font-bold tracking-tight text-[#1C1917] mb-2">
              Sachin Patel<span className="text-[#B45309]">.</span>
            </h1>

            {/* Loading bar line */}
            <div className="w-32 h-[1.5px] bg-[#EAEAE4] rounded-full overflow-hidden mb-6 relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="absolute inset-y-0 w-16 bg-[#B45309]"
              />
            </div>

            {/* Step text */}
            <div className="h-6 overflow-hidden text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stepIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-stone-400 text-[10px] font-mono uppercase tracking-wider"
                >
                  {steps[stepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
