import React from 'react';
import Album from '../../components/Album/Album';
import styles from './styles.module.scss';
import { albumApiResponse } from '../../utils/interfaces';
import Button from '../../components/Button/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { getIdFromTokenOnSessionStorage } from '../../utils/sessionStorage';

interface Props {
  userData: albumApiResponse[] | null;
}

const handleGetExcel = async () => {
  const userId = getIdFromTokenOnSessionStorage();
  try {
    const response = await fetch(`http://localhost:8080/albumify/excel/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'albumsList.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Error: ', response.statusText);
    }
  } catch (error) {
    console.error('Error: ', error);
  }
};

const MyAlbumsSection: React.FC<Props> = ({ userData }) => {
  return (
    <section className={styles.myAlbumsSection}>
      <div className={styles.myAlbumsHeader}>
        <h1>My Albums</h1>
        <Button 
          label='Export xlsx' 
          icon={FileDownloadIcon} 
          onClick={handleGetExcel} // Adicione o evento onClick aqui
        />
      </div>

      <div className={styles.albumsContainer} id="my-albums-section">
        {userData && userData.map((album, index) => (
          <Album
            key={index}
            name={album.name}
            artist={album.artist}
            summary={album.summary}
          />
        ))}
      </div>
    </section>
  );
};

export default MyAlbumsSection;
