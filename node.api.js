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

function gatherExtensionInfo(extension) {
  console.debug("Gathering extension info:", extension.npm.name);
  return extension;
}

export default (opts) => {
  return {
    afterExport: async (state) => {
      // Writes extensions.json in site dist root
      const extensions = state.routes.
        filter(r => r.data.itemType === 'extension').
        map(route => route.data.extension).
        map(gatherExtensionInfo).
        reduce((prev, curr) => ({ ...prev, ...{ [curr.npm.name]: curr } }), {})

      for (const ext of Object.values(extensions).filter(ext => ext.tarball !== undefined)) {
        const extDir = await unpackExtension(ext)
        console.debug("Unpacked extension to temporary directory", ext.npm.name, extDir)

        const entryPoint = getEntryPoint(extDir)

        if (entryPoint) {
          console.debug("Building unpacked extension...")
          try {
            const outFile = path.join(state.config.paths.DIST, `${encodeURIComponent(ext.npm.name)}.js`)
            await buildExt(entryPoint, outFile)
            fs.rmdirSync(extDir, { recursive: true })
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


async function unpackExtension(ext) {
  // This must be local, under process.cwd
  const extDir = fs.mkdtempSync(path.join(
    process.cwd(),
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
  // XXX: This won’t work, because TS sources are not currently packaged
  // and therefore plugin.ts does not exist.
  try {
    const effectiveEntryPoint = path.relative(process.cwd(), entryPoint)
    console.debug("Build: entry point", effectiveEntryPoint)
    console.debug("Build: entry point is a file?", fs.statSync(path.join(process.cwd(), effectiveEntryPoint)).isFile())
    if (effectiveEntryPoint.startsWith('..')) {
      throw new Error("Invalid effective entry point");
    }
    const result = await esbuild({
      entryPoints: [effectiveEntryPoint],
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
          "module": "node16",
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
    console.debug("Build: result", result)
  } finally {
  }
}
