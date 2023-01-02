import { Router } from 'express';
import Auth from '../../middleware/authenticate.middleware';
import useErrorHandler from '../../util/error/hofError';
import * as validate from '../schemas/modules';
import * as ModuleController from '../../controller/modules';
import VerifyUserCanModifyGuildMiddleware from '../../middleware/verifyUserCanModifyGuild.middleware';
import verifyUserCanModifyGuildMiddleware from '../../middleware/verifyUserCanModifyGuild.middleware';

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
        validate.welcomeMember.settingsValidator,
        useErrorHandler(ModuleController.welcomeMember.create)
    )
    .put(
        validate.paramId,
        validate.welcomeMember.settingsValidator,
        VerifyUserCanModifyGuildMiddleware.middleware,
        useErrorHandler(ModuleController.welcomeMember.update)
    )
    .patch(
        validate.moduleActivity,
        VerifyUserCanModifyGuildMiddleware.middleware,
        useErrorHandler(ModuleController.welcomeMember.updateActivity)
    );

router.post('/welcome-member/:id/test-message',
    validate.paramId,
    validate.welcomeMember.settingsTestValidator,
    verifyUserCanModifyGuildMiddleware.middleware,
    useErrorHandler(ModuleController.welcomeMember.testWelcomeMemberMessage)
);

export default router;