import readline from 'node:readline';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { parseArgs, logCurrentDirectory,
  goUp, listDir, changeDir,
  logReadableChunks, makeDir, addFile,
  renameFile, copyFile, deleteFile, moveFile, handleOsCommands,
  calculateHash, compressFile, decompressFile
} from './helpers.js';

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
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        await listDir(entries);
        break;
      
      case 'cat':
        const readable = fs.createReadStream(
          args[0], {encoding: 'utf8'});
        logReadableChunks(readable);
        break;

      case 'mkdir':
        await makeDir(fs, path, args[0], currentDir);
        break;

      case 'add':
        await addFile(fs, path, args[0], currentDir);
        break;

      case 'rn':
        await renameFile(fs, path, args[0], args[1], currentDir);
        break;
      
      case 'cp':
        await copyFile(fs, path, args[0], args[1], currentDir);
        break;
      
      case 'mv':
        await moveFile(fs, path, args[0], args[1], currentDir);
        break;

      case 'rm':
        await deleteFile(fs, args[0]);
        break;

      case 'os':
        handleOsCommands(os, args[0]);
        break;

      case 'hash':
        await calculateHash(fs, crypto, args[0]);
        break;

      case 'compress':
        await compressFile(fs, path, zlib, args[0], args[1], currentDir);
        break;
      case 'decompress':
        await decompressFile(fs, path, zlib, args[0], args[1], currentDir);
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
