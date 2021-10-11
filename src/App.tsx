import "./styles.css";
import React, { useState } from "react";
import s from "csd";
import styled from "styled-components";
import Drawer from "./Drawer";
import { useToggle } from "./useToggle";

const StyledApp = styled.div`
  ${s.colCenter}
  height: 80vh;

  button {
    ${s.baseButton}
    border:none;
    padding: 15px 30px;
    background-color: ${s.colors.grey[900]};
    color: white;
    ${s.h18};
    margin-right: 10px;
  }

  select {
    padding: ${s.pad.xs};
  }

  .card {
    padding: ${s.pad.xs};
    border-radius: 10px;
    box-shadow: 0 0 10px ${s.colors.blueGrey.A100};
    width: 400px;
    margin-top: 40px;
  }
`;

export default function App() {
  const drawerToggler = useToggle(false);
  const [direction, setDirection] = useState<"right" | "bottom">("right");
  const [duration, setDuration] = useState(300);

  const content = <div>content</div>;

  const drawer = (
    <div>
      {drawerToggler.on ? (
        <Drawer toggler={drawerToggler} from={direction} duration={duration}>
          {content}
        </Drawer>
      ) : null}
      <button
        onClick={drawerToggler.toggle}
      >{`show drawer from ${direction}`}</button>
    </div>
  );

  const controllers = (
    <div>
      <div className="card">
        <p>Option 1 : duration</p>
        <p>{`value: ${duration}`}</p>
        <button
          onClick={() => setDuration((prev) => (prev > 300 ? prev - 300 : 0))}
        >
          -
        </button>
        <button onClick={() => setDuration((prev) => prev + 300)}>+</button>
      </div>
      <div className="card">
        <p>Option 2 : direction</p>
        <select
          value={direction}
          onChange={(e) => {
            const value = e.target.value as 'right' | 'bottom';
            
            setDirection(value)
          }}
        >
          <option>bottom</option>
          <option>right</option>
        </select>
      </div>
    </div>
  );

  return (
    <StyledApp className="App">
      {drawer}
      {controllers}
    </StyledApp>
  );
}
