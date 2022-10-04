import GuildSchema from './Guild.schema';

import type { Modify } from '../../../util/util.types';
import type { IBotRolesSchema, IBotSchema } from '../bot/Bot.schema';
import type { IGuildSchema } from './Guild.schema';
import type { ClientSession, FilterQuery } from 'mongoose';

type SelectGuildValues = Partial<{
    _id: 0 | 1,
    bot: Omit<Partial<Modify<IBotSchema, 0 | 1>>, 'roles'> & { roles?: Partial<Modify<IBotRolesSchema, 0 | 1>> }
}>;

type GuildOptionalValues = Partial<Omit<IGuildSchema, 'bot'>> & { bot?: Partial<IBotSchema> };

class GuildRepository {

    static async create(guild: IGuildSchema) {
        try {
            return await GuildSchema.create(guild) as IGuildSchema;
        } catch (error) {
            throw error;
        }
    }

    static async findById(guildId: string) {
        try {
            return await GuildSchema.findById(guildId).lean();
        } catch (error) {
            throw error;
        }
    }

    static async update(guildId: string, guildChanges: GuildOptionalValues, options?: { session?: ClientSession }) {
        try {
            await GuildSchema.findByIdAndUpdate(guildId, { $set: guildChanges }, { session: options?.session });
        } catch (error) {
            throw error;
        }
    }

    static async findByIdAndOmitValues(guildId: string, select: SelectGuildValues) {
        try {
            return (await GuildSchema.findById(guildId).select(select))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async delete(guildId: string, session?: ClientSession) {
        try {
            await GuildSchema.findByIdAndDelete(guildId, session ? { session } : {});
        } catch (error) {
            throw error;
        }
    }

    static async find(filterQuery: FilterQuery<IGuildSchema>) {
        try {
            return (await GuildSchema.findOne(filterQuery))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async getWelcomeModuleSettings(guildId: string, options?: { populate?: boolean }) {
        try {
            return (
                await GuildSchema
                    .findById(guildId)
                    .populate(options?.populate ? "modules.welcomeMember.settings" : '')
                    .select({ modules: 1, _id: 0 })
            )?.toJSON().modules?.welcomeMember;
        } catch (error) {
            throw error;
        }
    }
}

export default GuildRepository;