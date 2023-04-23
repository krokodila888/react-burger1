import React from "react";
import "./modalOverlay.css";

interface IModalOverlayProps {
  isOpen: boolean;
}

function ModalOverlay(props: IModalOverlayProps) {
  const {isOpen} = props;

  return (
      <div className={`modalOverlay ${isOpen ? 'modalOverlay_opened' : ''}`}>
      </div>
  );
}

export default ModalOverlay;
