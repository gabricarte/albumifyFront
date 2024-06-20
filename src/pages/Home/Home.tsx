import Header from '../../components/Header/Header'
import styles from './styles.module.scss';
import Album from '../../components/Album/Album';

function Home() {
  return (
    <div className={styles.home}>
        <Header/>
        <h1>My Albums</h1>
        <div className={styles.albumsContainer}>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
        </div>

    </div>
  )
}

export default Home