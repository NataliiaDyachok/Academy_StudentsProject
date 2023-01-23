import Router from 'express';
const router = new Router();

import expressWs from 'express-ws';
const expressWsRouter = expressWs(router);

import controllers from '../controllers/index.js';
// const eventsController = controllers.eventsController;

const connections = new Set();

router.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

router.get('/', (req, res, next) => {
  res.send('Express + TypeScript Server');
});

router.ws('/ws', function (ws, req) {
  ws.on('message', function (message) {
    console.log(message);
    connections.forEach((client) => {
      client.send(JSON.stringify(message));
    });
  });
  ws.on('close', function () {
    console.log('The connection was closed! ');
    connections.delete(ws);
  });
});

const aWss = expressWsRouter.getWss('/ws');

aWss.on('connection', function (socket) {
  connections.add(socket);
  console.log('Connection open ' + socket._closeCode);
});

export default router;
