const http = require("http");
const roundRobin = require("./roundRobin");
const serverConfig = require("./config.json").servers;

const servers = serverConfig.map((server) => ({
  ...server,
}));

const loadBalancingAlgo = "roundRobin"; // can be extended to add more algorithms

const server = http.createServer((req, res) => {
  if (loadBalancingAlgo === "roundRobin") {
    roundRobin(servers, req, res);
  } else {
    res.writeHead(500);
    res.end("Load balancing algorithm is not suppported");
  }
});

server.listen(3000, () => {
  console.log(`Load balancer is running on 3000`);
});
