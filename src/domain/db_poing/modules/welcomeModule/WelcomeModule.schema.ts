import mongoose, { Types } from "mongoose";
import App from '../../../../configs';

export interface IWelcomeMemberModuleSettings {
    _id: Types.ObjectId;
    isMessageText: boolean;
    channelId?: string;
    messageText?: string;
    messageEmbed?: {
        description: string;
        title?: string;
        author?: {
            name?: string;
            picture?: string;
        };
        fields?: { name: string; value: string; inline?: boolean }[];
        footer?: string;
        thumbnail?: string;
    }
}

const WelcomeMemberModuleSettingsSchema = new mongoose.Schema<IWelcomeMemberModuleSettings>({
    isMessageText: {
        type: Boolean,
        required: true,
        default: true
    },
    channelId: {
        type: String,
        match: /^\d$/g,
        max: 50
    },
    messageText: {
        type: String,
        maxLength: 500
    },
    messageEmbed: {
        title: {
            type: String,
            maxLength: 100,
        },
        description: {
            type: String,
            maxLength: 500
        },
        author: {
            name: {
                type: String,
                maxLength: 50
            },
            picture: {
                type: String,
                maxLength: 50
            }
        },
        fields: [{
            name: {
                type: String,
                maxLength: 50
            },
            value: {
                type: String,
                maxLength: 50
            },
            inline: Boolean
        }],
        footer: {
            type: String,
            maxLength: 50
        },
        thumbnail: {
            type: String,
            maxLength: 50
        }
    }
});

export default App.db.getConnection('poing').model<IWelcomeMemberModuleSettings>('WelcomeMemberModuleSettings', WelcomeMemberModuleSettingsSchema);