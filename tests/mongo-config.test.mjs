import test from 'node:test';
import assert from 'node:assert/strict';
import { getMongoConfiguration } from '../lib/mongo-config.mjs';

test('missing Mongo URI is represented as a recoverable configuration state', () => {
  assert.deepEqual(getMongoConfiguration(undefined), {
    configured: false,
    uri: null,
    errorCode: 'MISSING_MONGODB_URI',
  });
});

test('configured Mongo URI is returned without mutation', () => {
  const uri = 'mongodb+srv://example.invalid/catalog';
  assert.deepEqual(getMongoConfiguration(uri), {
    configured: true,
    uri,
    errorCode: null,
  });
});
