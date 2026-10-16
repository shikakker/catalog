import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';

const load = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const manifest = JSON.parse(load('package.json'));
const npmLock = JSON.parse(load('package-lock.json'));
const pnpmLock = load('pnpm-lock.yaml');

test('building the public catalog cannot seed or overwrite a live MongoDB', () => {
  assert.equal(manifest.scripts.build, 'next build');
  assert.match(manifest.scripts.setup, /scripts\/setup\.mjs/);
  assert.doesNotMatch(manifest.scripts.build, /\bsetup\b/);
});

test('unused vulnerable MDX rendering package is absent from both frozen lockfiles', () => {
  assert.equal(Object.hasOwn(manifest.dependencies, 'next-mdx-remote'), false);
  assert.equal(Object.hasOwn(npmLock.packages[''].dependencies, 'next-mdx-remote'), false);
  assert.equal(Boolean(npmLock.packages['node_modules/next-mdx-remote']), false);
  assert.equal(Boolean(npmLock.dependencies?.['next-mdx-remote']), false);
  assert.doesNotMatch(pnpmLock, /next-mdx-remote/);
});

test('developer source never imports next-mdx-remote', () => {
  function walk(dir) {
    for (const ent of readdirSync(new URL('../' + dir + '/', import.meta.url), { withFileTypes:true })) {
      const name = dir + '/' + ent.name;
      if (ent.isDirectory()) walk(name);
      else if (/\.(?:tsx?|jsx?|mjs)$/.test(ent.name)) {
        const s = readFileSync(new URL('../' + name, import.meta.url), 'utf8');
        assert.doesNotMatch(s, /from\s*['"]next-mdx-remote|require\s*\(\s*['"]next-mdx-remote/);
      }
    }
  }
  walk('components');
  walk('pages');
  walk('lib');
});
