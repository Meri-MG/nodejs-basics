export async function calculateHash(fs, crypto, filePath) {
  const fileHandleRead = await fs.open(filePath, 'r');
  const input = fileHandleRead.createReadStream()

  const hash = crypto.createHash('sha256');
  input.on('readable', () => {
    const data = input.read();
    if (data)
      hash.update(data);
    else {
      console.log(`hash ${hash.digest('hex')} from ${filePath}`);
    }
  })
}