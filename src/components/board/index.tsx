import { useState } from 'react';

import './style.scss';

interface IProps {
  children: React.ReactNode[];
}

export const Board: React.FC<IProps> = ({children}) => {
  return <div className='Board'>{children}</div>
}
