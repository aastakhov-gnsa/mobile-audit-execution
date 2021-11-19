export default function (filePath: string) {
  const ind = filePath.lastIndexOf('/');
  if (ind > -1) {
    return filePath.substring(ind + 1);
  } else {
    console.error('Cannot get file name from', filePath);
  }
}
