import React, { CSSProperties, useMemo } from 'react';
import { Board } from '../../components/board';
import Game from '../../Game';

interface IProps {}

export interface ChessboardTutorialAppState {
  // knightPosition: [number, number]
}

const containerStyle: CSSProperties = {
  width: 500,
  height: 500,
  border: '1px solid gray',
}

const BoardWrapper: React.FC<IProps> = () => {
  const game = useMemo(() => new Game(), [])

  return (
    <div style={containerStyle}>
      <Board game={game} />
    </div>
  );
};

export default React.memo(BoardWrapper);
