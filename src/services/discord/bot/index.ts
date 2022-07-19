import { DiscordRequestor } from '..';
import { BotDetailedGuildType, BotGuildType } from './types';

class BotService {
    static async getGuilds() {
        return DiscordRequestor.get<BotGuildType[]>(`/users/@me/guilds`, { isBot: true });
    }

    static async getGuild(guildId: string) {
        return DiscordRequestor.get<BotDetailedGuildType>(`/guilds/${guildId}`, { isBot: true })
    }
}

export default BotService;