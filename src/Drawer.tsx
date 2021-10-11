import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import s from "csd";
import styled from "styled-components";
import { I_Toggler } from "./useToggle";

interface I_DrawerProps {
  children?: JSX.Element | string;
  toggler: I_Toggler;
  duration?: number;
  from?: "bottom" | "right";
}

const StyledDrawer = styled.nav`
  ${s.colCenter}
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;

  ${(props: { animation: string; duration: number }) =>
    `${props.animation};
    transition-duration:${props.duration}ms;
  `}

  .content {
    ${s.h22}
    ${s.bold}
    ${s.colCenter}

    button {
      border-radius: 5px;
      font-size: 32px;
      ${s.baseButton};
      width: 100px;
      height: 100px;
      background-color: ${s.colors.deepOrange[200]};
      color: black;
    }
  }
`;

const animationStyles = {
  right: {
    default: ` 
    color:white;
    transition: transform 300ms; transform:translateX(100vw);
    `,
    onMount: "transform:translateX(calc(100vw - 100%));",
    onUnMount: "transform:translateX(100vw);"
  },
  bottom: {
    default: `
    color:white;
    transition: transform 300ms; transform: translateY(100vh);`,
    onMount: "transform: translateY(0);",
    onUnMount: "transform: translateY(100vh);"
  }
};

export default function Drawer({
  toggler,
  from = "right",
  duration,
  children
}: I_DrawerProps) {
  const closed = useRef(false);
  const [animation, setAnimation] = useState(animationStyles[from].default);

  const handleClose = () => {
    setAnimation((prev) => prev + animationStyles[from].onUnMount);
    closed.current = true;
  };

  const handleTransitionEnd = () => {
    if (!closed.current) return;

    toggler.setOff();
  };

  useEffect(() => {
    setAnimation((prev) => prev + animationStyles[from].onMount);
  }, [toggler.on, from]);

  return ReactDOM.createPortal(
    <StyledDrawer
      animation={animation}
      duration={duration}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="content">
        <button onClick={handleClose}>off</button>
        {children}
      </div>
    </StyledDrawer>,
    document.body
  );
}
