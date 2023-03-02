import React, { ComponentProps } from 'react';

import './style.scss';

export const Button: React.FC<ComponentProps<'button'>> = React.memo(
  ({ children, className, ...restProps }) => {
    return (
      <button className={`Button ${className}`} {...restProps}>
        {children}
      </button>
    );
  }
);
