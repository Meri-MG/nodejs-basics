import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default (data) => {
  console.log("the data to wrtie in file :", data);
  try {
    const filePath = path.join(__dirname, "..", "data", "users.json");
    fs.writeFile(
      filePath,
      JSON.stringify(data),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};