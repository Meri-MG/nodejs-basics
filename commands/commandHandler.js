
import { compressFile, decompressFile } from './brotl.js';
import { handleOsCommands } from './osCommands.js';
import { calculateHash } from './calculateHash.js';
import { addFile, renameFile, copyFile, deleteFile, moveFile, readFile } from './fileCommands.js';
import { goUp, changeDir, listDir, makeDir } from './dirCommands.js';

export async function handleCommand(input, context) {
  const {
    fs, path, os, crypto, zlib,
    currentDirRef, rootDir
  } = context;

  const [command, ...args] = input.trim().split(' ');

  switch (command) {
    case 'up':
      currentDirRef.value = goUp(path, currentDirRef.value, rootDir);
      break;

    case 'cd':
      currentDirRef.value = await changeDir(fs, path, args[0], currentDirRef.value);
      break;

    case 'ls':
      const entries = await fs.readdir(currentDirRef.value, { withFileTypes: true });
      await listDir(entries);
      break;

    case 'cat':
      await readFile(fs, path, args[0], currentDirRef.value);
      break;

    case 'mkdir':
      await makeDir(fs, path, args[0], currentDirRef.value);
      break;

    case 'add':
      await addFile(fs, path, args[0], currentDirRef.value);
      break;

    case 'rn':
      await renameFile(fs, path, args[0], args[1], currentDirRef.value);
      break;

    case 'cp':
      await copyFile(fs, path, args[0], args[1], currentDirRef.value);
      break;

    case 'mv':
      await moveFile(fs, path, args[0], args[1], currentDirRef.value);
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
      await compressFile(fs, path, zlib, args[0], args[1], currentDirRef.value);
      break;

    case 'decompress':
      await decompressFile(fs, path, zlib, args[0], args[1], currentDirRef.value);
      break;

    default:
      console.log('Invalid input');
  }
}
