import writeToFile from "../utils/write-to-file.js";

export default (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const parts = pathname.split('/');
  const id = parts[3];
  const users = req.users
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (pathname.startsWith('/api/users/') && !uuidRegex.test(id)) {
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
  writeToFile(users);
  res.writeHead(204, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(foundUser));
}
