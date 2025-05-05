function parseArgs(argv) {
  const args = {};
  argv.slice(2).forEach(arg => {
    const [key, value] = arg.split('=');
    args[key.replace(/^--/, '')] = value;
  });
  return args;
}

function logCurrentDirectory(currentDir) {
  console.log(`You are currently in ${currentDir}`);
}

function goUp(path, currentDir, rootDir) {
  const parentDir = path.dirname(currentDir);
  if (parentDir.length < rootDir.length) {
    return currentDir;
  }
  return parentDir;
}

function changeDir(fs, path, inputPath, currentDir) {
  const resolvedPath = path.resolve(currentDir, inputPath);

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    return resolvedPath;
  } else {
    console.log('Operation failed');
    return currentDir;
  }
}

async function listDir(entries) {
  const result = entries.map(entry => ({
    Name: entry.name,
    Type: entry.isDirectory() ? 'directory' : 'file'
  }));

  console.table(result);
}

async function logReadableChunks(readable) {
  for await (const chunk of readable) {
    console.log(chunk);
  }
}

async function makeDir(fs, path, dirName, currentDir) {
  const newDirPath = path.join(currentDir, dirName);
  await fs.mkdir(newDirPath);
}

async function addFile(fs, path, fileName, currentDir) {
  const filePath = path.join(currentDir, fileName);

  await fs.writeFile(filePath, '');
}

async function renameFile(fs, path, oldName, newName, currentDir) {
  const oldPath = path.join(currentDir, oldName);
  const newPath = path.join(currentDir, newName);

  await fs.rename(oldPath, newPath);
}

async function copyFile(fs, path, source, destination, currentDir) {
  const fileHandleRead = await fs.open(path.join(currentDir, source), 'r');
  const fileHandleWrite = await fs.open(path.join(currentDir, destination), 'w');

  const streamRead = fileHandleRead.createReadStream();
  const streamWrite = fileHandleWrite.createWriteStream();
  streamRead.pipe(streamWrite);
}

async function moveFile(fs, path, source, destination, currentDir) {
  await copyFile(fs, path, source, destination, currentDir) 
  await deleteFile(fs, source)
}

async function deleteFile(fs, source) {
  await fs.unlink(source)
}

export {
  parseArgs,
  logCurrentDirectory,
  goUp,
  changeDir,
  listDir,
  logReadableChunks,
  makeDir,
  addFile,
  renameFile,
  copyFile,
  deleteFile,
  moveFile
}