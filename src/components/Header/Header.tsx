import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getIdFromTokenOnSessionStorage, onLogOut } from '../../utils/sessionStorage';
import logo from '../../images/logo.png';
import styles from './styles.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchInput from '../SearchInput/SearchInput';
import ProfileOptions from '../ProfileOptions/ProfileOptions';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const userId = getIdFromTokenOnSessionStorage();
        const response = await fetch(`http://localhost:8080/albumify/user-img/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile image');
        }
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchUserProfileImage();
  }, []);

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
              {profileImage && <img src={profileImage} alt="Profile" className={isSearchExpanded || menuOpen ? styles.hidden : ''} />}
            </div>
            {profileMenuOpen && <ProfileOptions onClose={() => setProfileMenuOpen(false)} />}
          </li>
        </div>

        {!isSearchExpanded && (
          <li onClick={handleMenuClick} className={styles.responsiveNav}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
