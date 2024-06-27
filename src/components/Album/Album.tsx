import React, { useState } from 'react';
import styles from './styles.module.scss';
import Modal from '../Modal/Modal'; 
import vinyl from '../../images/vinyl.png';

interface Props {
  name: string;
  artist: string;
  summary: string;
}

const Album: React.FC<Props> = ({ name, artist, summary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnDetailsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.album}>
      <div className={styles.albumBody}>
        <h2>{name}</h2>
        <p>Artist: {artist}</p>
      </div>
      <div className={styles.albumFooter}>
        <p onClick={handleOnDetailsClick}>See details</p>
      </div>
      {isModalOpen && (
        <Modal
          title={name}
          content={summary ? summary : 'Summary not found'}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Album;
