"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Briefcase, Code, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: "Years Experience", value: "2+", icon: Briefcase },
  { label: "Projects Completed", value: "10+", icon: Code },
  { label: "Performance Boost", value: "80%", icon: Award },
  { label: "Education", value: "B.Tech", icon: GraduationCap },
];

const highlightWords = ["React.js", "Next.js", "Frontend Developer", "80%", "70%"];

function HighlightedText({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Check if any highlight word is in the text
  let parts: (string | JSX.Element)[] = [children];
  
  highlightWords.forEach((word) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return part;
      const regex = new RegExp(`(${word})`, "gi");
      return part.split(regex).map((segment, i) => {
        if (segment.toLowerCase() === word.toLowerCase()) {
          return (
            <motion.span
              key={`${word}-${i}`}
              className="relative inline-block text-primary font-medium"
              initial={{ backgroundSize: "0% 100%" }}
              animate={isInView ? { backgroundSize: "100% 100%" } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                backgroundImage: "linear-gradient(to right, rgba(94, 234, 173, 0.2), rgba(94, 234, 173, 0.1))",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%",
              }}
            >
              {segment}
            </motion.span>
          );
        }
        return segment;
      });
    });
  });

  return <span ref={ref}>{parts}</span>;
}

function AnimatedParagraph({ children, delay = 0 }: { children: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="text-muted-foreground leading-relaxed"
    >
      <HighlightedText>{children}</HighlightedText>
    </motion.p>
  );
}

function CountUpStat({ value, label, icon: Icon, index }: { value: string; label: string; icon: typeof Briefcase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const valueEl = ref.current.querySelector(".stat-value");
    if (!valueEl) return;

    gsap.fromTo(
      { val: 0 },
      { val: numericValue },
      {
        val: numericValue,
        duration: 1.5,
        delay: index * 0.1,
        ease: "power2.out",
        onUpdate: function() {
          if (valueEl) {
            valueEl.textContent = Math.round(this.targets()[0].val) + suffix;
          }
        },
      }
    );
  }, [isInView, numericValue, suffix, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative space-y-3">
        <motion.div 
          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-5 h-5 text-primary" />
        </motion.div>
        <div>
          <p className="stat-value text-3xl font-bold text-foreground">
            {value}
          </p>
          <p className="text-sm text-muted-foreground">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // GSAP text reveal animation for heading
  useEffect(() => {
    if (!headingRef.current || !isInView) return;

    const words = headingRef.current.querySelectorAll(".word");
    
    gsap.fromTo(
      words,
      { 
        y: 50, 
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );
  }, [isInView]);

  // Split heading text for word-by-word animation
  const headingText = "Crafting Digital Experiences with Modern Technologies";
  const words = headingText.split(" ");

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <motion.span 
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px flex-1 bg-border origin-left" 
              />
              <h2 className="text-sm font-medium text-primary uppercase tracking-wider">
                About Me
              </h2>
              <motion.span 
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px flex-1 bg-border origin-right" 
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              {/* Animated Heading */}
              <h3 
                ref={headingRef}
                className="text-3xl sm:text-4xl font-bold text-balance"
                style={{ perspective: "1000px" }}
              >
                {words.map((word, i) => (
                  <span
                    key={i}
                    className="word inline-block mr-2"
                    style={{
                      color: word === "Modern" || word === "Technologies" ? "var(--primary)" : "inherit",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h3>
              
              <div className="space-y-4">
                <AnimatedParagraph delay={0.1}>
                  I&apos;m a passionate Frontend Developer with hands-on experience in building scalable web applications using React.js and Next.js. Currently working at NNIIT, an EdTech platform, where I develop internal management systems that drive real business impact.
                </AnimatedParagraph>
                <AnimatedParagraph delay={0.2}>
                  My journey in web development has equipped me with strong skills in responsive UI development, REST API integration, and performance optimization. I&apos;ve contributed to features that resulted in a 70% increase in sales conversions and improved application performance by up to 80%.
                </AnimatedParagraph>
                <AnimatedParagraph delay={0.3}>
                  I believe in writing clean, maintainable code and creating user-centric interfaces that not only look great but also provide exceptional user experiences.
                </AnimatedParagraph>
              </div>

              {/* Education with reveal animation */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-4"
              >
                <motion.div 
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                  whileHover={{ scale: 1.02, borderColor: "rgba(94, 234, 173, 0.5)" }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Bachelor of Technology in Computer Engineering
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Bapurao Deshmukh College of Engineering
                    </p>
                    <motion.p 
                      className="text-sm text-primary font-medium"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.7 }}
                    >
                      2020 - 2024 • CGPA: 7.5
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right - Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <CountUpStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Scroll-triggered quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center pt-8"
          >
            <motion.blockquote 
              className="relative max-w-2xl mx-auto"
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 0.5 }}
            >
              <span className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">&ldquo;</span>
              <p className="text-xl text-muted-foreground italic px-8">
                Code is poetry written in logic. Every line tells a story of{" "}
                <span className="text-primary font-medium">problem-solving</span> and{" "}
                <span className="text-primary font-medium">creativity</span>.
              </p>
              <span className="absolute -bottom-8 -right-2 text-6xl text-primary/20 font-serif">&rdquo;</span>
            </motion.blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
