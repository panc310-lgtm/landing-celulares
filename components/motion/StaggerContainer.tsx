"use client";

import { motion } from "motion/react";

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.09,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
