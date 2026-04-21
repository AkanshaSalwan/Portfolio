"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

import { Preloader } from "@/components/portfolio/preloader";
import { Navigation } from "@/components/portfolio/navigation";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { CursorEffect } from "@/components/portfolio/cursor-effect";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!showContent) return;

    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();

    // Smooth scroll sections animation
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0.8,
        },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [showContent]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen overflow-x-hidden"
      >
        {/* Custom cursor effect */}
        <CursorEffect />
        
        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <div className="relative">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Experience Section */}
          <Experience />

          {/* Projects Section */}
          <Projects />

          {/* Skills Section */}
          <Skills />

          {/* Contact Section */}
          <Contact />

          {/* Footer */}
          <Footer />
        </div>
      </motion.main>
    </>
  );
}
