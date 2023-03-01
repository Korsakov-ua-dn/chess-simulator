import React from "react";

import "./style.scss";

interface IProps {
  color: Color;
}

export const Overlay: React.FC<IProps> = React.memo(({ color }) => {
  return (
    <div
      className="Board__overlay"
      style={{
        backgroundColor: color,
      }}
    />
  );
});

type Color = "red" | "green" | "yellow";
