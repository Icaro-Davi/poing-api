class DiscordChannelUtils {
    static ComponentsTypes = ['ACTION_ROW', 'BUTTON', 'STRING_SELECT', 'TEXT_INPUT', 'USER_SELECT', 'ROLE_SELECT', 'MENTIONABLE_SELECT', 'CHANNEL_SELECT'];
    static translateTypesToCode(channelType: string): number | undefined {
        const channelTypes = {
            [this.ComponentsTypes[0]]: 1,
            [this.ComponentsTypes[1]]: 2,
            [this.ComponentsTypes[2]]: 3,
            [this.ComponentsTypes[3]]: 4,
            [this.ComponentsTypes[4]]: 5,
            [this.ComponentsTypes[5]]: 6,
            [this.ComponentsTypes[6]]: 7,
            [this.ComponentsTypes[7]]: 8
        }
        return channelTypes?.[channelType as keyof typeof channelTypes];
    }
}

export default DiscordChannelUtils;