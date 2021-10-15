import makeStaticConfig from '@riboseinc/paneron-website-common/scaffolding/makeStaticConfig'

// TODO: Is /compiled/ reference on purpose? Will it break on direct .ts reference? Fix or comment
import discoverExtensions from './compiled/discoverExtensions'


export default {
  ...makeStaticConfig(),

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
    ];
  },
};
