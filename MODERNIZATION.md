# catalog — Modernization Roadmap

The repository contains a Next.js/TypeScript catalog application with components, library code, scripts, environment configuration and Tailwind. It is a candidate for deeper product-quality work.

## 10 tasks

1. Trace the current data source and catalog domain model and document only the fields/features actually implemented.
2. Standardize package management: both `package-lock.json` and `pnpm-lock.yaml` are present, so choose one package manager and remove lockfile ambiguity after verifying the intended workflow.
3. Audit `.env.example` for safe placeholders and document required variables with server/client boundaries.
4. Add schema/runtime validation for external catalog data before it reaches UI components.
5. Add explicit loading, empty, error and unavailable-item states across catalog views.
6. Add tests for data transformation, filtering/sorting behavior and primary navigation/product-detail flows that actually exist.
7. Add CI for lint, type-check, tests and production build using the selected package manager.
8. Audit large-list rendering, image delivery, caching and Core Web Vitals; measure before introducing optimization claims.
9. Improve accessibility for catalog navigation, controls, focus order and product/content cards.
10. Rewrite the README as a portfolio case with verified architecture, screenshots, data scale only where evidenced, and a clear explanation of product decisions.

## Portfolio value

Potentially strong if the repository contains real catalog interaction and data handling. Prioritize reliability and evidence over adding fashionable features that the product does not need.