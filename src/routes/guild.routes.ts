import { Router } from 'express';

import Auth from '../middleware/authenticate.middleware';
import * as GuildController from '../controller/guild';
import * as schema from './schemas/guild.routerSchema';
import useErrorHandler from '../util/error/hofError';

const router = Router();

router.use(Auth.middleware);
router.get('/:id', schema.getGuildById, useErrorHandler(GuildController.getGuildById));

export default router;