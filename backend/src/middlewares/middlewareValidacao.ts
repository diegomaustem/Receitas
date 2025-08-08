import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type FonteDadosRequisicao = "body" | "query" | "params";

export const validate =
  (schema: Joi.ObjectSchema, source: FonteDadosRequisicao = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const dadosRequisicao = Object.values(req[source]).some((value) => {
        if (value !== null && value !== undefined) {
          if (typeof value === "string") {
            return value.trim() !== "";
          }
          return true;
        }
        return false;
      });

      if (!dadosRequisicao) {
        res.status(400).json({
          status: "erro",
          mensagem: "Não é permitido que todos os campos sejam vazios.",
        });
        return;
      }

      const { error } = schema.validate(req[source], {
        abortEarly: false,
        allowUnknown: true,
      });

      if (error) {
        const errors = error.details.map((detail) => ({
          campo: detail.path.join("."),
          problema: detail.message.replace(/['"]/g, ""),
        }));

        res.status(400).json({
          status: "erro",
          mensagem: "Falha na validação dos dados de entrada.",
          erros: errors,
        });
        return;
      }
      next();
    } catch (error) {
      console.error(":M - Erro no middleware de validção.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno ao processar a validação.",
      });
      return;
    }
  };
