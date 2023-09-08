import React from "react";
import "./Button.css";

const Button = ({ onClick, children, ...props }) => (
  <button onClick={onClick} {...props}>
    {children}
  </button>
);

export default Button;
