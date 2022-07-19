import { Router } from "express";
import * as UserController from '../controller/user';
import auth from "../middleware/authenticate.middleware";
import useErrorHandler from "../util/error/hofError";

const router = Router();

router.use(auth.middleware);
router.get('/guilds', useErrorHandler(UserController.guilds));
router.get('/mutual_guilds', useErrorHandler(UserController.mutualGuilds));

export default router;