export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const isAdmin = (user) => {
  return user?.role === ROLES.ADMIN;
};

export const checkUserRole = (user) => {
  return user?.role || ROLES.USER;
};