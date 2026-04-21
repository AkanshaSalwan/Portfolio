"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const quickPhrases = [
  "Building experiences",
  "Crafting interfaces", 
  "Shipping pixels",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick phrase rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % quickPhrases.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Progress bar - 2 seconds total
  useEffect(() => {
    const totalDuration = 1800;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    // Complete after 2 seconds
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: onComplete,
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // GSAP floating animation for orbs
  useEffect(() => {
    const orbs = document.querySelectorAll(".preloader-orb");
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        duration: "random(1.5, 2)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="preloader-orb absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="preloader-orb absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(94,234,173,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,173,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Name with animated reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            Akansha{" "}
            <span className="text-primary">Salwan</span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-lg text-muted-foreground font-mono mb-8"
        >
          Frontend Developer
        </motion.p>

        {/* Rotating phrases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-8 mb-8 overflow-hidden"
        >
          <motion.p
            key={currentPhrase}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-primary/80 font-medium flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {quickPhrases[currentPhrase]}...
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xs"
        >
          <div className="h-1 bg-border/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground/60 font-mono mt-2 text-center">
            {Math.round(progress)}%
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm text-muted-foreground max-w-md"
        >
          Turning ideas into{" "}
          <span className="text-primary font-medium">elegant code</span>
        </motion.p>
      </div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-6 hidden md:block font-mono text-xs text-muted-foreground/40"
      >
        {"<Developer />"}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 right-6 hidden md:block font-mono text-xs text-muted-foreground/40"
      >
        {"{ ready: true }"}
      </motion.div>
    </motion.div>
  );
}
