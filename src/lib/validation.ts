export const validateUsername = (username: string) => {
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  if (username.length > 20) {
    return "Username must be less than 20 characters long";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  return null;
};

export const validateEmail = (email: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (password: string) => {
  if (password.length < 4) {
    return "Password must be at least 4 characters long";
  }
  if (password.length > 50) {
    return "Password must be less than 50 characters long";
  }
  return null;
};