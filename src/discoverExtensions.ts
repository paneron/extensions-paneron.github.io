import axios from 'axios';
import npmSearch from 'libnpmsearch';
import parseJSON from 'date-fns/parseJSON';
import type { Extension, NPMPackageSearchEntry, NPMPackage, NPMPackageVersion, PaneronExtensionMeta, PaneronExtensionPackageVersion } from './types';


/** Builds a list of Paneron extension metadata objects from NPM registry. */
async function discoverExtensions(): Promise<Extension[]> {
  const packages = [
    ...(await npmSearch('paneron')),
  ];
  console.debug("Found packages", packages);
  const extensions: Extension[] = await Promise.all(packages.filter(isExtension).map(loadExtension));
  const validExtensions = extensions.filter(ext => ext !== null);
  if (validExtensions.length < 1) {
    throw new Error("No extensions found, possible issue during build");
  }
  return validExtensions;
}


function validateNPMExtensionName(name: string): boolean {
  // Initially we only allow extensions hosted under first-party scopes
  return (
    name.startsWith('@riboseinc/paneron-extension-') ||
    name.startsWith('@paneron/extension-')
  ) && (
    name !== '@riboseinc/paneron-extension-kit' &&
    name !== '@paneron/extension-kit'
  );
}


function isExtension(entry: NPMPackageSearchEntry): boolean {
  return validateNPMExtensionName(entry.name);
}


function getLatestVersion<T extends NPMPackageVersion>(pkg: NPMPackage<T>): T {
  const latestVersion = pkg.versions[pkg['dist-tags']?.latest]

  if (!latestVersion) {
    throw new Error("Missing latest version")
  }

  return latestVersion
}


/**
 * Takes NPM package structure that hopefully describes a Paneron extension,
 * if it does returns with narrowed type, otherwise throws a descriptive error.
 */
function parseExtensionPkg(pkg: NPMPackage): NPMPackage<PaneronExtensionPackageVersion> {
  const latestVersion = getLatestVersion(pkg) as Partial<PaneronExtensionPackageVersion>

  if (latestVersion.paneronExtension === undefined) {
    throw new Error("Extension meta is missing")
  }

  const extensionMeta = latestVersion.paneronExtension as Partial<PaneronExtensionMeta>

  try {
    new URL(extensionMeta.iconURL)
  } catch (e) {
    throw new Error("Extension meta: icon URL does not seem to be valid")
  }

  if (!extensionMeta.title || !extensionMeta.requiredHostAppVersion) {
    throw new Error("Extension meta: missing title or required host app version")
  }

  return pkg as NPMPackage<PaneronExtensionPackageVersion>
}


async function loadExtension(npm: NPMPackageSearchEntry): Promise<Extension | null> {
  const packageResponse = await axios.get(`https://registry.npmjs.com/${npm.name}`)

  if (packageResponse.data?.name !== npm.name) {
    console.error("NPM package name does not match search entry name", npm.name)
    return null
  }

  const pkg: NPMPackage = packageResponse.data

  let extensionPkg: NPMPackage<PaneronExtensionPackageVersion>

  try {
    extensionPkg = parseExtensionPkg(pkg)
  } catch (e) {
    console.error("Unable to parse Paneron extension meta from NPM package", pkg.name, e)
    return null
  }

  const latestVersion = getLatestVersion(extensionPkg)

  //console.debug("Downloading extension tarball to build", latestVersion.dist.tarball);

  const ext: Extension = {
    ...latestVersion.paneronExtension,
    author: latestVersion.author.name,
    description: latestVersion.description,
    latestUpdate: parseJSON(extensionPkg.time['modified']),
    websiteURL: extensionPkg.homepage,
    npm: latestVersion,
  }

  try {
    ext.tarball = (await axios.get(
      latestVersion.dist.tarball,
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/gzip',
        },
      },
    )).data;
  } catch (e) {
    console.error("Failed to download extension code tarball", extensionPkg.name, e);
  }

  return ext
}


export default discoverExtensions
