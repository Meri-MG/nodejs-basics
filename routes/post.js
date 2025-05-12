import { v4 as uuidv4 } from 'uuid';
import requestBodyparser from "../utils/body-parser.js";

export default async (req, res) => {
  if (req.url === "/api/users") {
    try {
      let body = await requestBodyparser(req);
      const { username, age, hobbies } = body;
      const isValid =
        typeof username === "string" &&
        typeof age === "number" &&
        Array.isArray(hobbies);

      if (!isValid) {
        throw new Error("Invalid or missing fields");
      }
      body.id = uuidv4();
      req.users.push(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
