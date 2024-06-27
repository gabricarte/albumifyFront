import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onLogOut } from '../../utils/sessionStorage';
import logo from '../../images/logo.png';
import styles from './styles.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from '../SearchInput/SearchInput';
import michaelCera from '../../images/michael_cera.jpg';

const Header: React.FC = () => {
  const location = useLocation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const closeSearch = () => {
    setIsSearchExpanded(false);
  };

  const restoreVisibility = () => {
    setIsSearchExpanded(false); 
  };

  return (
    <header className={`${styles.header} ${isSearchExpanded ? styles.expanded : ''}`}>
      <ul>
        <li className={`${styles.logoContainer} ${isSearchExpanded ? styles.hidden : ''}`}>
          <img src={logo} alt="Logo" />
        </li>
        <li className={`${(location.pathname === '/myalbums' || location.pathname === '/search') && !isSearchExpanded ? '' : styles.hidden}`}>
          <Link to="/myalbums" style={{ textDecoration: "none" }} onClick={restoreVisibility}>
            My Albums
          </Link>
        </li>

        <li className={`${styles.searchIcon} ${isSearchExpanded ? styles.hidden : ''}`}>
          <SearchIcon onClick={toggleSearch} />
        </li>

        {isSearchExpanded && (
          <SearchInput onClose={restoreVisibility} />
        )}

        <div className={styles.headerLinks}>
          <li className={`${(location.pathname === '/home' || location.pathname === '/search') && !isSearchExpanded ? '' : styles.hidden}`}>
            <Link to="/home" style={{ textDecoration: "none" }} onClick={restoreVisibility}>
              Home
            </Link>
          </li>

          <li className={`${styles.menuItem} ${isSearchExpanded ? styles.hidden : ''}`} onClick={onLogOut}>
            <Link to="/" style={{ textDecoration: "none" }}>
              Settings
            </Link>
          </li>
          <li className={`${styles.menuItem} ${isSearchExpanded ? styles.hidden : ''}`} onClick={onLogOut}>
            <Link to="/" style={{ textDecoration: "none" }}>
              Logout
            </Link>
          </li>
          <li>
          <Link to="/" style={{ textDecoration: "none" }}>
              <img src={michaelCera} alt="" className={isSearchExpanded ? styles.hidden : ''} />
            </Link>
          </li>
        </div>
       
      </ul>
    </header>
  );
};

export default Header;
