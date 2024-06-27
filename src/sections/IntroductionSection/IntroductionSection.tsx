import Button from '../../components/Button/Button';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';


function IntroductionSection() {
  
//   const scrollToAlbums = () => {
//     const albumsSection = document.getElementById('my-albums-section');
//     if (albumsSection) {
//       albumsSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };
    const navigate = useNavigate();

    const redirectSearchAlbum = () => {
        navigate('/search'); 
    };

  return (
    <div className={styles.introductionSection}>
      <div className={styles.introductionText}>
        <div className={styles.introductionTextContainer}>
          <h1>Welcome to Albumify</h1>
          <p>Here, you can learn more about your favorite albums and save them!</p>
          <Button label="Start saving" onClick={redirectSearchAlbum} />
        </div>
      </div>
    </div>
  );
}

export default IntroductionSection;
