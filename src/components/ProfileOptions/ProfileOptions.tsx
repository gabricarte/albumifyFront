import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

interface ProfileOptionsProps {
  onClose: () => void; 
}

const ProfileOptions: React.FC<ProfileOptionsProps> = ({ onClose }) => {
  return (
    <div className={styles.profileOptions} onMouseLeave={onClose}>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileOptions;
