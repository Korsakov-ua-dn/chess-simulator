import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { IPiece, Position } from '../../types';

import './style.scss';

interface IProps {
  piece: IPiece;
  position: Position;
}

export const Piece: React.FC<IProps> = React.memo(({ piece, position }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      item: { type: piece.type, id: position },
      type: 'Piece',
      collect: (monitor) => {
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
});
