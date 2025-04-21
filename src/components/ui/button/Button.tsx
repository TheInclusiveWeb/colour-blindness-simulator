import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  onClick: () => void;
  label: string;           // Visible label
  ariaLabel?: string;      // Optional aria-label (for screen readers)
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  ariaLabel,
  disabled = false,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button}
      aria-label={ariaLabel || label}
      disabled={disabled}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
