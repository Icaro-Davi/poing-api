import mongoose, { Types } from 'mongoose';
import App from '../../../configs';
import BotSchema from '../bot/Bot.schema';

import type { IBotSchema } from '../bot/Bot.schema';
import type { IWelcomeMemberModuleSettings } from '../modules/memberWelcomeModule/WelcomeModule.schema';
import { IMemberLeaveModule } from '../modules/memberLeaveModule/MemberLeaveModule.schema';

type ModuleType<S> = {
    isActive?: boolean;
    settings?: S | Types.ObjectId;
}

export interface IGuildSchema {
    _id: string;
    bot: IBotSchema;
    modules?: {
        welcomeMember?: ModuleType<IWelcomeMemberModuleSettings>;
        memberLeave?: ModuleType<IMemberLeaveModule>;
    }
}

const GuildSchema = new mongoose.Schema<IGuildSchema>({
    _id: {
        type: String,
        required: true,
    },
    bot: BotSchema,
    modules: {
        welcomeMember: {
            isActive: {
                type: Boolean,
                default: false,
                required: true
            },
            settings: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'WelcomeMemberModuleSettings'
            }
        },
        memberLeave: {
            isActive: {
                type: Boolean,
                default: false,
                required: true
            },
            settings: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MemberLeaveModule'
            }
        }
    }
}, { timestamps: true });

export default App.db.getConnection('poing').model<IGuildSchema>('Guild', GuildSchema);