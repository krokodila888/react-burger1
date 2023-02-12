import React from "react";
import "./modalOverlay.css";
import PropTypes from 'prop-types';

function ModalOverlay(props) {
  const {isOpen, children, onClose} = props;
  const overlay = React.useRef();

  React.useEffect(() => {
    const closeByClick = (event) => {
      if (event.target.classList.contains('modalOverlay')) {
        onClose();
      }
    };
    const element = overlay.current;
    if (element && overlay && overlay.current) {
      element.addEventListener('click', closeByClick);
        return () => {
          element.removeEventListener('click', closeByClick);
        };
    }
}, []);

  return (
    <>
      <div ref={overlay} className={`modalOverlay ${isOpen ? 'modalOverlay_opened' : ''}`}>
          {children}
      </div>
    </>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,  
  children: PropTypes.element.isRequired
};
