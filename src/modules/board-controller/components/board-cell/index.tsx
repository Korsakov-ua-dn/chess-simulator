import React from 'react';
import { useDrop } from 'react-dnd';

import { Letter, PieceType } from '../../types';

import { Overlay } from '../overlay';

import './style.scss';

interface IProps {
  x: Letter;
  y: number;
  children?: React.ReactNode;
  black: boolean;
  move: (id: string, toX: Letter, toY: number) => void;
  canMove: (id: string, type: PieceType, toX: Letter, toY: number) => boolean;
}

export const BoardCell: React.FC<IProps> = React.memo(({
  x,
  y,
  children,
  black,
  move,
  canMove,
}) => {

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'Piece',
      canDrop: (item: any) => {
        return (
          canMove(item.id, item.type, x, y)
      )},
      drop: (item: any) => {
        move(item.id, x, y)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [canMove],
  )

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
  )
});