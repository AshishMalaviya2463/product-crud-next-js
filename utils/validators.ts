export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);

type PasswordStrength = number;

export const calculatePasswordStrength = (
  password: string
): PasswordStrength => {
  let score = 0;
  const minLength = 8;
  const maxScore = 100;

  const regex = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  };

  if (password.length >= minLength) {
    score += 25;
  }

  if (regex.uppercase.test(password)) {
    score += 25;
  }

  if (regex.lowercase.test(password)) {
    score += 25;
  }

  if (regex.special.test(password)) {
    score += 25;
  }

  if (password.length > minLength) {
    const extraLength = password.length - minLength;
    score += extraLength * 2;
  }

  return Math.min(score, maxScore);
};
