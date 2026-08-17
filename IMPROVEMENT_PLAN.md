# Completion plan

1. Document the actual Pages Router product from the tree: directory/search results, sidebar/navigation, user profile editing and cluster provisioning; reconcile these implemented surfaces with the short README.
2. Trace the MongoDB-backed data model through `lib/mongodb.ts`, `lib/api/user.ts`, pages/API routes and scripts; define typed schemas and validate records at every database/API boundary.
3. Verify each `.env.example` variable by its consumer and separate MongoDB/server credentials from public runtime configuration; fail startup clearly when required server configuration is missing.
4. Audit profile editing and any upload/edit actions for authentication, authorization, ownership and input validation; server-side checks must not rely on hidden UI controls.
5. Review `cluster-provisioning.tsx` and related API/script behavior: document whether it truly provisions infrastructure or is a UI/demo flow, and prevent unsupported operational claims.
6. Make directory search/pagination deterministic with debouncing, stable ordering, empty/no-match/malformed-data/provider-error states and preserved query state during retries.
7. Audit profile images and catalog media for allowed remote origins, size limits, fallback behavior, alt text and Next.js image optimization; add canonical metadata/structured data only for real public pages.
8. Standardize the package manager/lockfile and pin a supported Node version; ensure data/bootstrap scripts are idempotent or explicitly marked destructive before they are documented.
9. Add unit tests for data normalization/search plus integration tests for profile/API authorization and browse/detail flows, with CI for lint/typecheck/tests/scripts/Next production build.
10. Rewrite README as verified directory/catalog portfolio documentation covering architecture, MongoDB model, implemented profile/search/provisioning scope, setup, screenshots, deployment and limitations.
