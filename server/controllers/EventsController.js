import ApiError from '../error/ApiError.js';
import EventsService from '../services/EventsService.js';
import eventsValidations from '../validations/eventsValidations.js';
import enumEvents from '../enums/enumEvents.js';

const actionsWS = async (req, res, next) => {
  try {
    const typeEvent = String(req.body.type).trim().toUpperCase();

    const { error } =
      typeEvent === enumEvents.ATTACK
        ? eventsValidations.attackValidation(req.body)
        : typeEvent === enumEvents.MESSAGE
        ? eventsValidations.messageValidation(req.body)
        : eventsValidations.restoreValidation(req.body);
    if (error) {
      next(ApiError.badRequest(error.message || error));
      return;
    }

    let status = '';
    switch (typeEvent) {
      case enumEvents.ATTACK:
        new EventsService().attack(req.body.userId);
        status = 'the attack was successfully executed';
        break;

      case enumEvents.MESSAGE:
        new EventsService().message(req.body.message);
        status = 'the message was sent successfully';
        break;

      case enumEvents.RESTORE:
        new EventsService().restore();
        status = 'the restore was successfully executed';
        break;

      default:
        break;
    }

    const response = {
      status: status,
    };

    res.json(response);

    res.json([]);
  } catch (err) {
    next(ApiError.notImplemented(err.message || err));
  }
};

export default {
  actionsWS,
};
