import { version as isValidUUID } from 'uuid';

export default (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const parts = pathname.split('/');
  const id = parts[3];
  const users = req.users

  if (pathname === '/api/users/' && !isValidUUID(id)) {
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

  users.splice(users.indexOf(foundUser), 1);
  res.writeHead(204, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(foundUser));
}
