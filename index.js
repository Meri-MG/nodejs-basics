import readline from 'node:readline';
import { parseArgs } from './helpers.js';

const username = parseArgs(process.argv).username || 'Anonymous';
console.log(`Welcome to the File Manager, ${username}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', async (line) => {
  const input = line.trim();

  if (input === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  }
  rl.prompt();
});

process.stdin.resume();
rl.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
rl