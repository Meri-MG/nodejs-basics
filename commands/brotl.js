import { handleStreams } from "../helpers.js";

async function compressFile(fs, path, zlib, source, destination, currentDir) {
  const { streamRead, streamWrite } = await handleStreams(fs, path, source, destination, currentDir)
  const brotli = zlib.createBrotliCompress();
  const stream = streamRead.pipe(brotli).pipe(streamWrite);

  stream.on('finish', () => {
    console.log('Done compressing');
  });
}

async function decompressFile(fs, path, zlib, source, destination, currentDir) {
  const { streamRead, streamWrite } = await handleStreams(fs, path, source, destination, currentDir)
  const brotli = zlib.createBrotliDecompress();
  const stream = streamRead.pipe(brotli).pipe(streamWrite);

  stream.on('finish', () => {
    console.log('Done decompressing');
  });
}

export {
  compressFile,
  decompressFile
}