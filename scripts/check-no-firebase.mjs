#!/usr/bin/env node
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const free = join(root, 'src/free');

function walk(dir) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(ent.name)) out.push(p);
  }
  return out;
}

for (const file of walk(free)) {
  const src = readFileSync(file, 'utf8');
  if (/from ['"]firebase/.test(src) || /from ['"]@\/Hooks\/firebase/.test(src)) {
    throw new Error(`src/free must not import Firebase: ${file}`);
  }
}
const provider = readFileSync(join(root, 'src/Providers/AuthProvider.tsx'), 'utf8');
if (/from ['"]firebase/.test(provider)) {
  throw new Error('AuthProvider must not import Firebase at module top');
}
console.log('AU02 ok: free AuthProvider has no Firebase import');
