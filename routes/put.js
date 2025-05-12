import requestBodyparser from "../utils/body-parser.js";
import writeToFile from "../utils/write-to-file.js";
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
      const body = await requestBodyparser(req);
      const { username, age, hobbies } = body;

      const isValid =
        typeof username === "string" &&
        typeof age === "number" &&
        Array.isArray(hobbies);

      if (!isValid) {
        throw new Error("Invalid or missing fields");
      }

      const index = users.findIndex(user => String(user.id) === String(id));

      if (index === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: "Not Found", message: "User not found" }));
        return;
      }

      users[index] = { id, ...body };
      writeToFile(users);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users[index]));

    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        title: "Validation Failed",
        message: "Request body is not valid",
      }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
