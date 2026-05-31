import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

type PageHeaderProps = {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
};

/**
 * PageHeader — consistent editorial page header used across all pages.
 * Big display-font title, gradient highlight, mono eyebrow pill.
 */
export function PageHeader({
  eyebrow,
  eyebrowIcon: Icon,
  title,
  highlight,
  description,
  align = "center",
}: PageHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={`mb-14 sm:mb-16 ${isCenter ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: APPLE_EASE }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-5 ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {eyebrow}
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.04, ease: APPLE_EASE }}
        className="font-display font-bold tracking-tighter leading-[0.95] text-5xl sm:text-6xl lg:text-7xl"
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient-animate">{highlight}</span>
          </>
        )}
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.18, ease: APPLE_EASE }}
        className={`h-1 w-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full mt-5 origin-left ${
          isCenter ? "mx-auto" : ""
        }`}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className={`mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
