import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { servicoUsuario } from "../services/ServicoUsuario";
import { ILoginUsuario } from "../Interfaces/ILoginUsuario";
import HttpErro from "../errors/HttpErros";

class AutenticacaoController {
  async login(req: Request, res: Response) {
    const dadosLoginUsuario: ILoginUsuario = req.body;
    try {
      const usuarioExistente = await servicoUsuario.obterUsuarioExistente(
        dadosLoginUsuario
      );

      const senhaCorresponde = await bcrypt.compare(
        dadosLoginUsuario.senha,
        usuarioExistente.senha
      );

      if (!senhaCorresponde) {
        res.status(401).json({
          status: "erro",
          mensagem: "Credenciais inválidas.",
        });
        return;
      }

      const chaveSecreta = process.env.SECRET_KEY;
      if (!chaveSecreta) {
        throw new Error(
          "SECRET_KEY não foi definida nas variáveis de ambiente."
        );
      }

      const token = jwt.sign({ id: usuarioExistente.id }, chaveSecreta, {
        expiresIn: "2h",
      });

      res.status(200).json({
        status: "success",
        mensagem: "Usuário logado com sucesso.",
        dados: {
          id: usuarioExistente.id,
          nome: usuarioExistente.nome,
          login: usuarioExistente.login,
        },
        token: token,
      });
    } catch (error) {
      if (error instanceof HttpErro) {
        res.status(error.statusCode).json({
          status: "erro",
          mensagem: error.mensagem,
        });
        return;
      }

      console.error(":C - Erro no processo de login.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno no processo de login. Tente mais tarde.",
      });
    }
  }
}

export const autenticacaoController = new AutenticacaoController();
