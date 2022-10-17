import { Router } from 'express';
import Auth from '../middleware/authenticate.middleware';
import useErrorHandler from '../util/error/hofError';
import * as validate from './schemas/module.routeSchema';
import * as ModuleController from '../controller/modules';
import VerifyUserCanModifyGuildMiddleware from '../middleware/verifyUserCanModifyGuild.middleware';

const router = Router();

router.use(Auth.middleware);
router.route('/welcome-member/:id')
    .get(
        validate.paramId,
        VerifyUserCanModifyGuildMiddleware.middleware,
        useErrorHandler(ModuleController.welcomeMember.getByGuildId)
    )
    .post(
        validate.paramId,
        VerifyUserCanModifyGuildMiddleware.middleware,
        validate.modules.welcomeMember.bodySettings,
        useErrorHandler(ModuleController.welcomeMember.create)
    )
    .put(
        validate.paramId,
        VerifyUserCanModifyGuildMiddleware.middleware,
        validate.modules.welcomeMember.bodySettings,
        useErrorHandler(ModuleController.welcomeMember.update)
    )
    .patch(
        validate.moduleActivity,
        VerifyUserCanModifyGuildMiddleware.middleware,
        useErrorHandler(ModuleController.welcomeMember.updateActivity)
    );

export default router;