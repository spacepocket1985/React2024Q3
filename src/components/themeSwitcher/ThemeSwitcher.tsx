import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeWrapper}>
      <h2>Theme</h2>
      <button
        onClick={toggleTheme}
        className={
          theme === 'light' ? `${styles.btnLight}` : `${styles.btnDark}`
        }
      ></button>
      <h2>{theme === 'light' ? 'light' : 'dark'}</h2>
    </div>
  );
};
