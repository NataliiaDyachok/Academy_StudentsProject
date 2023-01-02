import Creator from '../personages/creator';
import Personage from '../personages/personage';
import EnumPersonage from '../personages/enums';

class ClassService {  
    
    createPersonageSoldier(): Personage {
        return Creator.createObject(EnumPersonage.SOLDIER);
    }
    createPersonageThief(): Personage {
        return Creator.createObject(EnumPersonage.THIEF);
    }
    createPersonageMagician(): Personage {
        return Creator.createObject(EnumPersonage.MAGICIAN);
    }
}

// const PERSONAGE_SOLDIER = new Facade().createPersonageSoldier();
// console.log(PERSONAGE_SOLDIER.name);
// const PERSONAGE_THIEF = new Facade().createPersonageThief();
// console.log(PERSONAGE_THIEF.name);

module.exports = ClassService;