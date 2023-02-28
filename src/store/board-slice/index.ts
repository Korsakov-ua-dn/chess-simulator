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
export const letter = ['a','b','c','d','e','f','g','h'] as const;
export type Letter = typeof letter[number];
export type IPiece = { type: PieceName, color: Color, id: string }
export type Pieces = Record<string, IPiece>;
type PieceName = 'knight' | 'rook';
type Color = 'black' | 'white';
export const letterObj = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
}
