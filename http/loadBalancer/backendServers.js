const http = require('http');
const serverConfig = require('./config.json').servers;

const createBackendServers = (host, port) => {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Server response from port : ${port}`)
    }).listen(port, host, () => {
        console.log(`Server is running at http://${host}:${port}`);
    })
}

serverConfig.forEach(server => createBackendServers(server.host, server.port));