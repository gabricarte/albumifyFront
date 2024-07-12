import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './styles.module.scss';
import MyAlbumsSection from '../../sections/MyAlbumsSection/MyAlbumsSection';
import { albumApiResponse } from '../../utils/interfaces';
import { getIdFromTokenOnSessionStorage } from '../../utils/sessionStorage';

function MyAlbums() {
  const [userData, setUserData] = useState<albumApiResponse[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getIdFromTokenOnSessionStorage();
        const response = await fetch(`http://localhost:8080/albumify/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data as albumApiResponse[]); 
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.myAlbums}>
      <MyAlbumsSection userData={userData} />
    </div>
  );
}

export default MyAlbums;
