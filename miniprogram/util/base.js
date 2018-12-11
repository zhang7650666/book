export const removeHtmlTag = (str) => {
  let reg = /<\/?.+?\/?>/g;
  return str.replace(reg, '')
}