import { DiscordRequestor } from '..';
import { BotGuildType } from './types';

class BotService {
    static async getGuilds() {
        return DiscordRequestor.get<BotGuildType[]>(`/users/@me/guilds`, { isBot: true });
    }
}

export default BotService;