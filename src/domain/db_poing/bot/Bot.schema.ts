import mongoose from "mongoose";

export interface IBotRolesSchema {
    muteId: string;
}

const RolesSchema = new mongoose.Schema<IBotRolesSchema>({
    muteId: String,
}, { _id: false });

export interface IChannelSchema {
    logsId: string;
}

const ChannelSchema = new mongoose.Schema<IChannelSchema>({
    logsId: String,
}, { _id: false });

export interface IBotSchema {
    prefix: string;
    messageEmbedHexColor: `#${string}`;
    locale: 'pt-BR' | 'en-US';
    roles?: IBotRolesSchema;
    channel?: IChannelSchema;
}

export const REGEX_BOT_PREFIX = new RegExp('^[!@#$%&*\-_=+.:?/]{1,5}$');

const BotSchema = new mongoose.Schema<IBotSchema>({
    prefix: {
        type: String,
        min: 1, max: 5,
        match: REGEX_BOT_PREFIX
    },
    locale: {
        type: String,
        enum: ['pt-BR', 'en-US'],
    },
    messageEmbedHexColor: {
        type: String,
    },
    roles: RolesSchema,
    channel: ChannelSchema
}, { _id: false });

export default BotSchema;