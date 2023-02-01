import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ content, onCloseModal }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };
  useEffect(() => {
    const onEscape = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [onCloseModal]);

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
