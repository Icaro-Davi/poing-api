import BotService from "../services/discord/bot";

class BotApplication {

    static async getGuilds() {
        try {
            const { data } = await BotService.getGuilds();
            return data;
        } catch (error) {
            console.error('[APPLICATION] Error on find bot guilds.');
            console.error(error);
        }
    }

}

export default BotApplication;