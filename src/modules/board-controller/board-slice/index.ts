import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";

import { RootState } from "../../../store";

import { Positions } from "../types";
import { startSet } from "../utils";

type BoardState = {
  pieces: Positions;
  loading: boolean;
  error: string | null;
};

const initialState: BoardState = {
  pieces: {} as Positions,
  loading: true,
  error: null,
};
 
const BoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export const boardReducer = BoardSlice.reducer;

//thunks
export const move = createAsyncThunk<
  { prev: string; next: string },
  { prev: string; next: string },
  { rejectValue: string; state: RootState }
>("board/MOVE_PIECE", async (payload, { rejectWithValue }) => {
  try {
    const value = localStorage.getItem(payload.prev);
    if (value) {
      localStorage.removeItem(payload.prev);
      localStorage.setItem(payload.next, value)
    }
    return payload;
  } catch (err) {
    return rejectWithValue(
      "Произошла ошибка, попробуйте перезагрузить страницу"
    );
  }
});

export const restart = createAsyncThunk<
  Positions,
  undefined,
  { rejectValue: string; state: RootState }
>("board/RESTART_GAME", async (_, { rejectWithValue }) => {
  try {
    localStorage.clear();
    for (let key in startSet) {
      localStorage.setItem(key, JSON.stringify(startSet[key]));
    }
    return startSet;
  } catch (err) {
    return rejectWithValue(
      "Произошла ошибка, попробуйте перезагрузить страницу"
    );
  }
});

export const init = createAsyncThunk<
  Positions | undefined,
  undefined,
  { rejectValue: string; state: RootState }
>("board/INIT_GAME", async (_, { rejectWithValue, dispatch }) => {
  try {
    const isStorage = localStorage.length

    if (!isStorage) {
      dispatch(restart());
    }

    const storageItems = {...localStorage};
    let storageSet: Positions = {};
    for (let key in storageItems) {
      const item = localStorage.getItem(key);
      if (item) {
        storageSet[key] = JSON.parse(item);
      }
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
