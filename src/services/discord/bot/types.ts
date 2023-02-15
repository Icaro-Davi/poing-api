import type { DiscordUser } from '../user/types';

export type BotGuildType = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export type GuildRole = {
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
};

export type GuildEmoji = {
    id: string;
    name: string;
    roles: GuildRole[];
    user?: DiscordUser;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}

export type BotDetailedGuildType = {
    id: string;
    name: string;
    icon: string;
    description?: any;
    splash?: any;
    discovery_splash?: any;
    features: any[];
    emojis: GuildEmoji[];
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
    roles: GuildRole[];
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


type ForumTag = {
    id: string;
    name: string;
    moderated: boolean;
    emoji_id: string;
    emoji_name: string;
}

export type BotChannel = {
    id: string;
    type: number;
    guild_id?: string;
    position?: number;
    permission_overwrites?: any[];
    name?: string;
    topic?: string;
    nsfw?: string;
    last_message_id?: string;
    bitrate?: string;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: DiscordUser[];
    icon?: string;
    owner_id?: string;
    application_id?: string;
    parent_id?: string;
    last_pin_timestamp?: number;
    rtc_region?: string;
    video_quality_mode?: number;
    message_count?: number;
    member_count?: number;
    thread_metadata?: any[];
    member?: any[];
    default_auto_archive_duration?: number;
    permissions?: string;
    flags?: number;
    total_message_sent?: number;
    available_tags?: ForumTag[];
    applied_tags?: string[];
    default_reaction_emoji?: { emoji_id: string; emoji_name: string };
    default_thread_rate_limit_per_user?: number;
    default_sort_order?: number;
}

type Embed = {
    name: string;
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}


type APIPartialEmoji = {
    id: string | null;
    name: string | null;
    animated?: boolean;
}

/**
 * @property 1:ActionRow | 2:Button | 3:StringSelect | 4:TextInput | 5:UserSelect | 6:RoleSelect | 7:MentionableSelect | 8:ChannelSelect
 */
type ComponentType = 'ACTION_ROW' | 'BUTTON' | 'STRING_SELECT' | 'TEXT_INPUT' | 'USER_SELECT' | 'ROLE_SELECT' | 'MENTIONABLE_SELECT' | 'CHANNEL_SELECT';

export type ComponentButton = {
    style: string;
    type: 'BUTTON' | number;
    custom_id?: string;
    disabled?: boolean;
    emoji?: APIPartialEmoji;
    label?: string;
    url?: string;
}

export type MessageSelectOption = {
    default: boolean;
    label: string;
    value: string;
    description: string | null;
    emoji: APIPartialEmoji | null;
}

export type ComponentSelectMenu = {
    custom_id: string | null;
    disabled: boolean;
    max_values: number | null;
    min_values: number | null;
    options: MessageSelectOption[];
    placeholder: string | null;
    type: 'STRING_SELECT' | 'USER_SELECT' | number;
}

export type Components = ComponentButton | ComponentSelectMenu;

/**
 * @property components.style 1:Primary | 2:Secondary | 3:Success | 4:Danger | 5:Link
 */
export type DiscordMessageComponent<T = any> = {
    type: ComponentType | number;
    components?: (Components & T)[];
}

type DiscordEmbedMessageType = {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: number;
    color?: number;
    footer?: { text: string; icon_url?: string; proxy_icon_url?: string; };
    image?: Embed;
    thumbnail?: Omit<Embed, 'name'>;
    video?: Embed;
    provider?: { name?: string; url?: string; };
    author?: { name: string; url?: string; icon_url?: string; proxy_icon_url?: string; };
    fields?: { name: string; value: string; inline?: boolean; }[];
}

export type DiscordMessageType = {
    content?: string;
    nonce?: string | number;
    tts?: boolean;
    embeds?: DiscordEmbedMessageType[];
    allowed_mentions?: 'roles' | 'users' | 'everyone';
    message_reference?: {
        message_id?: string;
        channel_id?: string;
        guild_id?: string;
        fail_if_not_exists?: boolean;
    };
    components?: DiscordMessageComponent[];
    sticker_ids?: string[];
    'files[n]'?: BinaryData;
    payload_json?: string;
    attachments?: any[];
    flags?: number;
}