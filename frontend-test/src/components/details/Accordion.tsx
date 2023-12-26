"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultActive?: boolean;
  className?: string;
  contentStyle?: React.CSSProperties;
  actionBeforeContent?: React.ReactNode;
};

export default function Accordion({
  title,
  children,
  defaultActive = false,
  className = "",
  contentStyle = {},
  actionBeforeContent,
}: AccordionProps) {
  const [isActive, setIsActive] = useState(defaultActive);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // 切换 isActive 状态来展开或收起内容
  const toggleAccordion = () => {
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [contentRef.current]);

  const animation = useSpring({
    height: isActive ? contentHeight : 0,
    opacity: isActive ? 1 : 0,
    overflow: "hidden",
    config: {
      tension: 250,
      friction: 20,
    },
  });

  return (
    <div className={`border border-[#52525B] rounded-lg ${className}`}>
      <div
        className={`bg-[#2C2D31] h-14 flex items-center justify-between cursor-pointer pl-4 pr-5 border-[#52525B]
        ${isActive ? "rounded-t-lg border-b" : "rounded-lg"}
        `}
        onClick={toggleAccordion}
      >
        <span className="font-semibold">{title}</span>

        <span className="flex gap-2.5">
          {actionBeforeContent}
          <Image
            className={`transform transition-all duration-300
          ${isActive ? "" : "rotate-180"}`}
            src="/assets/images/arrow_top.svg"
            width={18}
            height={18}
            alt="arrow"
          />
        </span>
      </div>
      <animated.div style={animation}>
        <div ref={contentRef} className="p-4" style={contentStyle}>
          {children}
        </div>
      </animated.div>
    </div>
  );
}
