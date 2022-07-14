import { Router } from 'express';
import passport from 'passport';
import * as AuthController from '../controller/auth';
import auth from '../middleware/authenticate.middleware';

const router = Router();

router.get('/discord', passport.authenticate('discord'), AuthController.discord);
router.get('/discord/redirect', passport.authenticate('discord'), AuthController.discordRedirect);

router.use(auth.middleware);
router.get('/status', AuthController.status);

export default router;