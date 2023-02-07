import Joi from "joi";

const Snowflake = Joi.string().regex(/^\d+$/).max(50);

export default Snowflake;