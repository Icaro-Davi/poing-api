import { DiscordPermissionsTypes } from "../../../util/discord";

export type UserGuildsType = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string | DiscordPermissionsTypes[];
    features: string[];
    hasBot?: boolean;
}