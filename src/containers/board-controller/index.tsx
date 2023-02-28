import React from 'react';

import { Board } from '../../components/board';
import { BoardCell } from '../../components/board-cell';
import BoardWrapper from '../../components/board-wrapper';
import { Piece } from '../../components/piece';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { boardActions, letter, Letter, PieceType } from '../../store/board-slice';
import { canMoveObj } from '../../utils/can-move';

interface IProps {}

export const BoardController: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    pieces: state.board.pieces,
  }));

  // console.log(select.pieces);
  // console.log(JSON.stringify(['b', 7]));
  // console.log(select.pieces.get(JSON.stringify(['b', 7])));

  function move(id: string, toX: Letter, toY: number): void {
    dispatch(boardActions.moveKnight({
      prev: id, 
      next: JSON.stringify([toX, toY])
    }))
  };

  function canMove(id: string, pieceType: PieceType, toX: Letter, toY: number): boolean {
    const [x, y] = JSON.parse(id) as [Letter, number];

    // Общее правило для всех фигур "false если ячейка занята другой фигурой"
    if ( select.pieces[JSON.stringify([toX, toY])] ) return false;

    return canMoveObj[pieceType](x, y, toX, toY, select.pieces)
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
        move={move}
        canMove={canMove}
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
    <BoardWrapper>
      <Board>{cells}</Board>
    </BoardWrapper>
  )
}
