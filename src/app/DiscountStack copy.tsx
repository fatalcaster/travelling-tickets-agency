"use client";
import React, { ReactNode, useState } from "react";
import {
  PanInfo,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

function moveFrontToBack<T>(arr: Array<T>) {
  const newArr = Array<T>(arr.length);

  for (let i = 1; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  newArr.push(arr[0]);
  return newArr;
}

export default function DiscountStack({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const [discounts, setDiscounts] = useState(React.Children.toArray(children));

  const [dragStart, setDragStart] = useState(0);
  const moveToEnd = (from: number) => {
    moveFrontToBack(discounts);
  };

  const y = useMotionValue(0);
  const scale = useTransform(y, [-175, 0, 175], [1, 0.5, 1]);

  const shadowBlur = useTransform(y, [-175, 0, 175], [0, 25, 0]);

  const shadowOpacity = useTransform(y, [-175, 0, 175], [0, 0.2, 0]);

  const boxShadow = useMotionTemplate`0 ${shadowBlur}px 25px -5px rgba(0, 0, 0, ${shadowOpacity})`;

  const animateCardSwipe = (animation: number) => {
    setDragStart(animation);

    setTimeout(() => {
      setDragStart(0);

      y.set(0);

      moveToEnd(0);
    }, 200);
  };

  const onDragEnd = (info: PanInfo) => {
    if (info.offset.y >= 100) animateCardSwipe(175);
    else if (info.offset.y <= -100) animateCardSwipe(-175);
  };

  return (
    <div
      className={`${className} w-full justify-center items-center flex mt-8 relative z-0`}
    >
      <ul>
        {discounts.map((discount, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={index}
              className="absolute max-w-[350px] inset-0 m-auto w-[80vw] min-w-[300px] rounded-2xl"
              style={{
                transformOrigin: "top center",
                cursor: !index ? "grab" : "pointer",
              }}
              animate={{
                translateY: index * -CARD_OFFSET * 2,
                scale: 1 - index * SCALE_FACTOR,
                filter: `brightness(${1 - index * SCALE_FACTOR})`,
                zIndex: discounts.length - index,
              }}
              drag={canDrag ? "y" : false}
              dragMomentum={false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              // onDragStart={(e, info) => {if(info.delta.y)}}
              onDragEnd={(_, info) => {
                moveToEnd(index);
              }}
              {...(index && {
                onClick: () => {
                  moveToEnd(0);
                },
              })}
            >
              {discount}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
