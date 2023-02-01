import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ content, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscape);
  }, []);
  useEffect(() => {
    window.removeEventListener('keydown', onEscape);
  }, []);
  const onEscape = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };
  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={content} alt="item" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  content: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
