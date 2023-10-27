"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
export interface CircleProps {
  children?: ReactNode;
  from: number;
  to: number;
  theme: "light" | "dark";
}
export default function Circle({ children, to, from, theme }: CircleProps) {
  if (to < from) to += 12;
  const range = ((to - from) / 12) * 150;
  const rotation = ((to - 3) * 30) % 360;

  const timeInColor = theme === "dark" ? "#facc15" : "#15803d";
  const timeOutColor = theme === "dark" ? "white" : "white";
  return (
    <div className="relative ">
      <svg
        height="50"
        width="50"
        style={{ transform: `rotate(${rotation}deg)` }}
        className={`rotate-[${((from - 2) * 30) % 360}deg]`}
      >
        <motion.circle
          cx="25"
          cy="25"
          r="23"
          stroke="currentColor"
          fill="none"
          strokeWidth={4}
          style={{ color: timeInColor }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
        <circle
          cx="25"
          cy="25"
          r="23"
          stroke="currentColor"
          fill="none"
          strokeWidth={4.5}
          style={{ color: timeOutColor }}
          strokeDashoffset={range}
          strokeDasharray={150}
          className=""
        />
      </svg>
      <div className="absolute inset-0 margin-auto flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
