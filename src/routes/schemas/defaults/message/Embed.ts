import Joi from "joi";
import { MessageEmbedType } from "../../../../domain/db_poing/modules/memberWelcomeModule/WelcomeModule.schema";

const MessageEmbedSchema = (CustomConfigurations?: { [key: string]: any }) => Joi.object<MessageEmbedType>({
    author: Joi.object({
        name: Joi.string().allow("").max(100),
        picture: Joi.string().allow("").max(100)
    }),
    fields: Joi.array().items(
        Joi.object({
            name: Joi.string().required().max(100),
            value: Joi.string().required().max(150),
            inline: Joi.boolean()
        })
    ),
    title: Joi.string().allow("").max(100),
    description: Joi.string().required().max(500),
    footer: Joi.string().allow("").max(100),
    thumbnail: Joi.string().max(150),
    ...CustomConfigurations
});

export default MessageEmbedSchema;