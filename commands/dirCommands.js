function goUp(path, currentDir, rootDir) {
  const parentDir = path.dirname(currentDir);
  if (parentDir.length < rootDir.length) {
    return currentDir;
  }
  return parentDir;
}

async function changeDir(fs, path, inputPath, currentDir) {
  const resolvedPath = path.resolve(currentDir, inputPath);

  const stats = await fs.stat(resolvedPath);
  if (stats.isDirectory()) {
    return resolvedPath;
  }
}

async function listDir(entries) {
  const result = entries.map(entry => ({
    Name: entry.name,
    Type: entry.isDirectory() ? 'directory' : 'file'
  }));

  console.table(result);
}

async function makeDir(fs, path, dirName, currentDir) {
  const newDirPath = path.join(currentDir, dirName);
  await fs.mkdir(newDirPath);
}

export {
  goUp,
  changeDir,
  listDir,
  makeDir
}