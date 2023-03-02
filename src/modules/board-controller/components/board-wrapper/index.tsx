import React from 'react';
import './style.scss';

interface IProps {
  children: React.ReactNode;
}

export const BoardWrapper: React.FC<IProps> = React.memo(({ children }) => {
  return <div className="Board-wrapper">{children}</div>;
});
