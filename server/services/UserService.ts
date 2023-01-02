import ApiError = require('../error/ApiError');

class UserService {  
    
  async login({ username, password }) {
      return true;
  }
  async register(params){
      return true;
  }
  async getById(id) {
      return true;
  }
}

module.exports = UserService;
