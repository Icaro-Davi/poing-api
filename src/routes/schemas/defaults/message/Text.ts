import Joi from "joi";

const MessageText = Joi.string().required().max(500);

export default MessageText;