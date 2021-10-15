import makeStaticConfig from '@riboseinc/paneron-website-common/scaffolding/makeStaticConfig'

// NOTE: If we don’t refer to compiled JS here, we’ll get
// Trace: Error: Cannot find module './discoverExtensions'.
// This can probably be resolved more elegantly, but there we go for now.
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
