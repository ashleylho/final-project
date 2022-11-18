export default function removeSearchParam(url) {
  const indexOfSearchParam = url.indexOf('?');
  const indexOfHash = url.indexOf('#');
  return url.slice(0, indexOfSearchParam) + url.slice(indexOfHash);
}
