import React from 'react';
import styles from './styles.module.scss';
import { SvgIconComponent } from '@mui/icons-material';

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon: SvgIconComponent;
}

const InputField: React.FC<InputFieldProps> = ({ id, name, type, placeholder, value, onChange, icon: Icon }) => (
  <div className={styles.formGroup}>
    <label htmlFor={id} className={styles.label}>{name}</label>
    {type !== 'file' ? (
      <div className={styles.inputContainer}>
        <Icon className={styles.icon} />
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className={styles.input}
        />
      </div>
    ) : (
      <div className={styles.fileInputContainer}>
        <Icon className={styles.icon} />
        <input
          type="file"
          id={id}
          name={name}
          onChange={onChange}
          className={styles.fileInput}
        />
        <label htmlFor={id} className={styles.fileInputLabel}>{placeholder}</label>
      </div>
    )}
  </div>
);

export default InputField;
