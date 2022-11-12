import { Router } from 'express';

import Auth from '../middleware/authenticate.middleware';
import * as GuildController from '../controller/guild';
import * as schema from './schemas/guild.routerSchema';
import useErrorHandler from '../util/error/hofError';
import VerifyUserCanModifyGuildMiddleware from '../middleware/verifyUserCanModifyGuild.middleware';

const router = Router();

router.use(Auth.middleware);
router.get('/', useErrorHandler(GuildController.getGuilds));
router.get('/:id',
    schema.getGuildById,
    VerifyUserCanModifyGuildMiddleware.middleware,
    useErrorHandler(GuildController.getGuildById)
);

router.get('/:id/channels',
    schema.getGuildById,
    VerifyUserCanModifyGuildMiddleware.middleware,
    useErrorHandler(GuildController.getChannels)
);

export default router;