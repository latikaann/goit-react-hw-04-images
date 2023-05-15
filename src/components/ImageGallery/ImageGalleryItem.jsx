import React from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL, tags)}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
