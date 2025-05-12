import crypto from "crypto";
import requestBodyparser from "../utils/body-parser.js";
import writeToFile from "../utils/write-to-file.js";

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
      body.id = crypto.randomUUID();
      req.users.push(body);
      writeToFile(req.users);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
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
