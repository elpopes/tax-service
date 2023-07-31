import React from "react";
import "./Modal.css";

function Modal({ isVisible, children }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
