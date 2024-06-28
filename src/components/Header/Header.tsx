import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onLogOut } from '../../utils/sessionStorage';
import logo from '../../images/logo.png';
import styles from './styles.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchInput from '../SearchInput/SearchInput';
import michaelCera from '../../images/michael_cera.jpg';
import ProfileOptions from '../ProfileOptions/ProfileOptions'; // Importa o componente ProfileOptions

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Estado para controlar a abertura do menu de perfil

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const closeSearch = () => {
    setIsSearchExpanded(false);
  };

  const restoreVisibility = () => {
    setIsSearchExpanded(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogOut();
    navigate('/login');
  };

  const headerClassName = `${styles.header} ${isSearchExpanded ? styles.expanded : ''} ${menuOpen ? styles.occupyAllPage : ''}`;

  return (
    <header className={headerClassName}>
      <ul>
        <li className={`${styles.logoContainer} ${isSearchExpanded ? styles.hidden : ''}`}>
          <Link to="/home">
            <img src={logo} alt="Logo" />
          </Link>
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

        <div className={`${styles.headerLinks} ${menuOpen ? '' : styles.hide}`}>
          <li>
            <div className={styles.profileIcon} onMouseEnter={() => setProfileMenuOpen(true)}>
              <img src={michaelCera} alt="" className={isSearchExpanded ? styles.hidden : ''} />
            </div>
            {profileMenuOpen && <ProfileOptions onClose={() => setProfileMenuOpen(false)} />}
          </li>
        </div>

        <div className={styles.responsiveNav} onClick={handleMenuClick}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </ul>
    </header>
  );
};

export default Header;
