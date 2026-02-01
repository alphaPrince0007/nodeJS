const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({ xfwd: true });

proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err.code || err.message);

  if (!res.headersSent) {
    res.writeHead(502, { "Content-Type": "text/plain" });
  }
  res.end("Bad Gateway");
});

const leastConnections = (servers, req, res, requestCount) => {
  if (!servers.length) {
    res.writeHead(500);
    return res.end("No backend servers available");
  }

  // ✅ SELECT server with minimum connections (DO NOT sort array)
  let target = servers[0];
  for (const server of servers) {
    if (server.connections < target.connections) {
      target = server;
    }
  }

  target.connections++;

  console.log(
    `→ Request #${requestCount} forwarded to ${target.host}:${target.port} (connections: ${target.connections})`,
  );

  proxy.web(req, res, {
    target: `http://${target.host}:${target.port}`,
    timeout: 5000,
    proxyTimeout: 5000,
  });

  res.on("finish", () => {
    target.connections = Math.max(0, target.connections - 1);
    console.log(
      `✓ Request #${requestCount} completed on ${target.host}:${target.port} (connections: ${target.connections})`,
    );
  });
};

module.exports = leastConnections;
