import { Router } from 'express';
import * as BotController from '../controller/bot';
import Auth from '../middleware/authenticate.middleware';
import useErrorHandler from '../util/error/hofError';
import * as validate from './schemas/bot.routerSchema';

const router = Router();

router.use(Auth.middleware);
router.route('/guild/:id')
    .get(
        validate.paramGuildById,
        useErrorHandler(BotController.getGuildSettings)
    )
    .post(
        validate.paramGuildById,
        validate.bodyGuildSettings,
        useErrorHandler(BotController.updateGuildSettings)
    );

export default router;