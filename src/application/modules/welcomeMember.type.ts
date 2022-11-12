import { IWelcomeMemberModuleSettings, MessageEmbedType } from "../../domain/db_poing/modules/welcomeModule/WelcomeModule.schema";

export type WelcomeMemberSettingsTestType = Omit<IWelcomeMemberModuleSettings, 'messageEmbed'> & { messageEmbed: MessageEmbedType & { color: string; } };