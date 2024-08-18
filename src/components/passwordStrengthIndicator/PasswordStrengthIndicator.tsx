import styles from '../../styles/PasswordStrengthIndicator.module.css';

export const getPasswordStrength = (password: string): string => {
  let score = 0;

  if (/[A-ZА-ЯЁ]/.test(password)) score += 1;
  if (/[a-zа-яё]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-ZА-Яa-zа-я0-9Ёё\s]/.test(password)) score += 1;

  return String(score);
};

type PassStrengthPropsType = { password: string };

export const PasswordStrengthIndicator = (
  props: PassStrengthPropsType
): JSX.Element => {
  return (
    <div className={styles.pasStrengthWrapper}>
      <div className={styles.pasStrengthTitle}>Password strength:</div>
      <progress id="progressBar" value={props.password} max="4"></progress>
    </div>
  );
};
