import type { CSSProperties, FC } from 'react'
import { useEffect, useState } from 'react'
import Game, { letter, Position } from '../../Game'
import { useAppSelector } from '../../hooks';
import { BoardCell } from '../board-cell';
import { Piece } from '../piece';

export interface BoardProps {
  game: Game;
}

const boardStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
}

const squareStyle: CSSProperties = { width: '12.5%', height: '12.5%' }

export const Board: FC<BoardProps> = ({ game }) => {


  const [[knightX, knightY], setKnightPos] = useState<Position>(
    game.knightPosition,
  )
  
  useEffect(() => game.observe(setKnightPos))

  function renderSquare(i: number) {
    const x = i % 8
    const y = Math.floor(i / 8)
    // console.log(x,y)

    return (
      <div key={i} style={squareStyle}>
        <BoardCell 
          x={letter[x]} 
          y={y} game={game} 
          black={(x + y) % 2 === 1} 
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
  return <div style={boardStyle}>{squares}</div>
}
