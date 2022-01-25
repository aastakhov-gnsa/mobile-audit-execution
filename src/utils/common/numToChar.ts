/**
 * 1 -> a
 * 2 -> b
 * ...
 * 26 -> z
 * 27 -> aa
 * 28 -> ab
 * and so on
 * @param num
 */
export default function numToChar(num: number) {
  let s = '',
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = ((num - t) / 26) | 0;
  }
  return s.toLowerCase() || undefined;
}
