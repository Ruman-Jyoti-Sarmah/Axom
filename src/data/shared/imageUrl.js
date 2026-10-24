/**
 * Wikimedia Commons image URL helper.
 *
 * Every legacy image in the site content is hot-linked from Commons via
 * Special:FilePath, which resizes on the fly. Keeping the helper in one
 * place means a single change to the resizing parameter affects every
 * module that uses it.
 */
export const w = (file, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
