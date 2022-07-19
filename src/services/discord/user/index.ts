import { DiscordRequestor } from "..";
import { UserGuildsType } from "./types";

class UserService {
    static basePath = '/users';

    static async getGuilds(userAuthToken: string) {
        return DiscordRequestor.get<UserGuildsType[]>(`${this.basePath}/@me/guilds`, { userAuthToken });
    }

}

export default UserService;