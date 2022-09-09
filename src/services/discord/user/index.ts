import { DiscordRequestor } from "..";
import { DiscordUser, UserGuildsType } from "./types";

class UserService {
    static basePath = '/users';

    static async getGuilds(userAuthToken: string) {
        return DiscordRequestor.get<UserGuildsType[]>(`${this.basePath}/@me/guilds`, { userAuthToken });
    }

    static async getMe(userAuthToken: string){
        return DiscordRequestor.get<DiscordUser>(`${this.basePath}/@me`, { userAuthToken });
    }

}

export default UserService;