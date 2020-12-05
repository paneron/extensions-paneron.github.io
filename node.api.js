import path from 'path'
import fs from 'fs'

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
