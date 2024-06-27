import React from 'react';
import styles from './styles.module.scss';
import ArtistCard from '../../components/ArtistCard/ArtistCard';

interface Artist {
  name: string;
  listeners: number;
}

interface TopArtistsSectionProps {
  artists: Artist[];
}

const TopArtistsSection: React.FC<TopArtistsSectionProps> = ({ artists }) => {

  
  return (
    <div className={styles.topArtists}>
      <h1>Top Artists</h1>
      <div className={styles.topArtistsContainer}>
        <div className={styles.artistsContainer}>
          {artists.slice(0, 6).map((artist, index) => (
            <ArtistCard
              key={index}
              artistName={artist.name}
              listeners={artist.listeners.toString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopArtistsSection;
