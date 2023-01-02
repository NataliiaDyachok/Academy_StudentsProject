const ApiError = require('../error/ApiError');
const userService = require('../services/ClassService.ts');

const getClassesList = async (req, res, next) => {
  try {
    const classesList = [];

    res.json(classesList);
  } catch (err) {
    next(ApiError.notImplemented(err.message || err));
  }
};

module.exports = {
  getClassesList,
};
