import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Letter } from '../../Game';

type BoardState = {
  knightPosition: Position;
};

const initialState: BoardState = {
  knightPosition: ['b', 7],
};

const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveKnight(state, action: PayloadAction<Position>) {
      state.knightPosition = action.payload;
    },
  },
});

export const boardActions = BoardSlice.actions;
export default BoardSlice.reducer;

export type Position = [Letter, CellNumber]
export type CellNumber = number;
// export type CellNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;


//thunk
// export const fetchAllTransactions = createAsyncThunk<
//   ITransaction[],
//   undefined,
//   { rejectValue: string; state: RootState }
// >('transactions/GET_ALL', async (_, { rejectWithValue }) => {
//   try {
//     const response = await transactionsApi.getAll();
//     return await response.data;
//   } catch (err) {
//     return rejectWithValue(
//       'Произошла ошибка, попробуйте перезагрузить страницу'
//     );
//   }
// });