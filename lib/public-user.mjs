export function toPublicUser(user) {
  if (!user || typeof user !== 'object') return user;
  const { email: _email, emailVerified: _emailVerified, ...publicUser } = user;
  return publicUser;
}
