import { DiscordPermissions, DiscordPermissionsTypes } from "./permissions";
import hasPermissions from "./hasPermissions";
import extractPermissions from "./extractPermissions";

export {
    DiscordPermissionsTypes
}

const DiscordUtils = {
    hasPermissions,
    extractPermissions,
    permissions: DiscordPermissions
}

export default DiscordUtils;