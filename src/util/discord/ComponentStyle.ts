class DiscordComponentStyleUtil {
    static ComponentStyleTypes = ['PRIMARY', 'SECONDARY', 'SUCCESS', 'DANGER', 'LINK'];
    static translateStyleTypeToCode(type: string): number | undefined {
        const styleTypes = {
            [this.ComponentStyleTypes[0]]: 1,
            [this.ComponentStyleTypes[1]]: 2,
            [this.ComponentStyleTypes[2]]: 3,
            [this.ComponentStyleTypes[3]]: 4,
            [this.ComponentStyleTypes[4]]: 5,
        }
        return styleTypes?.[type as keyof typeof styleTypes];
    }
}

export default DiscordComponentStyleUtil;