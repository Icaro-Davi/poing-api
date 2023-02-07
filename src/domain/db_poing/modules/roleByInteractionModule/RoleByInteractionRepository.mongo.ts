import GuildRepository from "../../guild/GuildRepository.mongo";

class RoleByInteractionRepository {
    static async updateActivity(guildId: string, active: boolean) {
        try {
            await GuildRepository.updateModuleActivity(guildId, 'roleByInteraction', active);
        } catch (error) {
            throw error;
        }
    }
}

export default RoleByInteractionRepository;