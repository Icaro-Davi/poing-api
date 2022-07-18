import { Router } from 'express';
import * as BotController from '../controller/bot';
import Auth from '../middleware/authenticate.middleware';
import useErrorHandler from '../util/error/hofError';

const router = Router();

router.use(Auth.middleware);
router.get('/guilds', useErrorHandler(BotController.getGuilds));

export default router;