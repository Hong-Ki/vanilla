export function createId(prefix = '') {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${prefix}_${s4()}${s4()}`;
}
