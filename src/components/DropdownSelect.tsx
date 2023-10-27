"use client";
import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { useToggleManager } from "@/hooks/useToggleManager";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
interface DropDownSelectProps {
  options?: string[];
  onChange?: (selected: string) => void;
  className?: string;
  selected?: string | null;
}

export function DropDownSelect({
  selected: preselected = null,
  options = [],
  onChange,
  className = "",
}: DropDownSelectProps) {
  const [selected, setSelected] = useState<string | null>(preselected);

  const {
    isActive: isMenuActive,
    setActive: setMenuActive,
    setInactive: setMenuInactive,
    toggleActive: toggleMenuActive,
  } = useToggleManager();

  const handleSelectionChange = (selection: string) => {
    setSelected((prev) => {
      prev !== selection && onChange && onChange(selection);
      setMenuInactive();
      return selection;
    });
  };
  return (
    <div className={`${className} relative`}>
      <button
        className={`hover:brightness-90 bg-neutral-200 w-full text-neutral-800 rounded flex justify-between items-center px-2 py-1`}
        onClick={toggleMenuActive}
      >
        <span>{selected ? selected : "Select"}</span>
        <motion.span
          initial={{ transform: "rotate(0deg)" }}
          animate={{
            transform: isMenuActive ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ArrowIcon direction="down" className="w-4 text-neutral-600 h-4" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isMenuActive && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="mt-1 rounded absolute z-10 w-full bg-neutral-100 max-h-[150px] overflow-auto"
          >
            <ul className="py-1">
              {options.map((option) => {
                return (
                  <li key={option}>
                    <button
                      onClick={() => handleSelectionChange(option)}
                      className="active:bg-teal-700 active:font-medium active:text-neutral-100 py-1.5 px-2 w-full h-full hover:text-neutral-100 hover:font-medium hover:bg-teal-700 flex text-neutral-800"
                    >
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
