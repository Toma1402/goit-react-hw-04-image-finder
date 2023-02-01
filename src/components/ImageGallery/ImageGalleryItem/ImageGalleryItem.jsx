import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ idx, tags, image, largeImg }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(prev => !prev);
  };
  return (
    <>
      <li onClick={toggleModal} className="ImageGalleryItem" key={idx}>
        <img className="ImageGalleryItem-image" src={image} alt={tags} />
      </li>
      {showModal && <Modal content={largeImg} onCloseModal={toggleModal} />}
    </>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
};
