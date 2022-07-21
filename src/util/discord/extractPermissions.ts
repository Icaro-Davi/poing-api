import { DiscordPermissions, DiscordPermissionsTypes } from "./permissions";

function extractPermissions(permission: number): DiscordPermissionsTypes[] {
    const permissions: DiscordPermissionsTypes[] = [];
    Object.entries(DiscordPermissions).forEach(_permission => {
        const [key, value] = _permission;
        if ((permission & value) == value) permissions.push(key as DiscordPermissionsTypes);
    });
    return permissions;
}

export default extractPermissions;