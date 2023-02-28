import type { FC } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

import { IPiece } from "../../store/board-slice";
import { ItemsTypes } from "../../const";

import './style.scss';

interface IProps {
  piece: IPiece;
  id: string;
}

export const Piece: FC<IProps> = ({ piece, id }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      item: { type: piece.type, id },
      type: ItemsTypes.KNIGHT,
      collect: (monitor) => {
        // console.log(monitor);
        return {
          item: monitor.getItem(),
          isDragging: !!monitor.isDragging(),
        };
      },
    }),
    []
  );

  const img = require(`../../assets/${piece.type}_${piece.color}.png`);

  return (
    <>
      <DragPreviewImage connect={preview} src={img} />
      <div
      className="Piece"
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <img
          src={img}
          alt={`chess piece: ${piece.type}, color: ${piece.color}`}
        />
      </div>
    </>
  );
};
