"use client";
import React, { ReactNode, useMemo, useState } from "react";
import {
  PanInfo,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

function modulo(m: number, n: number) {
  return ((m % n) + n) % n;
}

export default function DiscountStack({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const discounts = useMemo(() => React.Children.toArray(children), [children]);
  const cardsLength = discounts.length;
  const [front, setFront] = useState(0);
  const [swipeKeyframes, setSwipeKeyframes] = useState(0);
  function dragEnd(event: any, info: PanInfo) {
    if (Math.abs(info.velocity.y) > 100 && Math.abs(info.offset.y) > 100) {
      setFront((front) => (front + 1) % cardsLength);
      setSwipeKeyframes(info.offset.y);
    }
  }

  return (
    <div className={`${className} w-full mt-8 relative `}>
      <ul>
        {discounts.map((discount, index) => {
          const diff = modulo(index - front, cardsLength);
          return (
            <motion.li
              className={"w-[350px] absolute inset-x-0 m-auto"}
              key={index}
              initial={false}
              animate={{
                zIndex:
                  diff === cardsLength - 1
                    ? [cardsLength, cardsLength - diff]
                    : cardsLength - diff,
                scale: 1.0 - 0.05 * diff,
                y:
                  diff === cardsLength - 1
                    ? [swipeKeyframes, -30 * diff]
                    : -30 * diff,
                filter: `brightness(${1 - diff * SCALE_FACTOR})`,
              }}
              drag={front === index ? "y" : false}
              onDragEnd={dragEnd}
              dragSnapToOrigin
            >
              {discount}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
