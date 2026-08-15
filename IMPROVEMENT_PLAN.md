# Completion plan

1. Map the actual Next.js Pages Router catalog flows and reconcile them with the short README, components, lib and scripts.
2. Verify every `.env.example` variable and document which external/data integrations are actually required.
3. Identify catalog data provenance and add typed validation at ingestion/read boundaries.
4. Review scripts for idempotency, failure handling and accidental destructive behavior before documenting them as supported workflows.
5. Add robust loading, empty, pagination/filter, not-found, malformed-data and provider-error states.
6. Audit image optimization, metadata, canonical URLs and structured data for catalog/detail pages that exist.
7. Standardize package management: both npm and pnpm lockfiles are tracked, so choose one canonical toolchain.
8. Add tests for catalog transformations, routing and primary browse/detail interactions.
9. Add CI for lint/type-check, tests, script/data validation and production Next.js build.
10. Rewrite README into verified portfolio documentation with data model, architecture, setup, scripts, deployment and limitations.
