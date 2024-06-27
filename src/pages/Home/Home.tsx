// Home.tsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './styles.module.scss';
import IntroductionSection from '../../sections/IntroductionSection/IntroductionSection';
import TopArtistsSection from '../../sections/TopArtistsSection/TopArtistsSection';
import { getTopArtists } from '../../utils/external';
import LoadIcon from '../../components/LoadIcon/LoadIcon';

interface Artist {
  name: string;
  listeners: number;
}

function Home() {
  const [topArtists, setTopArtists] = useState<Artist[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const artists = await getTopArtists();
      setTopArtists(artists);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      <Header />
      <IntroductionSection />
      {topArtists ? (
        <TopArtistsSection artists={topArtists} />
      ) : (
        <LoadIcon/>
      )}
    </div>
  );
}

export default Home;
