import mongoose from 'mongoose';
import { IWelcomeMemberModuleSettings, WelcomeMemberModule } from '../memberWelcomeModule/WelcomeModule.schema';
import App from '../../../../configs'

export interface IMemberLeaveModule extends IWelcomeMemberModuleSettings {}

const MemberLeaveModuleSchema = new mongoose.Schema<IMemberLeaveModule>(WelcomeMemberModule as mongoose.SchemaDefinition<IMemberLeaveModule>);

export default App.db.getConnection('poing').model<IMemberLeaveModule>('MemberLeaveModule', MemberLeaveModuleSchema);