import { Letter, Positions } from '../../types';

import { startSet } from '../start-pieces-set';

import { moveRules } from '.';

describe('Can move', () => {
  let pieces: Positions;

  beforeEach(() => {
    pieces = startSet;
  });

  it('available move for rook', () => {
    const x: Letter = 'a';
    const y = 7;
    const toX: Letter = 'a';
    const toY = 6;
    const res =
      moveRules['general'](x, y, toX, toY, pieces) &&
      moveRules['rook'](x, y, toX, toY, pieces);
    expect(res).toBe(true);
  });

  it('the move is not available, the field is occupied by another piece', () => {
    const x: Letter = 'a';
    const y = 7;
    const toX: Letter = 'b';
    const toY = 7;
    const res = moveRules['general'](x, y, toX, toY, pieces);
    expect(res).toBe(false);
  });
});
