import React from "react";

function Modal({ isVisible, children }) {
  if (!isVisible) {
    return null;
  }
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
