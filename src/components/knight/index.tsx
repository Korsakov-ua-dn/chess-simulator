import React, { CSSProperties, FC } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { ItemsTypes } from "../../const";

const knightStyle: CSSProperties = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
};

export const Knight: FC = () => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemsTypes.KNIGHT,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  const img = require("../../assets/knight.png");

  return (
    <>
      <DragPreviewImage connect={preview} src={img} />
      <div
        ref={drag}
        style={{
          ...knightStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <img src={img} alt=" " style={{
          width: '80%',
          height: '80%',
        }} />
        {/* ♘ */}
      </div>
    </>
  );
};
