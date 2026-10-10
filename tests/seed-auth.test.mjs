import test from 'node:test';
import assert from 'node:assert/strict';
import { isSeedRequestAuthorized } from '../lib/seed-auth.mjs';

test('seed requires POST and an exact bearer token', () => {
  assert.equal(isSeedRequestAuthorized({ method: 'GET', authorization: 'Bearer secret', expectedToken: 'secret' }), false);
  assert.equal(isSeedRequestAuthorized({ method: 'POST', authorization: '', expectedToken: 'secret' }), false);
  assert.equal(isSeedRequestAuthorized({ method: 'POST', authorization: 'Bearer wrong', expectedToken: 'secret' }), false);
  assert.equal(isSeedRequestAuthorized({ method: 'POST', authorization: 'Bearer secret', expectedToken: 'secret' }), true);
});
