const ApiError = require('../error/ApiError');
const userController = require('./UserController');
const classController = require('./ClassController');

function notFound(req, res) {
  const resObj = ApiError.badRequest('Bad Request');

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = resObj.status;
  res.write(resObj.message);
  res.end();
}

module.exports = {
  userController,
  classController,
  notFound,
};
