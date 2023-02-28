import { Letter, letterObj, Pieces, PieceType } from "../store/board-slice";

export const canMoveObj: Record<
  PieceType,
  (x: Letter, y: number, toX: Letter, toY: number, pieces: Pieces) => boolean
> = {
  knight: (x: Letter, y: number, toX: Letter, toY: number, pieces: Pieces) => {
    const indexX = letterObj[x];
    const indexToX = letterObj[toX];
    const dx = indexToX - indexX;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  },

  rook: (x: Letter, y: number, toX: Letter, toY: number, pieces: Pieces) => {
    // false если ячейка по диагонали
    if (x !== toX && y !== toY) {
      return false;
    }

    const minX = Math.min(letterObj[x], letterObj[toX]);
    const maxX = Math.max(letterObj[x], letterObj[toX]);
    const minY = Math.min(y, toY);
    const maxY = Math.max(y, toY);

    // false как только по оси Y на пути цели встретилась не пустая ячейка
    for (let y = minY + 1; y < maxY; y++) {
      if (pieces[JSON.stringify([x, y])]) return false;
    }
    // false как только по оси X на пути цели встретилась не пустая ячейка
    for (let x = minX + 1; x < maxX; x++) {
      const key = Object.keys(letterObj);
      if (pieces[JSON.stringify([key[x], y])]) return false;
    }
    
    return true;
  },
};
