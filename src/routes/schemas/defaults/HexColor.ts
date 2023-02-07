import Joi from "joi";

const HexColor = Joi.string().regex(/^#([ABCDEF1234567890]{3})?([ABCDEF1234567890]{6})?$/i).max(7);

export default HexColor;