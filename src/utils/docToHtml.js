/**
 * Convert a Content API "content" field to HTML.
 *
 * Recursively examine each entry in the tree and build up the HTML as it goes.
 *
 * FIXME Implement missing types:
 * - dotImage
 * - dotContent
 * - what else?
 *
 * FIXME Support various `attrs`.
 */
export function docToHtml(contents) {
  return contents.reduce((html, content) => {
    switch (content.type) {
      case 'text':
        return html + content.text
      case 'doc':
        return html + docToHtml(content.content)
      case 'paragraph':
        return html + '<p>' + docToHtml(content.content) + '</p>'
      case 'bulletList':
        return html + '<ul>' + docToHtml(content.content) + '</ul>'
      case 'listItem':
        return html + '<li>' + docToHtml(content.content) + '</li>'
      case 'heading':
        return html + `<h${content.attrs.level}>` + docToHtml(content.content) + `</h${content.attrs.level}>`
      default:
        console.error(`[docToHtml] Unhandled content type ${content.type}.`)
        return html + ('content' in content ? docToHtml(content.content) : '')
    }
  }, '')
}
