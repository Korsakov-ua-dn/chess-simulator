import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { ItemsTypes } from '../../const';
import { Letter, PieceType } from '../../store/board-slice';

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

export const BoardCell: React.FC<IProps> = ({
  x,
  y,
  children,
  black,
  move,
  canMove,
}) => {

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemsTypes.KNIGHT,
      // canDrop: canDropCallback,
      canDrop: (item: any) => {
        // console.log(item);
        // console.log("my", canMoveKnight(x, y));
        // console.log("game", game.canMoveKnight(x, y));
        return (
          canMove(item.id, item.type, x, y)
          // game.canMoveKnight(x, y)
      )},
      // drop: dropCallback,
      drop: (item: any) => {
        // console.log(item);
        move(item.id, x, y)
        // game.moveKnight(x, y)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [move, canMove],
  )

  const classN = `Board__cell ${black ? 'black' : ''}`;

  return (
    <div
      className={classN}
      ref={drop}
      data-coords={`(${x},${y})`}
    >
      {children}
      {isOver && !canDrop && <Overlay color={'red'} />}
      {!isOver && canDrop && <Overlay color={'yellow'} />}
      {isOver && canDrop && <Overlay color={'green'} />}
    </div>
  )
}
