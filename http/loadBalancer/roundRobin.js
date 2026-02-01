const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({
  xfwd: true,
});

let current = 0;

// 🔥 CRITICAL: global error handler
proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err.code || err.message);

  if (!res.headersSent) {
    res.writeHead(502, { "Content-Type": "text/plain" });
  }
  res.end("Bad Gateway");
});

const roundRobin = (servers, req, res) => {
  if (!servers.length) {
    res.writeHead(500);
    return res.end("No backend servers available");
  }

    const target = servers[current];
    console.log(
      `→ Request #${requestCount} forwarded to ${target.host}:${target.port}`,
    );
  current = (current + 1) % servers.length;

  proxy.web(req, res, {
    target: `http://${target.host}:${target.port}`,
    timeout: 5000,
    proxyTimeout: 5000,
  });
};

module.exports = roundRobin;
