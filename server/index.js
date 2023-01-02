// const express = require('express');
// const router = require('./routes/index');

// const server = express();
// const expressWs = require('express-ws')(server);

const server = require('./routes');

const { port } = require('./config');

/*
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const router = require('./routes/index');
const { port } = require('./config');
const db = require('./db');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'server')));
app.use(cookieParser());

app.use('/', router);
app.use(errorHandler);
*/

/*
server.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

server.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

server.ws('/ws', function (ws, req) {
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
*/

let listener;

async function start() {
  try {
    listener = server.listen(port, () => {
      console.log(`Server successfully started on port ${port}`);
    });
  } catch (err) {
    console.error(`ATTENTION!!! ${err}`);
  }
}

function stop(callback) {
  if (!server) {
    callback();
    return;
  }
  listener.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      callback();
      return;
    }
    console.log('Server has been stopped.');
    callback();
  });
}

module.exports = {
  start,
  stop,
};

// function enableGracefulExit() {
//   const exitHandler = (error) => {
//     if (error) console.error(error);
//     console.log('Gracefully stopping...');
//     stop(() => {
//       process.exit();
//     });
//   };

//   process.on('SIGINT', exitHandler);
//   process.on('SIGTERM', exitHandler);
//   process.on('SIGUSR1', exitHandler);
//   process.on('SIGUSR2', exitHandler);
//   process.on('uncaughtException', exitHandler);
//   process.on('unhandledRejection', exitHandler);
// }

// async function boot() {
//   enableGracefulExit();
//   await start();
// }

// boot();

/*

const { portEnv, db: dbConfig } = require('../config');
const server = require('./routes');
const db = require('./db');

let listener;

async function start() {
  try {
    await db.init();
    db.setType(dbConfig.defaultType);
    console.log(`Now db type is ${db.getType()}`);
    listener = server.listen(portEnv, () => {
      console.log(`Server successfully started on port ${portEnv}`);
    });
  } catch (err) {
    console.error(err);
  }
}

function stop(callback) {
  if (!server) {
    callback();
    return;
  }
  listener.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      callback();
      return;
    }
    console.log('Server has been stopped.');
    callback();
  });
}

module.exports = {
  start,
  stop,
};

*/
