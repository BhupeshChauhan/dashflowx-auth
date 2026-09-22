#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const coreRoot = join(pkgRoot, '../dashflowx-core');
const distJs = join(coreRoot, 'dist/index.es.js');

if (!existsSync(coreRoot)) {
  console.log('No sibling dashflowx-core; expecting @dashflowx/core from npm.');
  process.exit(0);
}
if (existsSync(distJs)) {
  console.log('Sibling @dashflowx/core dist is present.');
  process.exit(0);
}
console.log('Building sibling @dashflowx/core (dist missing)…');
execSync('yarn install --frozen-lockfile', { cwd: coreRoot, stdio: 'inherit' });
execSync('yarn build', { cwd: coreRoot, stdio: 'inherit' });
