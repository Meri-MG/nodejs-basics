import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  entry: './src/index.js',
  target: 'node',
  mode: 'production',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    module: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
    topLevelAwait: true,
  },
}
