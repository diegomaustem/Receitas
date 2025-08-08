import { Router } from "express";
import { usuarioController } from "../controllers/UsuarioController";
import { validate } from "../middlewares/middlewareValidacao";
import {
  schemaAtualizacaoUsuario,
  schemaCriacaoUsuario,
} from "../validations/ValidacaoUsuario";
const rotas = Router();

rotas.get("/usuarios", usuarioController.listarUsuarios);
rotas.get("/usuario/:id", usuarioController.listarUsuario);
rotas.post(
  "/usuario",
  validate(schemaCriacaoUsuario, "body"),
  usuarioController.criarUsuario
);
rotas.patch(
  "/usuario/:id",
  validate(schemaAtualizacaoUsuario, "body"),
  usuarioController.atualizarUsuario
);
rotas.delete("/usuario/:id", usuarioController.excluirUsuario);

export default rotas;
