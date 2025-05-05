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

async function handleStreams(fs, path, source, destination, currentDir) {
  const fileHandleRead = await fs.open(path.join(currentDir, source), 'r');
  const fileHandleWrite = await fs.open(path.join(currentDir, destination), 'w');

  const streamRead = fileHandleRead.createReadStream();
  const streamWrite = fileHandleWrite.createWriteStream();

  return { streamRead, streamWrite };
}

function exit(username) {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}

export {
  parseArgs,
  logCurrentDirectory,
  handleStreams,
  exit
}