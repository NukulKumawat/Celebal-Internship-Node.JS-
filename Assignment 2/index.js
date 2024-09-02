const fs = require("fs").promises;
const path = require("path");
const http = require("http");
const url = require("url");
const querystring = require("querystring");

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    if (pathname === "/") {
      const filePath = path.join(__dirname, "public", "index.html");
      try {
        const data = await fs.readFile(filePath);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    } else if (pathname === "/create" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const postParams = querystring.parse(body);
        const filename = postParams.filename;
        const filePath = path.join(__dirname, "public", filename);
        try {
          await fs.writeFile(filePath, "");
          res.writeHead(302, { Location: "/" });
          res.end();
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        }
      });
    } else if (pathname.startsWith("/read") && req.method === "GET") {
      const query = querystring.parse(parsedUrl.query);
      const filename = query.filename;
      const filePath = path.join(__dirname, "public", filename);
      try {
        const data = await fs.readFile(filePath, "utf8");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File Not Found");
      }
    } else if (pathname === "/delete" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const postParams = querystring.parse(body);
        const filename = postParams.filename;
        const filePath = path.join(__dirname, "public", filename);
        try {
          await fs.unlink(filePath);
          res.writeHead(302, { Location: "/" });
          res.end();
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        }
      });
    } else if (pathname === "/styles.css") {
      const filePath = path.join(__dirname, "public", "styles.css");
      try {
        const data = await fs.readFile(filePath, "utf8");
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page Not Found");
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
