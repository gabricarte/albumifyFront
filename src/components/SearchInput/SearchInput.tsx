import React, { useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SearchInputProps {
  onClose: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClose }) => {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={searchRef} className={styles.searchInput}>
      <input type="text" placeholder="Search for music..." className={styles.input} />
      <div className={styles.iconsContainer}>
        <CloseIcon onClick={onClose} className={styles.closeIcon} />
        <SearchIcon className={styles.searchIcon} />
      </div>
    </div>
  );
};

export default SearchInput;
