import ApiError from '../error/ApiError.js';
// import userService from '../services/ClassService.js';

const getClassesList = async (req, res, next) => {
  try {
    const classesList = [];

    res.json(classesList);
  } catch (err) {
    next(ApiError.notImplemented(err.message || err));
  }
};

export default {
  getClassesList,
};
