import PropTypes from 'prop-types';
import styles from './styles.module.scss';

function Button({ label, onClick, icon: Icon }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {Icon && <Icon className={styles.icon} />}
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.elementType, 
};

Button.defaultProps = {
  onClick: undefined,
  icon: null,  
};

export default Button;
