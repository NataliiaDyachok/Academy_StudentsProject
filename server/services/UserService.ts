// import ApiError from '../error/ApiError.js';

class UserService {  
    
  async login(username: string, password: string) {
    console.log('username = '+username+' password = '+password);
    return true;
  }
  async register(params: unknown){
    console.log('params = '+params);
    return true;
  }
  async getById(id: unknown) {
    console.log('id = '+id);
    return true;
  }
}

// module.exports = UserService;
export default UserService;
