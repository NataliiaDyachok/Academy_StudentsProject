const Router = require('express');
const router = new Router();
const expressWs = require('express-ws')(router);

// const controllers = require('../controllers/index');

router.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

router.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

router.ws('/ws', function (ws, req) {
  ws.on('message', function (msg) {
    console.log(msg);
  });
  ws.on('close', function () {
    console.log('The connection was closed! ');
  });
});

const aWss = expressWs.getWss('/ws');

aWss.on('connection', function (socket) {
  console.log('Connection open');
});

module.exports = router;
