import { DiscordRequestor } from "..";

class UserService {
    static basePath = '/users';

    static async getGuilds(userAuthToken: string) {
        return DiscordRequestor.get(`${this.basePath}/@me/guilds`, { userAuthToken });
    }

}

export default UserService;