import mongoose from 'mongoose';
import configs from '../../../configs';
import BotSchema, { IBotSchema } from '../bot/Bot.schema';

export interface IGuildSchema {
    _id: string;
    bot: IBotSchema;
}

const GuildSchema = new mongoose.Schema<IGuildSchema>({
    _id: {
        type: String,
        required: true,
    },
    bot: BotSchema,
}, { timestamps: true });

export default configs.db.getConnection('poing').model<IGuildSchema>('Guild', GuildSchema);