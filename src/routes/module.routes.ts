import { Router } from 'express';

import welcomeMemberModuleRouter from './modules/welcomeMember';
import memberLeaveModuleRouter from './modules/memberLeave';

const router = Router();

router.use(welcomeMemberModuleRouter);
router.use(memberLeaveModuleRouter);

export default router;