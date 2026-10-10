export function isSeedRequestAuthorized({ method, authorization, expectedToken }) {
  if (method !== 'POST') return false;
  if (typeof expectedToken !== 'string' || expectedToken.length < 24) return false;
  if (typeof authorization !== 'string') return false;

  const prefix = 'Bearer ';
  if (!authorization.startsWith(prefix)) return false;

  const supplied = authorization.slice(prefix.length);
  if (supplied.length !== expectedToken.length) return false;

  let difference = 0;
  for (let index = 0; index < supplied.length; index += 1) {
    difference |= supplied.charCodeAt(index) ^ expectedToken.charCodeAt(index);
  }
  return difference === 0;
}
