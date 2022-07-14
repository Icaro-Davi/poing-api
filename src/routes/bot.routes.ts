import { Router } from 'express';
import * as BotController from '../controller/bot';
import Auth from '../middleware/authenticate.middleware';

const router = Router();

router.use(Auth.middleware);
router.get('/guilds', BotController.getGuilds);

export default router;