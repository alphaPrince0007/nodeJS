const http = require("http");

const server = http.createServer((req, res) => {
  res.end("hi how are you");
});

server.listen(3000);
