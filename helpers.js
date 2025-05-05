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

async function listDir(currentDir) {
  const fs = await import('node:fs/promises');
  const entries = await fs.readdir(currentDir, { withFileTypes: true });
  const result = entries.map(entry => ({
    Name: entry.name,
    Type: entry.isDirectory() ? 'directory' : 'file'
  }));

  console.table(result);
}

export {
  parseArgs,
  logCurrentDirectory,
  goUp,
  changeDir,
  listDir
}