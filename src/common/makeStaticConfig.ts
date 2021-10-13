export default function makeStaticConfig(opts: any) {
  return {
    plugins: [
      'react-static-plugin-typescript',
      'react-static-plugin-emotion',
      'react-static-plugin-reach-router',
      'react-static-plugin-sitemap',
    ],
    ...opts.overrides,
    entry: opts.entry,
    getRoutes: opts.routeBuilder,
  }
}
