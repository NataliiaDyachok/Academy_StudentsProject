import ApiError from '../error/ApiError.js';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import dbData from'../db/index.js';

class UserService {  
    
  async login(username: string, password: string) {
    console.log('username = '+username+' password = '+password);
    return true;
  }
  
  async register(body: { email: string; password: string; username: string; }){
    
    // Check if the email is already in the database
    const emailExist =
      await dbData.dbWrapper().dbModels.user.findOne({
        where: {
          email: body.email,
          deleted_at: { [Sequelize.Op.is]: null }
        }
      });
    if(emailExist) {
      return (ApiError.badRequest('The email is already registered.'));
    }
    
    try {
      // Hash the password
      const salt = await bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(body.password, salt);

      const user = {
        username: body.username || '',
        email: body.email,
        password: hashPassword
      };

      const result = await dbData.dbWrapper().dbModels.user.create(user);
      return result;

    } catch (err: any) {
      return ApiError.notImplemented(err.message || err);
    }
    
  }

  async getById(id: unknown) {
    console.log('id = '+id);
    return true;
  }
}

export default UserService;
