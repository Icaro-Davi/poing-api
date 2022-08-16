import { ClientSession } from 'mongoose';
import { Modify } from '../../../util/util.types';
import { IBotRolesSchema, IBotSchema } from '../bot/Bot.schema';
import Guild, { IGuildSchema } from './Guild.schema';

type SelectGuildValues = Partial<{
    _id: 0 | 1,
    bot: Omit<Partial<Modify<IBotSchema, 0 | 1>>, 'roles'> & { roles?: Partial<Modify<IBotRolesSchema, 0 | 1>> }
}>;

type GuildOptionalValues = Partial<Omit<IGuildSchema, 'bot'>> & { bot?: Partial<IBotSchema> };

class GuildRepository {

    static async create(guild: IGuildSchema) {
        try {
            return await Guild.create(guild) as IGuildSchema;
        } catch (error) {
            throw error;
        }
    }

    static async findById(guildId: string) {
        try {
            return await Guild.findById(guildId).lean();
        } catch (error) {
            throw error;
        }
    }

    static async update(guildId: string, { bot }: GuildOptionalValues) {
        try {

            await Guild.findByIdAndUpdate(guildId, { $set: { bot } });
        } catch (error) {
            throw error;
        }
    }

    static async findByIdAndOmitValues(guildId: string, select: SelectGuildValues) {
        try {
            return (await Guild.findById(guildId).select(select))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async delete(guildId: string, session?: ClientSession) {
        try {
            await Guild.findByIdAndDelete(guildId, session ? { session } : {});
        } catch (error) {
            throw error;
        }
    }

}

export default GuildRepository;