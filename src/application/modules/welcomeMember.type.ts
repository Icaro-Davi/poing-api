import { IWelcomeMemberModuleSettings } from "../../domain/db_poing/modules/welcomeModule/WelcomeModule.schema";

export type WelcomeMemberSettingsTestType = IWelcomeMemberModuleSettings & { botSettings: { messageColor: string } };