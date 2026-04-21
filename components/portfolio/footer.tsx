"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            Built with{" "}
            <Heart
              size={14}
              className="text-primary fill-primary inline"
            />{" "}
            by Akansha Salwan
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top
            <ArrowUp
              size={16}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
