"use client";

import { motion } from "motion/react";

type MotionCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function MotionCard({ children, className }: MotionCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
