import cluster from 'cluster'
import os from 'os'
import { fork } from 'child_process'
import http from 'http'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000
const cpus = os.availableParallelism()
const workerCount = cpus - 1

let current = 0
const workers = []

if (cluster.isPrimary) {
  for (let i = 1; i <= workerCount; i++) {
    const port = PORT + i
    const worker = fork(path.join(__dirname, 'dist/server.js'), [], {
      env: { PORT: port },
    })
    workers.push({ port, process: worker })
  }

  const balancer = http.createServer((req, res) => {
    const target = workers[current]
    const proxyReq = http.request(
      {
        hostname: 'localhost',
        port: target.port,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers)
        proxyRes.pipe(res, { end: true })
      }
    )

    req.pipe(proxyReq, { end: true })

    proxyReq.on('error', (err) => {
      res.writeHead(500)
      res.end(`Balancer error: ${err.message}`)
    })

    current = (current + 1) % workers.length
  })

  balancer.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`)
  })
}
