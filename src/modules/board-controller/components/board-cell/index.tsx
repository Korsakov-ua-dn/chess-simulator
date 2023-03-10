import React, { MutableRefObject } from 'react';
import { useDrop } from 'react-dnd';

import { Letter, PieceType, Position } from '../../types';

import { Overlay } from '../overlay';

import './style.scss';

interface IProps {
  x: Letter;
  y: number;
  children?: React.ReactNode;
  black: boolean;
  move: (position: Position, toX: Letter, toY: number) => void;
  canMoveRef: MutableRefObject<
    (
      position: Position,
      pieceType: PieceType,
      toX: Letter,
      toY: number
    ) => boolean
  >;
}

export const BoardCell: React.FC<IProps> = React.memo(
  ({ x, y, children, black, move, canMoveRef }) => {
    const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: 'Piece',
        canDrop: (item: { type: PieceType; id: Position }) => {
          return canMoveRef.current(item.id, item.type, x, y);
        },
        drop: (item: { type: PieceType; id: Position }) => {
          move(item.id, x, y);
        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
      }),
      []
    );

    const classN = `Board__cell ${black ? 'black' : ''}`;

    return (
      <div
        className={classN}
        ref={drop}
        data-coords={`(${x}, ${y})`} // only for check
      >
        {children}
        {isOver && !canDrop && <Overlay color={'red'} />}
        {!isOver && canDrop && <Overlay color={'yellow'} />}
        {isOver && canDrop && <Overlay color={'green'} />}
      </div>
    );
  }
);
