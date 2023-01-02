import GuildRepository from "../../guild/GuildRepository.mongo";
import WelcomeMemberModuleSchema from './WelcomeModule.schema';

import type { IWelcomeMemberModuleSettings } from './WelcomeModule.schema';
import type { Types } from "mongoose";

class WelcomeModuleRepository {
    static async create(guildId: string, settings: IWelcomeMemberModuleSettings) {
        const session = await WelcomeMemberModuleSchema.startSession();
        session.startTransaction();
        try {
            const welcomeMemberSettings = new WelcomeMemberModuleSchema(settings, { session });
            await welcomeMemberSettings.save({ session });
            await GuildRepository.saveNewModule(guildId, 'welcomeMember', { isActive: true, settings: welcomeMemberSettings }, { session });
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    static async findById(welcomeModuleId: Types.ObjectId) {
        try {
            const welcomeMemberSettings = (await WelcomeMemberModuleSchema.findById(welcomeModuleId))?.toJSON();
            return welcomeMemberSettings;
        } catch (error) {
            throw error;
        }
    }

    static async update(welcomeMemberModuleId: Types.ObjectId, welcomeMemberModule: IWelcomeMemberModuleSettings) {
        try {
            const welcomeMemberSettings = (await WelcomeMemberModuleSchema.findByIdAndUpdate(welcomeMemberModuleId, welcomeMemberModule))?.toJSON();
            return welcomeMemberSettings;
        } catch (error) {
            throw error;
        }
    }

    static async updateActivity(guildId: string, isActive: boolean) {
        try {
            await GuildRepository.updateModuleActivity(guildId, 'welcomeMember', isActive);
        } catch (error) {
            throw error;
        }
    }
}

export default WelcomeModuleRepository;