import React from 'react';
import './style.scss';

interface IProps {}

const Knight: React.FC<IProps> = (props) => {
  return <span className='Knight'>♘</span>;
};

export default React.memo(Knight);
