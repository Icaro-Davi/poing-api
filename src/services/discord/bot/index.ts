import { DiscordRequestor } from '..';
import { BotChannel, BotDetailedGuildType, BotGuildType, DiscordMessageType } from './types';

class BotService {
    static async getGuilds() {
        return DiscordRequestor.get<BotGuildType[]>(`/users/@me/guilds`, { isBot: true });
    }

    static async getGuild(guildId: string) {
        return DiscordRequestor.get<BotDetailedGuildType>(`/guilds/${guildId}`, { isBot: true })
    }

    static async getChannels(guildId: string) {
        try {
            return DiscordRequestor.get<BotChannel[]>(`/guilds/${guildId}/channels`, { isBot: true });
        } catch (error) {
            throw error;
        }
    }

    static async sendChannelMessage(channelId: string, message: DiscordMessageType) {
        try {
            await DiscordRequestor.post(`/channels/${channelId}/messages`, message, { isBot: true });
        } catch (error) {
            throw error;
        }
    }
}

export default BotService;