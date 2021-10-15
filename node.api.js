import path from 'path'
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
    afterExport: (state) => {
      // Writes extensions.json in site dist root
      outputJSON(
        state.config.paths.DIST,
        'extensions.json',
        {
          extensions: state.routes.
            filter(r => r.data.itemType === 'extension').
            map(route => route.data.extension).
            map(gatherExtensionInfo).
            reduce((prev, curr) => ({ ...prev, ...{ [curr.npm.name]: curr } }), {}),
        })
    },
  }
};
