import React, { useCallback, useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from '../../components/button';

import { Board } from './components/board';
import { BoardCell } from './components/board-cell';
import { BoardWrapper } from './components/board-wrapper';
import { Piece } from './components/piece';
import { move, restart } from './board-slice';
import { letter, moveRules } from './utils';
import { Letter, PieceType, Position } from './types';

export const BoardController: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    pieces: state.board.pieces,
  }));

  const canMoveHandler = (
    position: Position,
    pieceType: PieceType,
    toX: Letter,
    toY: number
  ): boolean => {
    const [x, y] = JSON.parse(position) as [Letter, number];
    return (
      // Общее правило для всех фигур "false если ячейка занята другой фигурой"
      moveRules['general'](x, y, toX, toY, select.pieces) &&
      // Персональная проверка согласно типа фигуры и ее положения на доске
      moveRules[pieceType](x, y, toX, toY, select.pieces)
    );
  };

  // мемоизация динамически генерируемого коллбэка => оптимизирует перерендер ячеек
  const canMoveRef =
    useRef<
      (
        position: Position,
        pieceType: PieceType,
        toX: Letter,
        toY: number
      ) => boolean
    >(canMoveHandler);
  canMoveRef.current = canMoveHandler;

  const callbacks = {
    move: useCallback(
      (position: Position, toX: Letter, toY: number): void => {
        dispatch(
          move({
            prev: position,
            next: JSON.stringify([toX, toY]),
          })
        );
      },
      [dispatch]
    ),

    restart: useCallback((): void => {
      dispatch(restart());
    }, [dispatch]),
  };

  const cells = useMemo(() => {
    const result = [];
    for (let i = 0; i < 64; i += 1) {
      const x = i % 8;
      const y = Math.floor(i / 8);

      const position = JSON.stringify([letter[x], y]);
      const piece = select.pieces[position];
      result.push(
        <BoardCell
          key={i}
          x={letter[x]}
          y={y}
          black={(x + y) % 2 === 1}
          move={callbacks.move}
          canMoveRef={canMoveRef}
        >
          {piece?.type ? (
            <Piece type={piece.type} color={piece.color} position={position} />
          ) : null}
        </BoardCell>
      );
    }
    return result;
  }, [callbacks.move, select.pieces]);

  return (
    <DndProvider options={HTML5toTouch}>
      <BoardWrapper>
        <Board>{cells}</Board>
        <Button onClick={callbacks.restart}>Restart Game</Button>
      </BoardWrapper>
    </DndProvider>
  );
};
