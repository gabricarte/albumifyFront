import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Header() {
  const location = useLocation();
  return (
    <header className={styles.header}>
        <ul>
          <li className={location.pathname === '/' ? styles.active : ''}>
            <Link to="/home" style={{textDecoration: "none"}}>
                Home
            </Link>
          </li>
          <li className={location.pathname === '/search' ? styles.active : ''}>
                <Link to="/search" style={{textDecoration: "none"}}>
                Search Album
                </Link>
            </li>
            <li>Logout</li>
        </ul>
    </header>
  )
}

export default Header