import { Router } from 'express';

import * as validate from '../schemas/modules';
import * as ModuleController from '../../controller/modules';

import Auth from '../../middleware/authenticate.middleware';
import VerifyUserCanModifyGuild from '../../middleware/verifyUserCanModifyGuild.middleware';
import useErrorHandler from '../../util/error/hofError';

const router = Router();

router.use(Auth.middleware);
router.route('/member-leave/:id')
    .get(
        validate.paramId,
        VerifyUserCanModifyGuild.middleware,
        useErrorHandler(ModuleController.memberLeave.getByGuildId)
    )
    .post(
        validate.paramId,
        validate.memberLeave.settingsValidator,
        VerifyUserCanModifyGuild.middleware,
        useErrorHandler(ModuleController.memberLeave.create)
    )
    .put(
        validate.paramId,
        validate.memberLeave.settingsValidator,
        VerifyUserCanModifyGuild.middleware,
        useErrorHandler(ModuleController.memberLeave.update)
    )
    .patch(
        validate.moduleActivity,
        VerifyUserCanModifyGuild.middleware,
        useErrorHandler(ModuleController.memberLeave.updateActivity)
    )

router.post('/member-leave/:id/test-message',
    validate.paramId,
    validate.memberLeave.settingsTestValidator,
    VerifyUserCanModifyGuild.middleware,
    useErrorHandler(ModuleController.memberLeave.testMessage)
);

export default router;