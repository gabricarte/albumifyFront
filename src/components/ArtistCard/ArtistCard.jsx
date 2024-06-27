// ArtistCard.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Importando PropTypes para definir tipos de propriedades
import styles from './styles.module.scss';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

function ArtistCard({ artistName, listeners }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.artistCard}>
      <div className={styles.imgContainer}></div>
      <div className={styles.textContainer}>
        <h2>{artistName}</h2>
        <p>Listeners: {listeners}</p>
        <Button label='Learn more' onClick={openModal} />
      </div>
      {isModalOpen && (
        <Modal 
          title="More about the artist" 
          content={`Information about ${artistName}`} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

ArtistCard.propTypes = {
  artistName: PropTypes.string.isRequired, 
  listeners: PropTypes.string
};

export default ArtistCard;
