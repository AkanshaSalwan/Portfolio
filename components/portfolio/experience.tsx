"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Frontend Developer",
    company: "NNIIT",
    companyDescription: "EdTech Platform",
    location: "Hyderabad, Telangana",
    type: "On-site",
    period: "July 2025 – Present",
    highlights: [
      "Developed and maintained scalable web applications using Next.js and React.js for internal EdTech platforms",
      "Designed and implemented features for Student Management, Tutor Management, Sales Management, and Operations Management modules",
      "Built a Resource Management module for uploading, organizing, and managing learning materials and documents",
      "Implemented responsive and user-friendly UI components, converted Figma designs into production-ready code",
      "Developed features contributing to 70% increase in sales and user conversions",
      "Improved user engagement by 20% through UI/UX enhancements",
      "Optimized frontend performance, improving application speed and efficiency by up to 80%",
    ],
    technologies: ["Next.js", "React.js", "Tailwind CSS", "REST APIs", "Figma"],
  },
  {
    title: "Frontend Developer",
    company: "Avalanche Hi-Tech Enterprise",
    companyDescription: "Tech Enterprise",
    location: "Nagpur, Maharashtra",
    type: "Remote",
    period: "Jan 2024 – Jan 2025",
    highlights: [
      "Developed and maintained responsive web applications using React.js, JavaScript, HTML5, and CSS3",
      "Delivered scalable and user-friendly solutions for diverse client requirements",
      "Designed dynamic UIs and converted Figma designs into optimized React.js components",
      "Integrated REST APIs for seamless and scalable application functionality",
      "Collaborated with cross-functional teams using Git and Agile methodologies",
      "Optimized frontend performance to improve load times and responsiveness across devices",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Git", "REST APIs"],
  },
];

export function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative">
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
              Experience
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-balance">
            Where I&apos;ve Worked
          </h3>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border">
            <div className="timeline-line absolute inset-0 bg-primary origin-top" />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/25" />

                {/* Card */}
                <div
                  className={`ml-8 md:ml-0 ${
                    index % 2 === 0
                      ? "md:pr-12"
                      : "md:col-start-2 md:pl-12"
                  }`}
                >
                  <div className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative space-y-4">
                      {/* Header */}
                      <div className={`space-y-2 ${index % 2 === 0 ? "" : "md:items-end md:text-right"}`}>
                        <div className={`flex flex-wrap items-center gap-2 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                            {exp.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-foreground">
                          {exp.title}
                        </h4>
                        <div className={`flex items-center gap-2 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                          <span className="text-primary font-medium">
                            {exp.company}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {exp.companyDescription}
                          </span>
                        </div>
                        <div className={`flex items-center gap-1 text-sm text-muted-foreground ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                          <MapPin size={14} />
                          {exp.location}
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className={`space-y-2 text-sm text-muted-foreground ${index % 2 === 0 ? "" : "md:text-left"}`}>
                        {exp.highlights.slice(0, 4).map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ArrowUpRight
                              size={14}
                              className="text-primary mt-1 flex-shrink-0"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className={`flex flex-wrap gap-2 pt-2 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
