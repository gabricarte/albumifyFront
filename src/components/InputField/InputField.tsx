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
  </div>
);

export default InputField;
