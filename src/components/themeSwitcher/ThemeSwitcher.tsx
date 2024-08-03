"use client"

import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/ThemeSwitcher.module.css';

export const ThemeSwitcher = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeWrapper} onClick={toggleTheme}>
      <h2>Theme</h2>
      <button
        className={
          theme === 'light' ? `${styles.btnLight}` : `${styles.btnDark}`
        }
      ></button>
      <h2>{theme === 'light' ? 'light' : 'dark'}</h2>
    </div>
  );
};
