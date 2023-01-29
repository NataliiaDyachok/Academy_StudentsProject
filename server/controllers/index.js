import ApiError from '../error/ApiError.js';
import userController from './UserController.js';
import classController from './ClassController.js';
import eventsController from './EventsController.js';

function notFound(req, res) {
  const resObj = ApiError.badRequest('Bad Request');

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = resObj.status;
  res.write(resObj.message);
  res.end();
}

export default {
  userController,
  classController,
  eventsController,
  notFound,
};
