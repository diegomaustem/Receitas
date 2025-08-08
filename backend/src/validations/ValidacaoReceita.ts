import Joi from "joi";

export const schemaCriacaoReceita = Joi.object({
  idUsuarios: Joi.number().integer().positive().required().messages({
    "number.base": "O ID do usuário deve ser um número.",
    "number.integer": "O ID do usuário deve ser um número inteiro.",
    "number.positive": "O ID do usuário deve ser um número positivo.",
    "any.required": "O ID do usuário é obrigatório.",
  }),
  idCategorias: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .optional()
    .messages({
      "number.base": "O ID da categoria deve ser um número.",
      "number.integer": "O ID da categoria deve ser um número inteiro.",
      "number.positive": "O ID da categoria deve ser um número positivo.",
    }),
  nome: Joi.string().trim().min(3).max(100).allow(null).optional().messages({
    "string.base": "O nome deve ser um texto.",
    "string.min": "O nome deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome deve ter no máximo {#limit} caracteres.",
  }),
  tempoPreparoMinutos: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .optional()
    .messages({
      "number.base": "O tempo de preparo deve ser um número.",
      "number.integer": "O tempo de preparo deve ser um número inteiro.",
      "number.positive": "O tempo de preparo deve ser um número positivo.",
    }),
  porcoes: Joi.number().integer().min(1).allow(null).optional().messages({
    "number.base": "O número de porções deve ser um número.",
    "number.integer": "O número de porções deve ser um número inteiro.",
    "number.min": "O número de porções deve ser no mínimo {#limit}.",
  }),
  modoPreparo: Joi.string().trim().min(10).required().messages({
    "string.base": "O modo de preparo deve ser um texto.",
    "string.min": "O modo de preparo deve ter pelo menos {#limit} caracteres.",
    "any.required": "O modo de preparo é obrigatório.",
  }),
  ingredientes: Joi.string().trim().allow(null).optional().messages({
    "string.base": "Os ingredientes devem ser um texto.",
  }),
});

export const schemaAtualizacaoReceita = Joi.object({
  idCategorias: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .optional()
    .messages({
      "number.base": "O ID da categoria deve ser um número.",
      "number.integer": "O ID da categoria deve ser um número inteiro.",
      "number.positive": "O ID da categoria deve ser um número positivo.",
    }),
  nome: Joi.string().trim().min(3).max(100).allow(null).optional().messages({
    "string.base": "O nome deve ser um texto.",
    "string.min": "O nome deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome deve ter no máximo {#limit} caracteres.",
  }),
  tempoPreparoMinutos: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .optional()
    .messages({
      "number.base": "O tempo de preparo deve ser um número.",
      "number.integer": "O tempo de preparo deve ser um número inteiro.",
      "number.positive": "O tempo de preparo deve ser um número positivo.",
    }),
  porcoes: Joi.number().integer().min(1).allow(null).optional().messages({
    "number.base": "O número de porções deve ser um número.",
    "number.integer": "O número de porções deve ser um número inteiro.",
    "number.min": "O número de porções deve ser no mínimo {#limit}.",
  }),
  modoPreparo: Joi.string().trim().min(10).optional().messages({
    "string.base": "O modo de preparo deve ser um texto.",
    "string.min": "O modo de preparo deve ter pelo menos {#limit} caracteres.",
  }),
  ingredientes: Joi.string().trim().allow(null).optional().messages({
    "string.base": "Os ingredientes devem ser um texto.",
  }),
});
