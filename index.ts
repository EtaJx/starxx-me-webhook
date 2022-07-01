import { IncomingMessage, ServerResponse } from 'http';
import { exec } from 'child_process';
import http from 'http';
import 'dotenv/config';

const { REQUEST_METHOD, PORT, WEBHOOK_ROUTE, EVENT } = process.env;

const handleUpdateRepo = () => {
  return new Promise(resolve => {
    exec('./scripts/updateRepo.sh', err => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
}

const server = http.createServer();

server.on('request', (req: IncomingMessage, res: ServerResponse) => {
  const { method, url, headers } = req;
  if (method === REQUEST_METHOD && url === WEBHOOK_ROUTE && headers['x-github-event'] === EVENT) {
    handleUpdateRepo().then(result => {
      if (result) {
        res.end('ok');
      } else {
        res.statusCode = 500;
        res.end('command failed')
      }
    })
  } else {
    res.statusCode = 403;
    res.end('Not Allowed')
  }
});


server.on('listening', () => {
  console.log(`server is listening on port ${PORT}`);
})

server.listen(PORT);
