export type BotGuildType = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export type BotDetailedGuildType = {
    id: string;
    name: string;
    icon: string;
    description?: any;
    splash?: any;
    discovery_splash?: any;
    features: any[];
    emojis: any[];
    stickers: any[];
    banner?: any;
    owner_id: string;
    application_id?: any;
    region: string;
    afk_channel_id?: any;
    afk_timeout: number;
    system_channel_id: string;
    widget_enabled: boolean;
    widget_channel_id?: any;
    verification_level: number;
    roles: {
        id: string;
        name: string;
        permissions: string;
        position: number;
        color: number;
        hoist: boolean;
        managed: boolean;
        mentionable: boolean;
        icon?: any;
        unicode_emoji?: any;
        flags: number;
        tags: { bot_id: string; };
    }[];
    default_message_notifications: number;
    mfa_level: number;
    explicit_content_filter: number;
    max_presences?: any;
    max_members: number;
    max_stage_video_channel_users: number;
    max_video_channel_users: number;
    vanity_url_code?: any;
    premium_tier: number;
    premium_subscription_count: number;
    system_channel_flags: number;
    preferred_locale: string;
    rules_channel_id?: any;
    public_updates_channel_id?: any;
    hub_type?: any;
    premium_progress_bar_enabled: boolean;
    nsfw: boolean;
    nsfw_level: number;
}