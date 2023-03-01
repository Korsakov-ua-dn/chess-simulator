import React from 'react';

import './style.scss';

interface IProps {
  children: React.ReactNode[];
}

export const Board: React.FC<IProps> = React.memo(({children}) => {
  return <div className='Board'>{children}</div>
});
