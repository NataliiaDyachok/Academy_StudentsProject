import base64id from 'base64id';

import Router from 'express';
const router = new Router();

import expressWs from 'express-ws';
const expressWsRouter = expressWs(router);

import enumEvents from '../enums/enumEvents.js';
import eventsValidations from '../validations/eventsValidations.js';

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
  ws.on('message', function (event) {
    const dataEvent = JSON.parse(event);
    const typeEvent = dataEvent.type.trim().toUpperCase();

    const { error } =
      typeEvent === enumEvents.ATTACK
        ? eventsValidations.attackValidation(dataEvent)
        : typeEvent === enumEvents.MESSAGE
        ? eventsValidations.messageValidation(dataEvent)
        : typeEvent === enumEvents.ABILITY
        ? eventsValidations.abilityValidation(dataEvent)
        : eventsValidations.restoreValidation(dataEvent);
    if (error) {
      throw error;
    }

    let status = '';
    switch (typeEvent) {
      case enumEvents.ATTACK:
        controllers.eventsController.attack(ws, dataEvent);
        status = 'the attack was successfully executed';
        break;

      case enumEvents.MESSAGE:
        controllers.eventsController.message(ws, dataEvent);
        status = 'the message was sent successfully';
        break;

      case enumEvents.RESTORE:
        controllers.eventsController.restore(ws, dataEvent);
        status = 'the restore was successfully executed';
        break;

      case enumEvents.ABILITY:
        controllers.eventsController.ability(ws, dataEvent);
        status = 'the ability has been successfully applied';
        break;

      default:
        break;
    }

    console.log(status);
  });
  ws.on('close', function () {
    console.log('The connection was closed! ');
    connections.delete(ws);
  });
});

const aWss = expressWsRouter.getWss('/ws');

aWss.on('connection', function (socket, req) {
  const newId = base64id.generateId();
  const ip = req.ip;
  console.log('newId ' + newId);
  socket.id = newId + '(' + ip + ')';
  connections.add(socket);

  console.log('Connection open ' + socket.id);
});

router.use(controllers.notFound);

export default router;
