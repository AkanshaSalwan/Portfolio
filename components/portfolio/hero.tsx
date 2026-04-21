"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Linkedin, Mail, MapPin, ChevronDown } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Floating animation for background elements
      gsap.to(".floating-shape", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: "random",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="floating-shape absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="floating-shape absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="floating-shape absolute top-1/2 right-1/3 w-64 h-64 bg-primary/8 rounded-full blur-2xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div
          ref={textRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
        >
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance"
            >
              Hi, I&apos;m{" "}
              <span className="text-primary relative">
                Akansha Salwan
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C50 4 100 2 198 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-primary/40"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-muted-foreground font-medium"
            >
              Frontend Developer
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty"
            >
              Building scalable EdTech platforms and management dashboards with
              React.js and Next.js. Passionate about creating responsive,
              user-friendly interfaces with exceptional performance.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground"
            >
              <MapPin size={16} className="text-primary" />
              <span>Amravati, Maharashtra, India</span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Get in Touch
                <Mail size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all duration-300 border border-border"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-300 border border-border"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </motion.div>
          </div>

          {/* Right side - Code snippet decoration */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block relative"
          >
            <div className="relative bg-card rounded-2xl border border-border p-6 shadow-2xl shadow-black/20">
              {/* Window controls */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">developer.tsx</span>
              </div>
              
              {/* Code content */}
              <pre className="text-sm font-mono leading-relaxed overflow-hidden">
                <code>
                  <span className="text-muted-foreground">{"// "}</span>
                  <span className="text-primary/60">Building the future</span>
                  {"\n\n"}
                  <span className="text-primary">const</span>
                  <span className="text-foreground"> developer</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="text-primary">{"{"}</span>
                  {"\n"}
                  <span className="text-muted-foreground">{"  name: "}</span>
                  <span className="text-green-400">{'"Akansha Salwan"'}</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  <span className="text-muted-foreground">{"  role: "}</span>
                  <span className="text-green-400">{'"Frontend Developer"'}</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  <span className="text-muted-foreground">{"  skills: "}</span>
                  <span className="text-primary">[</span>
                  {"\n"}
                  <span className="text-green-400">{"    'React.js'"}</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  <span className="text-green-400">{"    'Next.js'"}</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  <span className="text-green-400">{"    'Tailwind CSS'"}</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  <span className="text-primary">{"  ]"}</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  <span className="text-muted-foreground">{"  passion: "}</span>
                  <span className="text-green-400">{'"Creating experiences"'}</span>
                  {"\n"}
                  <span className="text-primary">{"}"}</span>
                  <span className="text-muted-foreground">;</span>
                </code>
              </pre>

              {/* Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
