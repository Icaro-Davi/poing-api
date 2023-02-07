import { Router } from 'express';
import Auth from '../../middleware/authenticate.middleware';
import verifyUserCanModifyGuild from '../../middleware/verifyUserCanModifyGuild.middleware';
import verifyAllowedGuildChannel from '../../middleware/verifyAllowedGuildChannel.middleware';
import * as Controller from '../../controller/modules/roleByInteraction';
import * as validate from '../schemas/modules';
import useErrorHandler from '../../util/error/hofError';

const router = Router();

router.use(Auth.middleware);
router.route('/role-by-interaction/:id')
    .post(
        validate.paramId,
        validate.RoleByInteraction.settingsValidator,
        verifyUserCanModifyGuild.middleware,
        // channel.type 0 is a GUILD_TEXT type
        verifyAllowedGuildChannel.middleware((req) => req.body.channelId, { validateCallback: channel => channel.type === 0 }),
        useErrorHandler(Controller.createRoleByInteraction)
    )
    .patch(
        validate.moduleActivity,
        verifyUserCanModifyGuild.middleware,
        useErrorHandler(Controller.updateActivity)
    )

export default router;