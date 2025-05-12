import { validate as isValidUUID } from 'uuid';

export default (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const parts = pathname.split('/');
    const id = parts[3];
    const users = req.users;

    if (pathname === '/api/users') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
      return;
    }

    if (pathname.startsWith('/api/users/')) {
      if (!isValidUUID(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          title: 'Invalid user ID',
          message: 'Invalid user ID format (UUID expected)',
        }));
        return;
      }

      const foundUser = users.find(user => user.id === id);

      if (!foundUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          title: 'Not Found',
          message: 'User not found',
        }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(foundUser));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      title: 'Not Found',
      message: 'Route not found',
    }));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      title: 'Internal Server Error',
      message: err.message || 'Unexpected server error',
    }));
  }
};
