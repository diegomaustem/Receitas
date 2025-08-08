import Joi from "joi";

export const schemaLogin = Joi.object({
  login: Joi.string().trim().required().messages({
    "string.base": "O login deve ser um texto.",
    "string.empty": "O login não deve ser vazio.",
    "any.required": "O login é obrigatório.",
  }),

  senha: Joi.string().min(6).max(99).required().messages({
    "string.base": "A senha deve ser um texto.",
    "string.min": "A senha deve ter pelo menos {#limit} caracteres.",
    "string.empty": "A senha não pode ser vazia.",
    "any.required": "A senha para login é obrigatória.",
  }),
});
