import { version as uuidVersion } from 'uuid';
export default (req, res) => {
   const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const parts = pathname.split('/');
  const id = parts[3];
  const users = req.users

  if (pathname === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  if (pathname === '/api/users/' && !uuidVersion(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid user ID format (UUID expected)' }));
    return;
  }

  const foundUser = users.find(user => user.id === id);

  if (!foundUser) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(foundUser));
}
