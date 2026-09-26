import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vitest gets its own config rather than reusing vite.config.ts: the
 * React Router plugin rewrites JSX to expect its client-side runtime
 * preamble, which is not present in a bare component test, so every test
 * that rendered a component died with "React Router Vite plugin can't detect
 * preamble". esbuild picks up `jsx: react-jsx` from tsconfig on its own.
 *
 * Route typegen and the plugin itself stay a build concern (npm run build).
 *
 * Environment defaults to node; DOM tests opt in per file with a
 * `// @vitest-environment jsdom` docblock.
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
  },
});
