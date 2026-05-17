export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const validateEmail = (email) => emailPattern.test(String(email).trim());
export const validatePassword = (password) => passwordPattern.test(password || '');

export const getPasswordRequirements = (password) => {
  const value = password || '';
  return {
    length: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /\d/.test(value),
    special: /[^A-Za-z0-9]/.test(value),
  };
};

export const getEmailHelperText = (email) => {
  if (!email) {
    return 'Enter a valid email address to continue';
  }

  return validateEmail(email) ? 'Email format looks good' : 'Use a valid address like user@gmail.com';
};

export const getPasswordHelperText = (password) => {
  const requirements = getPasswordRequirements(password);
  const missing = [];

  if (!requirements.length) missing.push('8+ characters');
  if (!requirements.uppercase) missing.push('one uppercase letter');
  if (!requirements.lowercase) missing.push('one lowercase letter');
  if (!requirements.number) missing.push('one number');
  if (!requirements.special) missing.push('one special character');

  return missing.length === 0 ? 'Password looks strong' : `Needs ${missing.join(', ')}`;
};