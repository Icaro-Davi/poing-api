import { IMemberLeaveModule } from "../../domain/db_poing/modules/memberLeaveModule/MemberLeaveModule.schema";

export type MemberLeaveTestMessageType = IMemberLeaveModule & { botSettings: { messageColor: string } };