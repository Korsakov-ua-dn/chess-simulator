import React, { ComponentProps } from "react";
import "./style.scss";

const Button: React.FC<ComponentProps<"button">> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button className={`Button ${className}`} {...restProps}>
      {children}
    </button>
  );
};

export default React.memo(Button);
