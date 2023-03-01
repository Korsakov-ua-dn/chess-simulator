import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from '../../components/button';

import { Board } from './components/board';
import { BoardCell } from './components/board-cell';
import { BoardWrapper } from './components/board-wrapper';
import { Piece } from './components/piece';
import { restart, move } from './board-slice';
import { canMoveObj } from './utils/can-move';
import { Letter, PieceType } from './types';
import { letter } from './utils';

interface IProps {}

export const BoardController: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    pieces: state.board.pieces,
  }));

  const callbacks = {
    move: useCallback((id: string, toX: Letter, toY: number): void => {
      dispatch(move({
        prev: id, 
        next: JSON.stringify([toX, toY])
      }))
    }, [dispatch]),

    canMove: useCallback((id: string, pieceType: PieceType, toX: Letter, toY: number): boolean => {
      const [x, y] = JSON.parse(id) as [Letter, number];
      // Общее правило для всех фигур "false если ячейка занята другой фигурой"
      if ( select.pieces[JSON.stringify([toX, toY])] ) {
        return false
      }
      return canMoveObj[pieceType](x, y, toX, toY, select.pieces)
    }, [select.pieces]),

    restart: useCallback((): void => {
      dispatch(restart())
    }, [dispatch]),

  }

  function renderCell(i: number) {
    const x = i % 8
    const y = Math.floor(i / 8)

    const key = JSON.stringify([letter[x], y]);
    const piece = select.pieces[key]

    return (
      <BoardCell
        key={i} 
        x={letter[x]} 
        y={y}
        black={(x + y) % 2 === 1}
        move={callbacks.move}
        canMove={callbacks.canMove}
      >
        { piece ? <Piece piece={piece} id={key}/> : null }
      </BoardCell>
    )
  }

  const cells = []
  for (let i = 0; i < 64; i += 1) {
    cells.push(renderCell(i))
  }

  return (
    <DndProvider options={HTML5toTouch}>
      <BoardWrapper>
        <Board>{cells}</Board>
        <Button onClick={callbacks.restart}>Restart Game</Button>
      </BoardWrapper>
    </DndProvider>
  )
}
