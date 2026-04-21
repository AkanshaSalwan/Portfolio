"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Only show cursor effect on desktop
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(94, 234, 212, 0.08) 0%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Secondary smaller glow that follows more closely */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 400 }}
        style={{
          background:
            "radial-gradient(circle, rgba(94, 234, 212, 0.4) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
