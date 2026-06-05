"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeIn({
    children,
    delay = 0,
    direction = "up",
    fullWidth = false,
    className,
}: {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    fullWidth?: boolean;
    className?: string;
}) {
    const directions = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
        none: { x: 0, y: 0 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...(directions[direction] as Record<string, number>),
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1], // Sutil Ease-Out
                delay: delay,
            }}
            className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
        >
            {children}
        </motion.div>
    );
}
