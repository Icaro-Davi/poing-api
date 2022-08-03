import { Router } from 'express';
import * as BotController from '../controller/bot';
import Auth from '../middleware/authenticate.middleware';
import useErrorHandler from '../util/error/hofError';
import * as validate from './schemas/bot.routerSchema';

const router = Router();

router.use(Auth.middleware);
router.get('/guild/:id', validate.getGuildById, useErrorHandler(BotController.getGuild));

export default router;