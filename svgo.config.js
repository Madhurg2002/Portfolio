/**
 * SVGO settings for the brand logos in app/skillsIcons.
 *
 * These ship as <img src> assets, cached separately from the JS bundle, so the
 * win here is bytes over the wire rather than bundle weight. The settings are
 * deliberately conservative: brand marks are the one thing on the page where a
 * subtle geometry change is immediately visible.
 *
 * - removeViewBox is not in preset-default, so viewBox is never at risk.
 *   (Configuring it as a preset-default override is an error in SVGO 4.)
 * - xmlns stays. These are standalone files loaded through <img>, not inline
 *   markup, so the namespace declaration is required to parse.
 * - floatPrecision 2 is sub-pixel on the smallest viewBox here (32 units on
 *   the React mark), where 1 would start to show on the curves.
 *
 * Re-run with: npm run optimize:icons
 */
export default {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          convertPathData: { floatPrecision: 2 },
        },
      },
    },
  ],
};
