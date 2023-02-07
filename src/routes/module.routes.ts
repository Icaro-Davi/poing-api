import { Router } from 'express';

import welcomeMemberModuleRouter from './modules/welcomeMember';
import memberLeaveModuleRouter from './modules/memberLeave';
import roleByInteraction from './modules/roleByInteraction';

const router = Router();

router.use(welcomeMemberModuleRouter);
router.use(memberLeaveModuleRouter);
router.use(roleByInteraction);

export default router;