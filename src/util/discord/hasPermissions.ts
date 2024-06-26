import { DiscordPermissionsTypes } from "./permissions";
import extractPermissions from "./extractPermissions";

type FuncOptionsType = {
    atLeastOne: boolean;
}

function hasPermissions(permission: number | DiscordPermissionsTypes[], permissionsTypes: DiscordPermissionsTypes[] | DiscordPermissionsTypes, options?: FuncOptionsType): boolean {
    const allowedPermissions = Array.isArray(permission) ? permission : extractPermissions(permission);
    if (Array.isArray(permissionsTypes)) {
        const ArrayFunc = (_permission: DiscordPermissionsTypes) => !!allowedPermissions.find(allowedPermission => allowedPermission === _permission);
        return (options?.atLeastOne ? permissionsTypes.some(ArrayFunc) : permissionsTypes.every(ArrayFunc));
    } else {
        return !!allowedPermissions.some(allowedPermissions => allowedPermissions === permissionsTypes);
    }
}

export default hasPermissions;