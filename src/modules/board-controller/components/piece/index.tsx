import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { Color, PieceType, Position } from '../../types';

import './style.scss';

interface IProps {
  type: PieceType;
  color: Color;
  position: Position;
}

export const Piece: React.FC<IProps> = React.memo(
  ({ type, color, position }) => {
    const [{ isDragging }, drag, preview] = useDrag(
      () => ({
        item: { type, id: position },
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

    const img = require(`../../assets/${type}_${color}.png`);

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
          <img src={img} alt={`chess piece: ${type}, color: ${color}`} />
        </div>
      </>
    );
  }
);
