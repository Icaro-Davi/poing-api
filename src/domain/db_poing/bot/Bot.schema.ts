import mongoose from "mongoose";

export interface IBotRolesSchema {
    muteId: string;
}

const RolesSchema = new mongoose.Schema<IBotRolesSchema>({
    muteId: String,
}, { _id: false });

export interface IBotSchema {
    prefix: string;
    messageEmbedHexColor: `#${string}`;
    locale: 'pt-BR' | 'en-US';
    roles?: IBotRolesSchema;
}

const BotSchema = new mongoose.Schema<IBotSchema>({
    prefix: {
        type: String,
        min: 1, max: 5
    },
    locale: {
        type: String,
        enum: ['pt-BR', 'en-US'],
    },
    messageEmbedHexColor: {
        type: String,
    },
    roles: RolesSchema
}, { _id: false });

export default BotSchema;