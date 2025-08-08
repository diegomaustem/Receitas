import { Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IRequisicaoAutenticacao } from "../Interfaces/IRequisicaoAutenticacao";

export const auth = (
  req: IRequisicaoAutenticacao,
  res: Response,
  next: NextFunction
) => {
  const chaveSecreta = process.env.SECRET_KEY as Secret;

  if (!chaveSecreta) {
    console.error(":M - Erro de configuração: SECRET_KEY não definida.");
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }

  const cabecalhoAutenticacao = req.headers.authorization;

  if (!cabecalhoAutenticacao || !cabecalhoAutenticacao.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "erro",
      mensagem: "Token de autenticação ausente ou no formato incorreto.",
    });
  }

  const token = cabecalhoAutenticacao.split(" ")[1];

  if (token) {
    try {
      const decodificado = jwt.verify(token, chaveSecreta);
      req.user = decodificado;
      return next();
    } catch (err) {
      return res.status(401).json({
        status: "erro",
        mensagem: "Token inválido ou expirado.",
      });
    }
  } else {
    return res.status(401).json({
      status: "erro",
      mensagem: "Token não fornecido.",
    });
  }
};
