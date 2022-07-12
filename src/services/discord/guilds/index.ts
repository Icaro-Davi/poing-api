import { DiscordRequestor } from '..';
import configs from '../../../configs';
import { BotGuildType } from './types';

class GuildService {
    static async getBotGuilds() {
        return DiscordRequestor.get<BotGuildType[]>(`/users/@me/guilds`, {
            headers: {
                Authorization: `Bot ${configs.env.discord.BOT_TOKEN}`
            }
        });
    }
}

export default GuildService;