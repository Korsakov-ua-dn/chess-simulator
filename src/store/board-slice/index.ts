import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";

type BoardState = {
  pieces: Pieces;
  loading: boolean;
  error: string | null;
};

const initialState: BoardState = {
  pieces: {} as Pieces,
  loading: true,
  error: null,
};

const BoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(move.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(move.fulfilled, (state, action) => {
        const { prev, next } = action.payload;
        // меняю ключ с координатами фигуры
        const temp = state.pieces[prev];
        delete state.pieces[prev];
        state.pieces[next] = temp;
        state.loading = false;
      })
      .addCase(init.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== undefined) {
          state.pieces = action.payload;
        }
      })
      .addCase(restart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restart.fulfilled, (state, action) => {
        state.loading = false;
        state.pieces = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default BoardSlice.reducer;

// types
export type Position = [Letter, CellNumber];
export type CellNumber = number;
// export type CellNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const letter = ["h", "g", "f", "e", "d", "c", "b", "a"] as const;
export type Letter = typeof letter[number];
export type IPiece = { type: PieceType; color: Color; id: string };
export type Pieces = Record<string, IPiece>;
export type PieceType = "knight" | "rook" | "bishop";
type Color = "black" | "white";
export const letterObj = {
  a: 7,
  b: 6,
  c: 5,
  d: 4,
  e: 3,
  f: 2,
  g: 1,
  h: 0,
};
const basicSet = {
  [JSON.stringify(["a", 7])]: {
    type: "rook",
    color: "black",
    id: "rook_black_1",
  },
  [JSON.stringify(["b", 7])]: {
    type: "knight",
    color: "black",
    id: "khight_black_1",
  },
  [JSON.stringify(["f", 7])]: {
    type: "bishop",
    color: "black",
    id: "bishop_black_2",
  },
  [JSON.stringify(["g", 7])]: {
    type: "knight",
    color: "black",
    id: "khight_black_2",
  },
} as const;

//thunks
export const move = createAsyncThunk<
  { prev: string; next: string },
  { prev: string; next: string },
  { rejectValue: string; state: RootState }
>("board/MOVE_PIECE", async (payload, { rejectWithValue }) => {
  try {
    const value = localStorage.getItem(payload.prev)!;
    localStorage.removeItem(payload.prev);
    localStorage.setItem(payload.next, value)
    return payload;
  } catch (err) {
    return rejectWithValue(
      "Произошла ошибка, попробуйте перезагрузить страницу"
    );
  }
});

export const restart = createAsyncThunk<
  Pieces,
  undefined,
  { rejectValue: string; state: RootState }
>("board/RESTART_GAME", async (_, { rejectWithValue }) => {
  try {
    localStorage.clear();
    for (let key in basicSet) {
      localStorage.setItem(key, JSON.stringify(basicSet[key]));
    }
    return basicSet;
  } catch (err) {
    return rejectWithValue(
      "Произошла ошибка, попробуйте перезагрузить страницу"
    );
  }
});

export const init = createAsyncThunk<
  Pieces | undefined,
  undefined,
  { rejectValue: string; state: RootState }
>("board/INIT_GAME", async (_, { rejectWithValue, dispatch }) => {
  try {
    const isStorage = localStorage.length

    if (!isStorage) {
      dispatch(restart());
    }

    const storageItems = {...localStorage};
    let storageSet: Pieces = {};
    for (let key in storageItems) {
      storageSet[key] = JSON.parse(localStorage.getItem(key)!);
    }
    return storageSet;

  } catch (err) {
    return rejectWithValue(
      "Произошла ошибка, попробуйте перезагрузить страницу"
    );
  }
});


// helpers
function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
