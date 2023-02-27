import { useState } from 'react';

import { Letter, letter, Position } from '../../Game';
import { useAppSelector } from '../../hooks';

import { BoardCell } from '../board-cell';
import { Piece } from '../piece';

import './style.scss';

export interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {

  // const select = useAppSelector((state) => ({
  //   knightPosition: state.board.knightPosition,
  // }));
  // const [knightX, knightY] = select.knightPosition


  // const [[knightX, knightY], setKnightPos] = useState<Position>(
  //   game.knightPosition,
  // )

  const [[knightX, knightY], setKnightPos] = useState<Position>(() => ['b', 7])

  function moveKnight(toX: Letter, toY: number): void {
    setKnightPos([toX, toY])
  };

  function canMoveKnight(toX: Letter, toY: number): boolean {
    const indexX = letter.findIndex((el) => el === knightX)
    const indexToX = letter.findIndex((el) => el === toX)
    const dx = indexToX - indexX
    const dy = toY - knightY

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
  }

  function renderSquare(i: number) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
      <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
        <BoardCell 
          x={letter[x]} 
          y={y}
          black={(x + y) % 2 === 1}
          moveKnight={moveKnight}
          canMoveKnight={canMoveKnight}
        >
          <Piece isKnight={letter[x] === knightX && y === knightY} />
        </BoardCell>
      </div>
    )
  }

  const squares = []
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i))
  }
  return <div className='Board'>{squares}</div>
}
