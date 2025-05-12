import { createServer } from 'http'
import dotenv from 'dotenv'
import getReq from '../routes/get.js'
import postReq from '../routes/post.js'
import putReq from '../routes/put.js'
import deleteReq from '../routes/delete.js'
import users from '../db.js';
dotenv.config()

const PORT = process.env.PORT || 4001;

const server = createServer((req, res) => {
  req.users = users

  try {
    switch (req.method) {
      case 'GET':
        getReq(req, res);
        break;
      case 'POST':
        postReq(req, res);
        break;
      case 'PUT':
        putReq(req, res);
        break;
      case 'DELETE':
        deleteReq(req, res);
        break;
      default:
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ title: 'Not Found', message: 'Route not found' }));
        res.end();
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: 'Internal Server Error', error: error.message || 'Something went wrong on the server' }));
    res.end();
  }
})

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  }
)
}

export default server;