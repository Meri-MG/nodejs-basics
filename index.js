import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs, logCurrentDirectory, goUp, listDir, changeDir } from './helpers.js';

const username = parseArgs(process.argv).username || 'Anonymous';
let currentDir = process.cwd();
const rootDir = path.parse(currentDir).root;
logCurrentDirectory(currentDir);

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

  try {
    const [command, ...args] = input.split(' ');

    switch (command) {
      case 'up':
        currentDir = goUp(path, currentDir, rootDir)
        break;

      case 'cd':
        currentDir = changeDir(fs, path, args[0], currentDir);
        break;

      case 'ls':
        await listDir(currentDir);
        break;

      default:
        console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  }

  logCurrentDirectory(currentDir);
  rl.prompt();
});

process.stdin.resume();
rl.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
