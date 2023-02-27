import { FC, ReactNode, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { ItemsTypes } from '../../const'
import Game, { Letter } from '../../Game'
import { useAppDispatch } from '../../hooks'
import { boardActions, Position } from '../../store/board-slice'
import { Cell } from '../cell'
import { Overlay, OverlayType } from '../overlay'


export interface BoardSquareProps {
  x: Letter;
  y: number;
  children?: ReactNode;
  game: Game;
  black: boolean;
}

export const BoardCell: FC<BoardSquareProps> = ({
  x,
  y,
  children,
  game,
  black,
}: BoardSquareProps) => {

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemsTypes.KNIGHT,
      canDrop: () =>  (
          game.canMoveKnight(x, y)
      ),
      drop: () => game.moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game],
  )

  const img = require("../../assets/knight.png");

  return (
    <div
      ref={drop}
      role="Space"
      data-testid={`(${x},${y})`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Cell black={black}>{children}</Cell>
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  )
}
