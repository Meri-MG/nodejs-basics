import { handleStreams } from "../helpers.js";

async function addFile(fs, path, fileName, currentDir) {
  const filePath = path.join(currentDir, fileName);

  await fs.writeFile(filePath, '');
}

async function readFile(fs, path, source, currentDir) {
  const fileHandleRead = await fs.open(path.join(currentDir, source), 'r');
  const readable = await fileHandleRead.createReadStream({ encoding: 'utf8' });
  for await (const chunk of readable) {
    console.log(chunk);
  }
}

async function renameFile(fs, path, oldName, newName, currentDir) {
  const oldPath = path.join(currentDir, oldName);
  const newPath = path.join(currentDir, newName);

  await fs.rename(oldPath, newPath);
}

async function copyFile(fs, path, source, destination, currentDir) {
  const { streamRead, streamWrite } = await handleStreams(fs, path, source, destination, currentDir)

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
  addFile,
  readFile,
  renameFile,
  copyFile,
  deleteFile,
  moveFile
}