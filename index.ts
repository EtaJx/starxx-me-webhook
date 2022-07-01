import { IncomingMessage, ServerResponse } from "http";
import http from 'http';

const ROUTER_GUARDS = ['POST', '/deploy'];

const server = http.createServer();

server.on('request', (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  const [ METHOD, URL ] = ROUTER_GUARDS;
  if (method === METHOD && url === URL) {
    res.end({
      success: true
    });
  } else {
    res.statusCode = 403;
    res.end('Not Allowed')
  }
});


server.on('listening', () => {
  console.log('server is listening on port 8888');
})

server.listen(8888);
