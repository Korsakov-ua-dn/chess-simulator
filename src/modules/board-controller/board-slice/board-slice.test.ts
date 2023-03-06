import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { Store } from '../../../store';

import { startSet } from '../utils';

import { boardReducer, initialState, move, restart } from './index';

describe('Thunks', () => {
  let store: Store;

  beforeAll(() => {
    const rootReducer = combineReducers({
      board: boardReducer,
    });

    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  });

  it('should set to state startSet of piece and change loading to false', async () => {
    await store.dispatch(restart());
    expect(store.getState().board.pieces).toEqual(startSet);
    expect(store.getState().board.loading).toBeFalsy();
  });

  it('should handle MOVE', async () => {
    const payload = {
      prev: JSON.stringify(['a', 7]),
      next: JSON.stringify(['a', 5]),
    };

    await store.dispatch(move(payload));

    expect(store.getState().board.pieces).toEqual({
      [JSON.stringify(['a', 5])]: {
        type: 'rook',
        color: 'black',
        id: 'rook_black_1',
      },
      [JSON.stringify(['b', 7])]: {
        type: 'knight',
        color: 'black',
        id: 'khight_black_1',
      },
      [JSON.stringify(['f', 7])]: {
        type: 'bishop',
        color: 'black',
        id: 'bishop_black_2',
      },
      [JSON.stringify(['g', 7])]: {
        type: 'knight',
        color: 'black',
        id: 'khight_black_2',
      },
    });
  });
});

describe('Extrareducer', () => {
  it('returns the initial state', () => {
    expect(boardReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should change loading and error', () => {
    const state = boardReducer(initialState, move.pending);
    expect(state.loading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it('should change position of rook', () => {
    const payload = {
      prev: JSON.stringify(['a', 7]),
      next: JSON.stringify(['a', 5]),
    };
    const state = boardReducer(
      initialState,
      move.fulfilled(payload, '', payload)
    );

    expect(state).toEqual({
      pieces: { [JSON.stringify(['a', 5])]: undefined },
      loading: false,
      error: null,
    });
  });
});
