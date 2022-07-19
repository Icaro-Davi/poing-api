import { DiscordPermissionsTypes } from "./permissions";
import extractPermissions from "./extractPermissions";

type FuncOptionsType = {
    atLeastOne: boolean;
}

function hasPermissions(permission: number, permissionsTypes: DiscordPermissionsTypes[] | DiscordPermissionsTypes, options?: FuncOptionsType): boolean {
    const allowedPermissions = extractPermissions(permission);
    if (Array.isArray(permissionsTypes)) {
        return (options?.atLeastOne ? permissionsTypes.some : permissionsTypes.every)(_permission => !!allowedPermissions.find(allowedPermission => allowedPermission === _permission));
    } else {
        return !!allowedPermissions.some(allowedPermissions => allowedPermissions === permissionsTypes);
    }
}

export default hasPermissions;