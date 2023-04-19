import React from "react";
import "./modalOverlay.css";
import PropTypes from 'prop-types';

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

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired
};
