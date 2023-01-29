// import ApiError from '../error/ApiError.js';

class EventsService {  
    
  async attack(userId: unknown) {
    console.log('userId = '+userId);
    return true;
  }
  async message(message: string){
    console.log('message = '+message);
     return true;
  }
  async restore() {
      return true;
  }
  async ability() {
    return true;
  }

}

export default EventsService;