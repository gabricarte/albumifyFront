import React from 'react';
import Album from '../../components/Album/Album';
import styles from './styles.module.scss';
import { albumApiResponse } from '../../utils/interfaces';

interface Props {
  userData: albumApiResponse[] | null;
}

const MyAlbumsSection: React.FC<Props> = ({ userData }) => {
  
  return (
    <div className={styles.myAlbunsSection}>
      <h1>My Albums</h1>
      <div className={styles.albumsContainer} id="my-albums-section">
        {userData && userData.map((album, index) => ( 
          <Album
            key={index}
            name={album.name}
            artist={album.artist}
            summary={album.summary}
          />
        )) }
      </div>
    </div>
  );
};

export default MyAlbumsSection;
