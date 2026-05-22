"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Sachin is an exceptional backend engineer. He took our legacy Python structures and redesigned them into a high-throughput async FastAPI system, while seamlessly integrating custom OpenAI RAG flows that our customers love.",
    name: "Sarah Jenkins",
    role: "CTO, InnovateAI",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    tag: "AI Integration"
  },
  {
    quote: "Working with Sachin was a game-changer. He implemented our real-time messaging pipeline using Kafka and Django Channels, optimizing database queries and cutting response times by over 50%. A true professional.",
    name: "Michael Chen",
    role: "Engineering Manager, DataSync",
    image: "https://images.pexels.com/photos/2204531/pexels-photo-2204531.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    tag: "Backend & Channels"
  },
  {
    quote: "Sachin has a rare combination of machine learning expertise and deep backend engineering skills. He didn't just build our recommendation model; he deployed it securely with Docker on AWS, establishing great MLOps.",
    name: "Emily Rodriguez",
    role: "Product Owner, HealthCare IoT",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    tag: "ML & Infrastructure"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(slideNext, 8000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(slideNext, 8000);
  };

  const active = testimonials[index];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden bg-[#FAF9F5] border-t border-[#EAEAE4]">
      
      {/* Notebook guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 pl-0 sm:pl-8">
        
        {/* Header */}
        <div className="text-left mb-12">
          <span className="inline-block px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest mb-4">
            ./client_feedback
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1917] mb-4">
            What Clients <span className="text-stone-400 font-serif italic">Say About Me</span>
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Feedback from team leaders, founders, and managers on the value I bring to engineering projects.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative paper rounded-lg p-6 md:p-10 shadow-md min-h-[280px] flex flex-col justify-between overflow-hidden bg-white">
          
          {/* Quote icon watermark */}
          <div className="absolute top-6 right-8 text-stone-100 pointer-events-none">
            <Quote className="w-16 h-16 stroke-[1.5]" />
          </div>

          <div className="relative flex-1">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-6"
              >
                {/* Rating */}
                <div className="flex gap-0.5">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[#1C1917] text-base sm:text-lg font-serif italic leading-relaxed">
                  &ldquo;{active.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#EAEAE4]">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#EAEAE4] bg-stone-50">
                    <img 
                      src={active.image} 
                      alt={active.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="text-[#1C1917] font-bold text-xs">{active.name}</h4>
                    <p className="text-stone-500 text-[10px] font-mono uppercase tracking-wider">{active.role}</p>
                  </div>
                  <span className="ml-auto hidden sm:inline-block px-2.5 py-1 rounded bg-[#FAF9F5] border border-[#EAEAE4] text-[9px] font-mono text-[#B45309] font-semibold uppercase tracking-wider">
                    {active.tag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 border-t border-[#EAEAE4] pt-6">
            {/* Dots */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    resetTimer();
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1 transition-all duration-300 rounded-full ${
                    index === i ? "w-6 bg-[#B45309]" : "w-1.5 bg-stone-200 hover:bg-stone-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  resetTimer();
                  slidePrev();
                }}
                className="w-8 h-8 rounded bg-white border border-[#EAEAE4] flex items-center justify-center text-stone-500 hover:text-[#B45309] hover:border-[#B45309] transition-all duration-200 shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  resetTimer();
                  slideNext();
                }}
                className="w-8 h-8 rounded bg-white border border-[#EAEAE4] flex items-center justify-center text-stone-500 hover:text-[#B45309] hover:border-[#B45309] transition-all duration-200 shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
