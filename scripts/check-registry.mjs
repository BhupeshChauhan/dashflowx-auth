#!/usr/bin/env node
/**
 * AU05: auth registry ids unique, prefixed, and not overlapping core/forms/datagrid.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'src/registry.ts'), 'utf8');
const ids = [...src.matchAll(/id: '(auth\.[^']+)'/g)].map((m) => m[1]);
const unique = new Set(ids);
if (unique.size !== ids.length) {
  throw new Error(`Duplicate auth registry ids: ${ids.length} vs ${unique.size}`);
}
if (ids.length < 4) {
  throw new Error('AUTH_REGISTRY must list free + pro rows');
}
if (ids.some((id) => !id.startsWith('auth.'))) {
  throw new Error('Auth ids must start with auth.');
}

function otherIds(rel, prefix) {
  const file = join(root, rel);
  if (!existsSync(file)) return [];
  const other = readFileSync(file, 'utf8');
  return [...other.matchAll(new RegExp(`id: '(${prefix}\\.[^']+)'`, 'g'))].map((m) => m[1]);
}

for (const [rel, prefix] of [
  ['../dashflowx-core/src/registry.ts', 'core'],
  ['../dashflow-forms/src/registry.ts', 'forms'],
  ['../dashflow-datagrid/src/registry.ts', 'datagrid'],
]) {
  const overlap = ids.filter((id) => new Set(otherIds(rel, prefix)).has(id));
  if (overlap.length) {
    throw new Error(`Registry id overlap with ${prefix}: ${overlap.join(', ')}`);
  }
}

console.log(`AU05 ok: ${ids.length} auth registry rows, unique vs core/forms/datagrid`);
