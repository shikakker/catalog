import test from 'node:test';
import assert from 'node:assert/strict';
import { toPublicUser } from '../lib/public-user.mjs';

test('public directory profiles never expose email or email verification fields', () => {
  const result = toPublicUser({
    name: 'Ada',
    username: 'ada',
    email: 'private@example.com',
    emailVerified: '2026-01-01',
    image: 'https://example.com/a.png',
    followers: 10,
    verified: true,
  });

  assert.equal('email' in result, false);
  assert.equal('emailVerified' in result, false);
  assert.equal(result.username, 'ada');
});
