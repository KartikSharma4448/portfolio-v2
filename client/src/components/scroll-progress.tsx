import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress
 * A thin gradient bar pinned to the top of the viewport that fills
 * as the user scrolls — Material/Google-style page progress.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
    />
  );
}
