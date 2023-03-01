import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BoardState = {
  pieces: Pieces;
  loading: boolean;
  error: string | null;
};

const initialState: BoardState = {
  pieces: {
    [JSON.stringify(['a', 7])]: {type: 'rook', color: 'black', id: 'rook_black_1'},   
    [JSON.stringify(['b', 7])]: {type: 'knight', color: 'black', id: 'khight_black_1'},
    [JSON.stringify(['f', 7])]: {type: 'bishop', color: 'black', id: 'bishop_black_2'},
    [JSON.stringify(['g', 7])]: {type: 'knight', color: 'black', id: 'khight_black_2'},
  },
  loading: false,
  error: null,
};

const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveKnight(state, action: PayloadAction<{prev: string, next: string}>) {
      const {prev, next} = action.payload;
      // меняю ключ с координатами фигуры
      const temp = state.pieces[prev]
      delete state.pieces[prev]
      state.pieces[next] = temp
    },
    init(state) {
      state.pieces = {
        [JSON.stringify(['a', 7])]: {type: 'rook', color: 'black', id: 'rook_black_1'},
        [JSON.stringify(['b', 7])]: {type: 'knight', color: 'black', id: 'khight_black_1'},
        [JSON.stringify(['f', 7])]: {type: 'bishop', color: 'black', id: 'bishop_black_2'},
        [JSON.stringify(['g', 7])]: {type: 'knight', color: 'black', id: 'khight_black_2'},
      }
    }
  },
});

export const boardActions = BoardSlice.actions;
export default BoardSlice.reducer;


// types
export type Position = [Letter, CellNumber]
export type CellNumber = number;
// export type CellNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const letter = ['h','g','f','e','d','c','b','a'] as const;
// export const letter = ['a','b','c','d','e','f','g','h'] as const;
export type Letter = typeof letter[number];
export type IPiece = { type: PieceType, color: Color, id: string }
export type Pieces = Record<string, IPiece>;
export type PieceType = 'knight' | 'rook' | 'bishop';
type Color = 'black' | 'white';
export const letterObj = {
  a: 7,
  b: 6,
  c: 5,
  d: 4,
  e: 3,
  f: 2,
  g: 1,
  h: 0,
}
