import { Router } from 'express';
import passport from 'passport';
import * as AuthController from '../controller/auth';
import auth from '../middleware/authenticate.middleware';
import useErrorHandler from '../util/error/hofError';

const router = Router();

router.get('/discord', passport.authenticate('discord'), useErrorHandler(AuthController.discord));
router.get('/discord/redirect', passport.authenticate('discord'), useErrorHandler(AuthController.discordRedirect));

router.use(auth.middleware);
router.get('/status', useErrorHandler(AuthController.status));

export default router;