// TODO: Why can’t this be in TS again?

import path from 'path'
import os from 'os'
import { build as esbuild } from 'esbuild'
import tar from 'tar'
import fs from 'fs'


/** Serializes given `data` and writes it under specified `distPath`/`fileName`. */
function outputJSON(distPath, fileName, data) {
  console.debug("Writing JSON asset", distPath, fileName)
  fs.writeFileSync(
    path.join(distPath, fileName),
    JSON.stringify(data, undefined, 2))
}

function gatherExtensionInfo(route) {
  const extInfo = {
    ...route.data.extension,
    basePath: route.path,
  }
  // Drop NPM internals
  for (const key of Object.keys(extInfo.npm).filter(key => key.startsWith('_'))) {
    delete extInfo.npm[key];
  }
  return extInfo
}


const BUILT_EXTENSION_FILENAME = 'build.js'


export default (opts) => {
  return {
    afterExport: async (state) => {
      // Writes extensions.json in site dist root
      const extensions = state.routes.
        filter(r => r.data.itemType === 'extension').
        map(gatherExtensionInfo).
        reduce((prev, curr) => ({ ...prev, ...{ [curr.npm.name]: curr } }), {})

      for (const ext of Object.values(extensions).filter(ext => ext.tarball !== undefined)) {
        // IMPORTANT: We don’t want that in JSON
        const extDir = await unpackExtension(ext)
        console.debug("Unpacked extension to temporary directory", ext.npm.name, extDir)

        const entryPoint = getEntryPoint(extDir)

        if (entryPoint) {
          const outFilePath = path.join(
            state.config.paths.DIST,
            extensions[ext.npm.name].basePath,
            BUILT_EXTENSION_FILENAME)
          console.debug("Building unpacked extension to file", outFilePath)
          try {
            await buildExt(entryPoint, outFilePath)
            fs.rmdirSync(extDir, { recursive: true })
            ext.builtJS = path.posix.join(
              state.config.siteRoot,
              extensions[ext.npm.name].basePath,
              BUILT_EXTENSION_FILENAME)
            console.info("Built extension & cleaned up directory", ext.npm.name)
          } catch (e) {
            console.error("Failed to build extension", ext.npm.name, e)
            console.warn("NOT cleaning up directory:", extDir)
          }
        } else {
          console.warn("Unable to locate extension’s entry point, skipping build & cleaning up directory")
          fs.rmdirSync(extDir, { recursive: true })
        }

        //fs.rmdirSync(extDir, { recursive: true })
      }

      outputJSON(
        state.config.paths.DIST,
        'extensions.json',
        { extensions })
    },
  }
};


/** Unpacks extension & deletes `tarball` from extension data. */
async function unpackExtension(ext) {
  // This must be local, under process.cwd
  const extDir = fs.mkdtempSync(path.join(
    os.tmpdir(),
    `paneron-extension-${encodeURIComponent(ext.npm.name)}`,
  ))

  //console.debug("Unpacking extension to path", ext.npm.name, extDir)
  try {
    fs.rmdirSync(extDir)
  } catch (e) {}
  fs.mkdirSync(extDir, { recursive: true })
  const tarballPath = path.join(extDir, 'tarball.tgz')
  fs.writeFileSync(tarballPath, ext.tarball)
  await tar.x({ file: tarballPath, cwd: extDir })

  // IMPORTANT
  delete ext.tarball;

  return extDir;
}


function getEntryPoint(extDir) {
  const entryPoint = path.join(extDir, 'package', 'plugin.ts');
  if (fs.existsSync(entryPoint) && fs.statSync(entryPoint).isFile()) {
    return entryPoint
  } else {
    //console.debug("Entry point does not exist at", entryPoint);
    return undefined
  }
}


async function buildExt(entryPoint, outfile) {
  return await esbuild({
    entryPoints: [entryPoint],
    format: 'esm',
    bundle: true,
    outfile,
    platform: 'browser',
    external: [
      '@riboseinc/*',
      '@blueprintjs/*',
      '@emotion/*',
      'react-dom',
      'react',
      'immutability-helper',
    ],
    //packages: 'external',
    tsconfigRaw: JSON.stringify({
      "compilerOptions": {
        "target": "es2020",
        "module": "esnext",
        "moduleResolution": "node",

        "strict": true,
        "noUnusedLocals": true,
        "verbatimModuleSyntax": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,

        "sourceMap": true,
        "inlineSources": true,
        "skipLibCheck": true,

        "allowSyntheticDefaultImports": true,
        "experimentalDecorators": true,

        "newLine": "lf",

        "declaration": true,
        "jsx": "react",
      },
    }),
    minify: false,
    sourcemap: 'inline',
    target: ['chrome94'], // Matches the one bundled with Paneron’s Electron version
    logLevel: 'debug',
  })
}
