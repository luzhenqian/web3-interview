"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Accordion({ title, children }: AccordionProps) {
  const [isActive, setIsActive] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 切换 isActive 状态来展开或收起内容
  const toggleAccordion = () => {
    setIsActive((prevState) => !prevState);
  };

  // 使用 react-spring 进行动画效果
  const animation = useSpring({
    height: isActive ? contentRef.current?.scrollHeight || 0 : 0,
    opacity: isActive ? 1 : 0,
    overflow: "hidden",
    config: {
      tension: 250,
      friction: 20,
    },
  });

  return (
    <div>
      <button onClick={toggleAccordion} style={{ marginBottom: "10px" }}>
        {title}
      </button>
      <animated.div style={animation}>
        <div ref={contentRef} style={{ padding: "10px 20px" }}>
          {children}
        </div>
      </animated.div>
    </div>
  );
}
