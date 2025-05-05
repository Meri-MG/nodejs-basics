import readline from 'node:readline';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { parseArgs, logCurrentDirectory, exit, saluteUser } from './helpers.js';
import { handleCommand } from './commands/commandHandler.js';

const username = parseArgs(process.argv).username || 'Anonymous';
let currentDir = os.homedir();
const rootDir = path.parse(currentDir).root;
saluteUser(username);
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
    exit(username);
  }

  try {
    const currentDirRef = { value: currentDir };

    await handleCommand(input, {
      fs, path, os, crypto, zlib,
      currentDirRef,
      rootDir
    });

    currentDir = currentDirRef.value;
  } catch (err) {
    console.log('Operation failed');
  }

  logCurrentDirectory(currentDir);
  rl.prompt();
});

process.stdin.resume();
rl.on('SIGINT', () => {
  exit(username);
});
