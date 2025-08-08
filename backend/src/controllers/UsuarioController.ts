import { Request, Response } from "express";
import { servicoUsuario } from "../services/ServicoUsuario";
import { IUsuario } from "../Interfaces/IUsuario";
import HttpErro from "../errors/HttpErros";
import { IPaginacao } from "../Interfaces/IPaginacao";

class UsuarioController {
  async listarUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const paginacao: IPaginacao = {
        pagina: parseInt(String(req.query.pagina)) || 1,
        limite: parseInt(String(req.query.limite)) || 10,
      };
      const usuarios = await servicoUsuario.listarUsuarios(paginacao);
      res.status(200).json({ status: "sucesso", ...usuarios });
      return;
    } catch (error) {
      console.error(":C - Erro ao recuperar usuários.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno ao recuperar usuários. Tente mais tarde.",
      });
      return;
    }
  }

  async listarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ status: "erro", mensagem: "ID do usuário não fornecido." });
      return;
    }
    const idUsuario = parseInt(id);

    try {
      const usuario = await servicoUsuario.listarUsuario(idUsuario);
      if (!usuario) {
        res.status(404).json({
          status: "erro",
          mensagem: "Usuário não encontrado.",
        });
        return;
      }

      res.status(200).json({
        status: "sucesso",
        dados: usuario,
      });
      return;
    } catch (error) {
      console.error(":C - Erro ao recuperar usuário.", error);
      res.status(500).json({
        status: "erro",
        message: "Erro interno ao recuperar usuário. Tente mais tarde.",
      });
      return;
    }
  }

  async criarUsuario(req: Request, res: Response): Promise<void> {
    const dadosUsuario: IUsuario = req.body;
    try {
      await servicoUsuario.validarRegrasUsuario(dadosUsuario);
      const novoUsuario = await servicoUsuario.criarUsuario(dadosUsuario);
      res.status(201).json({
        status: "sucesso",
        mensagem: "Usuário criado com sucesso.",
        dados: novoUsuario,
      });
      return;
    } catch (error) {
      if (error instanceof HttpErro) {
        res.status(error.statusCode).json({
          status: "erro",
          mensagem: error.mensagem,
        });
        return;
      }

      console.error(":C - Erro ao criar usuário.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno ao criar usuário. Tente mais tarde.",
      });
    }
  }

  async atualizarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ status: "erro", mensagem: "ID do usuário não fornecido." });
      return;
    }
    const idUsuario = parseInt(id);
    const dadosUsuario: IUsuario = req.body;

    try {
      const usuario = await servicoUsuario.listarUsuario(idUsuario);
      if (!usuario) {
        res.status(404).json({
          status: "erro",
          mensagem: "Usuário não encontrado para atualizar.",
        });
        return;
      }

      await servicoUsuario.validarRegrasUsuario(dadosUsuario);

      const usuarioAtualizado = await servicoUsuario.atualizarUsuario(
        idUsuario,
        dadosUsuario
      );
      res.status(200).json({
        status: "sucesso",
        mensagem: "Usuário atualizado com sucesso.",
        dados: usuarioAtualizado,
      });
    } catch (error) {
      if (error instanceof HttpErro) {
        res.status(error.statusCode).json({
          status: "erro",
          mensagem: error.mensagem,
        });
        return;
      }

      console.error(":C - Erro ao atualiza usuário.", error);
      res.status(500).json({
        status: "erro",
        message: "Erro interno ao atualizar usuário.",
      });
    }
  }

  async excluirUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ status: "erro", mensagem: "ID do usuário não fornecido." });
      return;
    }
    const idUsuario = parseInt(id);
    try {
      const usuario = await servicoUsuario.listarUsuario(idUsuario);
      if (!usuario) {
        res.status(404).json({
          status: "erro",
          mensagem: "Usuário não encontrado para exclusão.",
        });
        return;
      }

      await servicoUsuario.validarRegrasUsuario(undefined, idUsuario);

      const usuarioExcluido = await servicoUsuario.excluirUsuario(idUsuario);
      res.status(200).json({
        status: "sucesso",
        mensagem: "Usuário excluído com sucesso.",
        dados: usuarioExcluido,
      });
    } catch (error) {
      if (error instanceof HttpErro) {
        res.status(error.statusCode).json({
          status: "erro",
          mensagem: error.mensagem,
        });
        return;
      }

      console.error(":C - Erro ao excluir usuário.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno ao excluir usuário.",
      });
    }
  }
}

export const usuarioController = new UsuarioController();
