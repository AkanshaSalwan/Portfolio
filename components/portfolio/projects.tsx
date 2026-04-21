"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "CareNow",
    subtitle: "Doctor Appointment Booking Platform",
    description:
      "A full-stack doctor appointment platform with patient authentication, doctor discovery by specialty, and real-time slot-based booking. Features Admin and Doctor dashboards with role-based access control.",
    image: "/projects/carenow.jpg",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Patient authentication and doctor discovery by specialty",
      "Real-time slot-based booking system",
      "Admin and Doctor dashboards with role-based access",
      "Day-wise slot configuration and geolocation-based search",
      "MongoDB Atlas for storage and Cloudinary for images",
    ],
    links: {
      demo: "https://care-now-4a8b.vercel.app/",
      github: "#",
    },
    featured: true,
  },
  {
    title: "Fresh Mart",
    subtitle: "E-Grocery Store",
    description:
      "A full-stack e-grocery store with a clean UI and responsive design. Features robust routing, payment gateway integration, and an admin panel for managing inventory and orders.",
    image: "/projects/freshmart.jpg",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Clean, responsive UI design",
      "Robust routing using React and Express",
      "Payment gateway with cash on delivery support",
      "Admin panel for inventory and order management",
      "User feedback system integration",
    ],
    links: {
      demo: "https://fresh-mart-xi.vercel.app/",
      github: "#",
    },
    featured: true,
  },
];

export function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on project images
      gsap.utils.toArray(".project-image").forEach((img) => {
        gsap.to(img as gsap.TweenTarget, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: img as gsap.DOMTarget,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative">
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
              Projects
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-balance">
            Featured Work
          </h3>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills in building
            full-stack applications with modern technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Project Image */}
              <div
                className={`relative overflow-hidden rounded-2xl ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="aspect-video bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="project-image w-full h-full bg-gradient-to-br from-primary/20 via-secondary to-primary/10 flex items-center justify-center">
                    {project.title === "CareNow" ? (
                      <div className="relative w-full h-full bg-card p-2">
                        <Image
                          src="/carenow.png"
                          alt="CareNow project preview"
                          fill
                          sizes="(min-width: 1024px) 560px, 100vw"
                          className="object-contain object-center rounded-xl"
                        />
                      </div>
                    ) : (
                      /* Placeholder with project initials */
                      <div className="text-6xl font-bold text-primary/30">
                        {project.title
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              </div>

              {/* Project Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-primary text-sm font-medium">
                    {project.subtitle}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {project.title}
                  </h4>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {project.highlights.slice(0, 4).map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ArrowUpRight
                        size={14}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={project.links.demo}
                    target={project.title === "CareNow" ? "_blank" : undefined}
                    rel={project.title === "CareNow" ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                  <a
                    href={project.links.github}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
