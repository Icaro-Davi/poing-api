import mongoose from "mongoose";
import configs from "../../../../configs";

export interface IScheduleUnmute {
    guildId: string;
    memberId: string;
    timeout: Date;
}

const ScheduleUnmute = new mongoose.Schema<IScheduleUnmute>({
    guildId: {
        type: String,
        required: true,
        ref: 'Guild'
    },
    memberId: {
        type: String,
        required: true,
    },
    timeout: {
        type: Date,
        required: true,
    }
});

export default configs.db.getConnection('poing').model<IScheduleUnmute>('ScheduleUnmute', ScheduleUnmute);