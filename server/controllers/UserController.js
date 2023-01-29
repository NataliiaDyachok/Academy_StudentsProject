import ApiError from '../error/ApiError.js';
import userValidation from '../validations/userValidation.js';
// import UserService from '../services/UserService.js';

const registerPost = async (req, res, next) => {
  try {
    const { error } = userValidation.registerValidation(req.body);
    if (error) {
      next(ApiError.badRequest(error.message || error));
      return;
    }

    // new UserService().register();

    const user = {
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: req.body.password,
    };

    res.json(user);
  } catch (err) {
    next(ApiError.notImplemented(err.message || err));
  }
};

const loginPost = async (req, res, next) => {
  try {
    const { error } = userValidation.loginValidation(req.body);
    if (error) {
      next(ApiError.badRequest(error.message || error));
      return;
    }

    const response = {
      status: 'Logged in',
    };

    res.json(response);
  } catch (err) {
    console.log(err);
    next(ApiError.notImplemented(err.message || err));
  }
};

const updPersonalDataPut = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: req.body.password,
    };

    res.json(user);
  } catch (err) {
    next(ApiError.notImplemented(err.message || err));
  }
};

const forgotPasswordPut = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: req.body.password,
    };

    res.json(user);
  } catch (err) {
    next(ApiError.notImplemented(err.message || err));
  }
};

export default {
  registerPost,
  loginPost,
  updPersonalDataPut,
  forgotPasswordPut,
};
