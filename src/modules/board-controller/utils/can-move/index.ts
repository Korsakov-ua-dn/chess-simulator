import { Letter, PieceType, Positions } from '../../types';
import { letter, letterObj } from '../letter';

export const canMoveObj: Record<
  PieceType,
  (x: Letter, y: number, toX: Letter, toY: number, pieces: Positions) => boolean
> = {
  knight: (
    x: Letter,
    y: number,
    toX: Letter,
    toY: number,
    pieces: Positions
  ) => {
    const indexX = letterObj[x];
    const indexToX = letterObj[toX];
    const dx = indexToX - indexX;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  },

  rook: (x: Letter, y: number, toX: Letter, toY: number, pieces: Positions) => {
    // false если ячейка по диагонали
    if (x !== toX && y !== toY) {
      return false;
    }

    const minX = Math.min(letterObj[x], letterObj[toX]);
    const maxX = Math.max(letterObj[x], letterObj[toX]);
    const minY = Math.min(y, toY);
    const maxY = Math.max(y, toY);

    // false как только по оси Y на пути цели встретилась не пустая ячейка
    for (let i = minY + 1; i < maxY; i++) {
      if (pieces[JSON.stringify([x, i])]) {
        return false;
      }
    }
    // false как только по оси X на пути цели встретилась не пустая ячейка
    for (let i = minX + 1; i < maxX; i++) {
      if (pieces[JSON.stringify([letter[i], y])]) {
        return false;
      }
    }

    return true;
  },

  bishop: (
    x: Letter,
    y: number,
    toX: Letter,
    toY: number,
    pieces: Positions
  ) => {
    const absX = Math.abs(letterObj[toX] - letterObj[x]);
    const absY = Math.abs(toY - y);

    // false если ячейки не по диагонали
    if (absY !== absX) {
      return false;
    }

    const dy = y < toY ? 1 : -1;
    const dx = x < toX ? -1 : 1;

    // false как только по диагонали на пути цели встретилась не пустая ячейка
    for (let i = 1; i <= absY; i++) {
      const newX = letterObj[x] + dx * i;

      if (pieces[JSON.stringify([letter[newX], y + dy * i])]) {
        return false;
      }
    }

    return true;
  },
};
