import { Backdrop, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';
import {useEffect} from 'react';
import PropTypes from 'prop-types';


const portal = document.querySelector('#modal-root');

const  Modal = ({children, onShow}) =>{
  const hendelKey = e => {
    if (e.code === 'Escape') onShow();
  };
  
  useEffect(() => {
    window.addEventListener('keydown', hendelKey);
    return () => window.removeEventListener('keydown', hendelKey);
  });

  const hendelClickBg = e => {
    if (e.target === e.currentTarget) onShow();
  };

    return createPortal(
      <Backdrop onClick={hendelClickBg}>
        <ModalWindow>{children}</ModalWindow>
      </Backdrop>,
      portal
    );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired
}

export default Modal;
