import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';

const authorize = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  if (!token) return next(ApiError.authenticationRequired('Access denied.'));

  const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // eslint-disable-next-line max-len
  req.user = verified; // set the request "authorized" property with the validation result

  // if(roles.length > 0 && !verified.roles.some(r => roles.includes(r))){
  //   return next(ApiError.authenticationRequired('Access denied.'));
  // }
  return next();
};

export default authorize;
