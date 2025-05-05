export function parseArgs(argv) {
  const args = {};
  argv.slice(2).forEach(arg => {
    const [key, value] = arg.split('=');
    args[key.replace(/^--/, '')] = value;
  });
  return args;
}

export function logCurrentDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}