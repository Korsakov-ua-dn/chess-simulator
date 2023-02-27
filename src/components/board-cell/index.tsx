import { FC, ReactNode, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { ItemsTypes } from '../../const'
import { Letter } from '../../Game'
import { useAppDispatch } from '../../hooks'
import { boardActions, Position } from '../../store/board-slice'
import { Cell } from '../cell'
import { Overlay, OverlayType } from '../overlay'


export interface BoardSquareProps {
  x: Letter;
  y: number;
  children?: ReactNode;
  // game: Game;
  black: boolean;
  // knightPosition: Position;
  moveKnight: (toX: Letter, toY: number) => void;
  canMoveKnight: (toX: Letter, toY: number) => boolean;
}

export const BoardCell: FC<BoardSquareProps> = ({
  x,
  y,
  children,
  black,
  moveKnight,
  canMoveKnight,
}: BoardSquareProps) => {
  // const dispatch = useAppDispatch();

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemsTypes.KNIGHT,
      // canDrop: canDropCallback,
      canDrop: () => {
        // console.log("my", canMoveKnight(x, y));
        // console.log("game", game.canMoveKnight(x, y));
        return (
          canMoveKnight(x, y)
          // game.canMoveKnight(x, y)
      )},
      // drop: dropCallback,
      drop: () => {
        moveKnight(x, y)
        // game.moveKnight(x, y)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [moveKnight, canMoveKnight],
  )

  const img = require("../../assets/knight.png");

  return (
    <div
      ref={drop}
      role="Space"
      data-testid={`(${x},${y})`}
      style={{
        position: 'relative',
        width: '64px',
        height: '64px',
      }}
    >
      <Cell black={black}>{children}</Cell>
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  )
}
