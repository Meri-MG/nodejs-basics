import { validate as isValidUUID } from 'uuid';

export default async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const parts = pathname.split('/');
  const id = parts[3];
  const users = req.users;

  if (pathname.startsWith('/api/users/')) {
    if (!isValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ title: "Invalid user ID", message: "Invalid user ID format (UUID expected)" }));
      return;
    }

    try {
      const index = users.findIndex(user => String(user.id) === String(id));

      if (index === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: "Not Found", message: "User not found" }));
        return;
      }

      users.splice(index, 1);

      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();

    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        title: "Error",
        message: "An error occurred while deleting the user",
      }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
