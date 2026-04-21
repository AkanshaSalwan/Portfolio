"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "Express.js", level: 75 },
    ],
  },
  {
    title: "Tools & Methods",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Figma", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Agile/Scrum", level: 85 },
    ],
  },
];

const techLogos = [
  "React", "Next.js", "JavaScript", "TypeScript", "Tailwind", 
  "Node.js", "MongoDB", "Git", "Figma", "HTML5", "CSS3"
];

export function Skills() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      // Infinite marquee animation
      gsap.to(".marquee-content", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-medium text-primary uppercase tracking-wider">
              Skills
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-balance">
            Technologies & Expertise
          </h3>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies for building
            exceptional web applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              className="p-6 bg-card rounded-2xl border border-border"
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">
                {category.title}
              </h4>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h4 className="text-lg font-semibold text-foreground mb-6 text-center">
            Soft Skills
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Effective Communication",
              "Leadership",
              "Time Management",
              "Decision Making",
              "Code Reviews",
              "Documentation",
              "Performance Optimization",
              "Agile/Scrum",
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                className="px-4 py-2 bg-card text-foreground font-medium rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div ref={marqueeRef} className="w-full overflow-hidden py-8 border-y border-border bg-secondary/30">
        <div className="marquee-content flex items-center gap-12 whitespace-nowrap">
          {[...techLogos, ...techLogos].map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
                  {tech.charAt(0)}
                </span>
              </div>
              <span className="text-lg font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
