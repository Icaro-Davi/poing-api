import GuildRepository from "../../guild/GuildRepository.mongo";
import MemberLeaveRepository from "./MemberLeaveModuleRepository";
import MemberLeaveModuleSchema, { IMemberLeaveModule } from "./MemberLeaveModule.schema";

import type { Types } from "mongoose";

class MemberLeaveModuleRepository {

    static async create(guildId: string, settings: IMemberLeaveModule) {
        const session = await MemberLeaveModuleSchema.startSession();
        session.startTransaction();
        try {
            const memberLeaveSettings = new MemberLeaveModuleSchema(settings, { session });
            await memberLeaveSettings.save({ session });
            await GuildRepository.saveNewModule(guildId, 'memberLeave', { isActive: true, settings: memberLeaveSettings }, { session });
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    static async updateActivity(guildId: string, isActive: boolean) {
        try {
            await GuildRepository.updateModuleActivity(guildId, 'memberLeave', isActive);
        } catch (error) {
            throw error;
        }
    }

    static async update(memberLeaveId: Types.ObjectId, memberLeaveSettings: IMemberLeaveModule) {
        try {
            const settings = (await MemberLeaveRepository.findByIdAndUpdate(memberLeaveId, memberLeaveSettings))?.toJSON();
            return settings as IMemberLeaveModule;
        } catch (error) {
            throw error;
        }
    }

    static async findById(memberLeaveModuleId: string) {
        try {
            return (await MemberLeaveRepository.findById(memberLeaveModuleId))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

}

export default MemberLeaveModuleRepository;