import path from 'path'
import discoverExtensions from './compiled/extensionDiscovery' // TODO: Is /compiled/ reference on purpose? Will it break on direct .ts reference? Fix or comment
import makeStaticConfig from '@riboseinc/paneron-website-common/scaffolding/makeStaticConfig'


export default makeStaticConfig({
  entry: path.join(__dirname, 'src', 'index.tsx'),
  routeBuilder: async () => {
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
})
