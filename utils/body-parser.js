export default async (request) => {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        console.error("Failed to parse request body:", err);
        reject(err);
      }
    });

    request.on("error", (err) => {
      console.error("Request stream error:", err);
      reject(err);
    });
  });
};
