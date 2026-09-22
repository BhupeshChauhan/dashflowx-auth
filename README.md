# @dashflowx/auth

Sign-in / sign-up screens and `AuthProvider` for DashFlowX apps. GitHub: [dashflowx/dashflowx-auth](https://github.com/dashflowx/dashflowx-auth). Peer `@dashflowx/core` `>=3.0.0`.

This is **not** the ecom marketplace JWT session (`frontend` + Express `/api`). Ecom keeps its own login. This package is reusable screens plus a provider. Pass an adapter into `DfxAuthProvider`.

## Adapters (AU03)

| Kind | Factory | When to use |
| --- | --- | --- |
| mock (Storybook default) | `createMockAdapter()` / `createAuthAdapter()` | Tests and Storybook. `ada@example.com` / `password`. No network. |
| ecom JWT | `createEcomJwtAdapter({ baseUrl: 'http://127.0.0.1:5000' })` | Local ecom `POST /api/v1/auth/login`. Production hosts are rejected. |
| Firebase | `await loadFirebaseAdapter({ config })` | Only after **EXT-FIREBASE**. Paste test keys into local `.env` — never git or a production project. |

```tsx
import { DfxAuthProvider, createMockAdapter, createEcomJwtAdapter } from '@dashflowx/auth';

<DfxAuthProvider adapter={createMockAdapter()} adapterName="mock">
  {/* screens */}
</DfxAuthProvider>
```

## Inventory vs ecom JWT

| This library | Ecom marketplace |
| --- | --- |
| `DfxSignIn` / `DfxSignUp` | Shopper/vendor JWT login against Express |
| `DfxForgetPassword` / `DfxResetPassword` / `DfxChangePassword` | Ecom password reset routes |
| `DfxAuthEmail` | Ecom email verification |
| `DfxAuthProvider` + `useAuth` | Express session / JWT |

## Run locally

```bash
cd dashflowx-auth
yarn install
yarn test
yarn storybook   # http://localhost:6009
```

No database. Port **6009** so it does not collide with core `:6006`. Task prefix: **AU**. Prompt: `docs/CURSOR_PROMPT.md`. Public npm `@dashflowx/auth@0.0.27` (AU06). Publish: `docs/NPM_PUBLISH.md` (ask X05).

## Install

```bash
npm i @dashflowx/auth
```

Pro stubs live in `src/pro` (AU04) and ship as **`@dashflowx/auth-pro`** (GitHub Packages only, Q05). Storybook **Auth/Pro** and **Auth/Registry**. `yarn pack:inspect` must not list `src/pro` in the free tarball.
