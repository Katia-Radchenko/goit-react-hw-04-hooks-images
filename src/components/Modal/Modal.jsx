import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import Loader from '../Loader/Loader';
import { Backdrop, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ url, closeModal }) {
  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', clickOnEscKeyHandler);
    return () => {
      window.removeEventListener('keydown', clickOnEscKeyHandler);
    };
  });

  const clickOnEscKeyHandler = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const clickOnBackdropHandler = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Backdrop onClick={clickOnBackdropHandler}>
      {loading && <Loader center />}
      <ModalWindow
        style={{ visibility: loading ? 'hidden' : 'visible' }}
        src={url}
        onLoad={handleLoading}
      ></ModalWindow>
    </Backdrop>,
    modalRoot,
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
