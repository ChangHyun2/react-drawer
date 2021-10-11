import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
// export interface I_AnimationToggler {
//   on: boolean;
//   animationCSS: string;
//   handleTransitionEnd: () => void;
//   handleClose: () => void;
//   setOn: () => void;
//   setOff: () => void;
//   toggle: () => void;
// }

const useAnimationToggler = (animationStyles) => {
  const closed = useRef(false);

  const [animationCSS, setAnimationCSS] = useState(animationStyles.default);
  const [onState, setOnState] = useState(false);

  const handleClose = () => {
    setAnimationCSS((prev) => prev + animationStyles.onUnMount);
    closed.current = true;
  };

  const handleTransitionEnd = () => {
    if (!closed.current) return;

    setOnState(false);
  };

  useEffect(() => {
    if (!onState) {
      return;
    }

    setAnimationCSS((prev) => prev + animationStyles.onMount);
  }, [onState, animationStyles]);

  return {
    on: onState,
    setOn: () => setOnState(true),
    setOff: () => setOnState(false),
    toggle: () => setOnState((prev) => !prev),
    animationCSS,
    handleTransitionEnd,
    handleClose
  };
};

const AnimationDiv = styled.div`
  ${(props) => props.animationCSS}
`;

export default function Trial() {
  const animationToggler = useAnimationToggler({
    default: "color: red;",
    onMount: "color: blue;",
    onUnMount: "color: green;"
  });

  return (
    <div>
      <button onClick={animationToggler.toggle}>close in outer</button>
      {animationToggler.on ? (
        <AnimationDiv
          onTransitionEnd={animationToggler.handleTransitionEnd}
          animationCSS={animationToggler.animationCSS}
        >
          <div>used animation toggler</div>
          <button onClick={animationToggler.handleClose}>close in inner</button>
        </AnimationDiv>
      ) : null}
    </div>
  );
}
