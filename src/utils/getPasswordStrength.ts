export const getPasswordStrength = (
  password: string
): 'weak' | 'medium' | 'strong' => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-ZА-ЯЁ]/.test(password)) score += 1;
  if (/[a-zа-яё]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-ZА-Яa-zа-я0-9Ёё\s]/.test(password)) score += 1;

  if (score <= 4 && score > 2) {
    return 'medium';
  } else if (score>4 ) {
    return 'strong';
  } else {
    return 'weak';
  }
};
