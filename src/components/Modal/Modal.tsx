import React, { useState, FC } from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import "./modal.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, useNavigate } from "react-router-dom";
import { removeOnClick } from '../../services/actions/location';
import { useSelector, useDispatch } from 'react-redux';
import {locationReducer} from '../../services/reducers/locationReducer';

type ScriptEvent = () => void;

interface ILocationReducerState {
  onClick: any;
}

const modalRoot = (document.getElementById("react-modals") as Element);

interface IModalProps {
  isOpen: boolean;
  onClose: ScriptEvent; 
  children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {

  const overlay = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = useSelector((state: ILocationReducerState) => state.onClick);

  React.useEffect(() => {
    const closeByClick = (event: MouseEvent) => {
      if (event !== null && event.target) {if ((event.target as Element).classList.contains('modalOverlay')) {
        handleClose();
      }}
    };
    const element = overlay.current;
    if (element && overlay && overlay.current) {
      element.addEventListener('click', closeByClick);
        return () => {
          element.removeEventListener('click', closeByClick);
        };
    }
  }, []);

  function handleClose() {
    onClose();
    dispatch(removeOnClick());
    if (onClick) {navigate(-1)}
    else navigate('/')
  }

  React.useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", escFunction); 
    return () => {
    document.removeEventListener("keydown", escFunction);
    }
  }, [])

  return ReactDOM.createPortal (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div ref={overlay}>
        <ModalOverlay isOpen={isOpen} />
      </div>
      <div className='modal__container'>
        <div className="modal__button-container">
          <CloseIcon type="primary" onClick={handleClose} />
        </div>
        {children}
       </div>
    </div>, modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
