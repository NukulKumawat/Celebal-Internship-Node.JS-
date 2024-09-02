const fs = require("fs").promises;
const path = require("path");
const http = require("http");
const url = require("url");
const querystring = require("querystring");

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(`http://localhost:${port}${req.url}`);
    const pathname = parsedUrl.pathname;

    if (pathname === "/") {
      const filePath = path.join(__dirname, "public", "index.html");
      const data = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    } else if (pathname === "/create" && req.method === "POST") {
      const body = await getRequestBody(req);
      const postParams = querystring.parse(body);
      const filename = postParams.filename;
      const filePath = path.join(__dirname, "public", filename);
      await fs.writeFile(filePath, "");
      redirectTo(res, "/");
    } else if (pathname.startsWith("/read") && req.method === "GET") {
      const query = parsedUrl.searchParams;
      const filename = query.get("filename");
      const filePath = path.join(__dirname, "public", filename);
      const data = await fs.readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    } else if (pathname === "/delete" && req.method === "POST") {
      const body = await getRequestBody(req);
      const postParams = querystring.parse(body);
      const filename = postParams.filename;
      const filePath = path.join(__dirname, "public", filename);
      await fs.unlink(filePath);
      redirectTo(res, "/");
    } else if (pathname === "/styles.css") {
      const filePath = path.join(__dirname, "public", "styles.css");
      const data = await fs.readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
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

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
}

function redirectTo(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
