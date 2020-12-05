import path from 'path'
import discoverExtensions from './compiled/extensionDiscovery'


export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const extensions = await discoverExtensions();

    return [
      {
        path: '/',
        template: 'src/containers/Home',
        getData: () => ({
          extensions,
        }),
        children: extensions.map((extension) => ({
          path: `/e/${extension.npm.name}`,
          template: 'src/containers/Extension',
          getData: () => ({
            itemType: 'extension',
            extension,
          }),
        })),
      },
    ]
  },
  plugins: [
    'react-static-plugin-typescript',
    'react-static-plugin-emotion',
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
