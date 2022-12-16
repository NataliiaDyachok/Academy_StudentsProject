const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const server = express();
const expressWs = require("express-ws")(server);

const port = process.env.PORT;

server.use(function (req, res, next) {
  console.log("middleware");
  req.testing = "testing";
  return next();
});

server.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

server.ws("/ws", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
  });
  ws.on("close", function () {
    console.log("The connection was closed! ");
  });
});

const aWss = expressWs.getWss("/ws");

aWss.on("connection", function (socket) {
  console.log("Connection open");
});

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
      console.error(err, "Failed to close server!");
      callback();
      return;
    }
    console.log("Server has been stopped.");
    callback();
  });
}

function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.error(error);
    console.log("Gracefully stopping...");
    stop(() => {
      process.exit();
    });
  };

  process.on("SIGINT", exitHandler);
  process.on("SIGTERM", exitHandler);
  process.on("SIGUSR1", exitHandler);
  process.on("SIGUSR2", exitHandler);
  process.on("uncaughtException", exitHandler);
  process.on("unhandledRejection", exitHandler);
}

async function boot() {
  enableGracefulExit();
  await start();
}

boot();
