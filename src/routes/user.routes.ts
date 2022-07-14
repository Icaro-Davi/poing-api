import { Router } from "express";
import * as UserController from '../controller/user';
import auth from "../middleware/authenticate.middleware";

const router = Router();

router.use(auth.middleware);
router.get('/guilds', UserController.guilds);

export default router;