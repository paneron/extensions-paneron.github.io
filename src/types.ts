export interface Extension extends PaneronExtensionMeta {
  author: string
  description: string
  latestUpdate: Date
  websiteURL?: string
  npm: Pick<NPMPackageVersion, 'name' | 'version' | 'bugs' | 'dist'>
  tarball?: ArrayBuffer
}


/** This metadata lives under a custom Paneron-specific subkey of package.json */
export interface PaneronExtensionMeta {
  title: string
  iconURL: string
  featured: boolean
  requiredHostAppVersion: string
}


export interface NPMPackageSearchEntry {
  name: string
  version: string
  description: string
  author: {
    name: string
    username: string
  }
}

// /** Type of an object returned from NPM registry v1 search JSON */
// export interface NPMSearchEntry {
//   package: NPMPackage
// }


export interface NPMPackageVersion {
  name: string
  version: string
  description: string
  author: {
    email: string
    name: string
  }
  _npmUser: {
    email: string
    name: string
  }
  bugs: {
    url: string
  }
  dist: {
    tarball: string
    integrity: string
    "npm-signature": string
    shasum: string
    unpackedSize: number
  }
}


export interface PaneronExtensionPackageVersion extends NPMPackageVersion {
  paneronExtension: PaneronExtensionMeta
}


/**
 * Type of an object returned from NPM registry individual item JSON.
 * Version JSON can contain custom fields in addition to generally used ones;
 * that can be specified by passing Version generic type parameter.
 */
export interface NPMPackage<Version extends NPMPackageVersion = NPMPackageVersion> {
  _id: string
  name: string
  description: string
  homepage?: string
  "dist-tags": {
    latest: string
  }
  time: {
    [timestamp: string]: Date
  }
  versions: {
    [versionID: string]: Version
  }
}
