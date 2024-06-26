import { DiscordPermissionsTypes } from "../../../util/discord";
import { GuildEmoji, GuildRole } from "../bot/types";

export type UserGuildsType = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    roles: GuildRole[];
    emojis: GuildEmoji[];
    permissions: string | DiscordPermissionsTypes[];
    features: string[];
    hasBot?: boolean;
}

export type DiscordUser = {
    accent_color: null;
    avatar: string;
    avatar_decoration: null;
    banner: null;
    banner_color: null;
    discriminator: string;
    email: string;
    flags: number;
    id: string;
    locale: string;
    mfa_enabled: boolean;
    public_flags: number;
    username: string;
    verified: boolean;
}
