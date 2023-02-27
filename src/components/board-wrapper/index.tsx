import React from 'react';
import './style.scss';

interface IProps {
  children: React.ReactNode;
}

const BoardWrapper: React.FC<IProps> = ({children}) => {
  return (
    <div className='Board-wrapper'>
      { children} 
    </div>
  );
};

export default React.memo(BoardWrapper);
