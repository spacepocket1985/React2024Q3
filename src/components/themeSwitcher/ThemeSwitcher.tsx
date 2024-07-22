import { useTheme } from '../../context/ThemeContext';
import styles from'./ThemeSwitcher.module.css'

export const ThemeSwitcher = ():JSX.Element => {  
  const { theme, toggleTheme } = useTheme();  

  return (  
    <div className={styles.themeWrapper}>  
      <h2>Выберите тему</h2>  
      <button onClick={toggleTheme}>  
        Текущая тема: {theme === 'light' ? 'Светлая' : 'Темная'}  
      </button>  
    </div>  
  );  
};  