import { Router } from 'express';
import Auth from '../middleware/authenticate.middleware';
import useErrorHandler from '../util/error/hofError';
import * as validate from './schemas/module.routeSchema';
import * as ModuleController from '../controller/modules';

const router = Router();

router.use(Auth.middleware);
router.route('/welcome-member/:id')
    .get(
        validate.paramId,
        useErrorHandler(ModuleController.welcomeMember.getByGuildId)
    )
    .post(
        validate.paramId,
        validate.modules.welcomeMember.bodySettings,
        useErrorHandler(ModuleController.welcomeMember.create)
    )
    .put(
        validate.paramId,
        validate.modules.welcomeMember.bodySettings,
        useErrorHandler(ModuleController.welcomeMember.update)
    );

export default router;