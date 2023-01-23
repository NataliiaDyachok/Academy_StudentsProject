import Personage from './personage.js';
import Soldier from './soldier.js';
import Thief from './thief.js';
import Magician from './magician.js';
import EnumPersonage from '../enums/enumPersonage.js';

class Creator {
  static createObject(someProperty: string): Personage {
      if (someProperty === EnumPersonage.MAGICIAN) {
          return new Magician();
      } else if (someProperty === EnumPersonage.THIEF) {
          return new Thief();
      } else {
          return new Soldier();
      }
  }
}

export default Creator;
