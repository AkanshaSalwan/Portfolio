"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, ChevronDown } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

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

      if (imageCardRef.current) {
        gsap.fromTo(
          imageCardRef.current,
          { opacity: 0, y: 40, scale: 0.92, rotateY: -8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 1,
            delay: 0.35,
            ease: "power3.out",
          }
        );

        gsap.to(imageCardRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero-photo-glow", {
          opacity: 0.65,
          scale: 1.08,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
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

          {/* Right side - Profile photo */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block relative"
          >
            <div ref={imageCardRef} className="relative mx-auto w-full max-w-[300px] xl:max-w-[340px] [perspective:1000px] lg:ml-auto">
              <div className="hero-photo-glow absolute -inset-6 rounded-full bg-gradient-to-r from-primary/30 via-cyan-400/10 to-primary/20 blur-2xl opacity-40" />
              <div className="relative rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_45%)] pointer-events-none" />
                <div className="relative aspect-square overflow-hidden rounded-full border border-white/10">
                  <Image
                    src="/my img.png"
                    alt="Akansha Salwan portrait"
                    fill
                    sizes="(min-width: 1024px) 420px, 0px"
                    className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
                <div className="pointer-events-none absolute top-5 left-10 h-1.5 w-16 rounded-full bg-white/30" />
              </div>
              <div className="pointer-events-none absolute -right-4 top-8 h-12 w-12 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md" />
              <div className="pointer-events-none absolute -left-4 bottom-10 h-10 w-10 rounded-full border border-cyan-300/40 bg-cyan-400/10" />
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
