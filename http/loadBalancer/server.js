const http = require("http");
const roundRobin = require("./roundRobin");
const leastConnections = require("./leastConnections");
const serverConfig = require("./config.json").servers;

const servers = serverConfig.map((server) => ({
  ...server,
  connections: 0,
}));

// let loadBalancingAlgo = "roundRobin"; // "leastConnections"
let loadBalancingAlgo = "leastConnections"; // "leastConnections"

let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount++;

  console.log(`\nIncoming request #${requestCount}`);

  if (loadBalancingAlgo === "roundRobin") {
    console.log("Algorithm: Round Robin");
    roundRobin(servers, req, res, requestCount);
  } else if (loadBalancingAlgo === "leastConnections") {
    console.log("Algorithm: Least Connections");
    leastConnections(servers, req, res, requestCount);
  } else {
    res.writeHead(500);
    res.end("Load balancing algorithm is not supported");
  }
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Load balancer is running on 3000");
});
