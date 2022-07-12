import { Router } from 'express';
import * as Controller from '../controller/guilds';
import Auth from '../middleware/authenticate.middleware';

const router = Router();

router.get('/', Auth.middleware, Controller.getGuilds);

export default router;