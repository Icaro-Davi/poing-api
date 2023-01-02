import { IWelcomeMemberModuleSettings } from "../../domain/db_poing/modules/memberWelcomeModule/WelcomeModule.schema";

export type WelcomeMemberSettingsTestType = IWelcomeMemberModuleSettings & { botSettings: { messageColor: string } };