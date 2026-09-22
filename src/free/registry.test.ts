import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AUTH_REGISTRY,
  assertUniqueRegistryIds,
  editorPalette,
  isProEntry,
} from '../registry';

const here = dirname(fileURLToPath(import.meta.url));

function idsFrom(file: string, prefix: string): Set<string> {
  if (!existsSync(file)) return new Set();
  const src = readFileSync(file, 'utf8');
  return new Set([...src.matchAll(new RegExp(`id: '(${prefix}\\.[^']+)'`, 'g'))].map((m) => m[1]));
}

describe('AUTH_REGISTRY', () => {
  it('has unique ids prefixed with auth.', () => {
    expect(() => assertUniqueRegistryIds(AUTH_REGISTRY)).not.toThrow();
    const ids = AUTH_REGISTRY.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith('auth.'))).toBe(true);
  });

  it('does not collide with core, forms, or datagrid ids', () => {
    const coreIds = idsFrom(join(here, '../../../dashflowx-core/src/registry.ts'), 'core');
    const formsIds = idsFrom(join(here, '../../../dashflow-forms/src/registry.ts'), 'forms');
    const gridIds = idsFrom(join(here, '../../../dashflow-datagrid/src/registry.ts'), 'datagrid');
    expect(coreIds.size).toBeGreaterThan(0);
    for (const entry of AUTH_REGISTRY) {
      expect(coreIds.has(entry.id)).toBe(false);
      expect(formsIds.has(entry.id)).toBe(false);
      expect(gridIds.has(entry.id)).toBe(false);
    }
  });

  it('splits free vs pro for the editor palette', () => {
    const palette = editorPalette(AUTH_REGISTRY);
    expect(palette.filter(isProEntry).map((e) => e.id)).toEqual([
      'auth.sso-saml',
      'auth.magic-link',
      'auth.org-invites',
    ]);
    expect(AUTH_REGISTRY.filter((e) => e.tier === 'free').length).toBeGreaterThan(0);
  });
});
