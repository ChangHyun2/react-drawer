import React from "react";

export interface I_Toggler {
  on: boolean;
  setOn: () => void;
  setOff: () => void;
  toggle: () => void;
}

export const useToggle = (
  option: { initialOn: boolean } | boolean
): I_Toggler => {
  const [onState, setOnState] = React.useState(
    typeof option === "object" ? option.initialOn : option
  );

  return {
    on: onState,
    setOn: () => setOnState(true),
    setOff: () => setOnState(false),
    toggle: () => setOnState((prev) => !prev)
  };
};
