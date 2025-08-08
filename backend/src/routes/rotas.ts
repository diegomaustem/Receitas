import { Router } from "express";
import { usuarioController } from "../controllers/UsuarioController";
import { receitaController } from "../controllers/ReceitaController";
import { validate } from "../middlewares/middlewareValidacao";
import { schemaLogin } from "../validations/ValidacaoLogin";
import {
  schemaAtualizacaoUsuario,
  schemaCriacaoUsuario,
} from "../validations/ValidacaoUsuario";
import {
  schemaAtualizacaoReceita,
  schemaCriacaoReceita,
} from "../validations/ValidacaoReceita";
import { categoriaController } from "../controllers/CategoriaController";
import { autenticacaoController } from "../controllers/AutenticacaoController";
import { auth } from "../middlewares/middlewareAutenticacao";

const rotas = Router();

// Autenticação :::
rotas.post(
  "/login",
  validate(schemaLogin, "body"),
  autenticacaoController.login
);

// Usuários :::
rotas.get("/usuarios", auth, usuarioController.listarUsuarios);
rotas.get("/usuario/:id", auth, usuarioController.listarUsuario);
rotas.post(
  "/usuario",
  auth,
  validate(schemaCriacaoUsuario, "body"),
  usuarioController.criarUsuario
);
rotas.patch(
  "/usuario/:id",
  auth,
  validate(schemaAtualizacaoUsuario, "body"),
  usuarioController.atualizarUsuario
);
rotas.delete("/usuario/:id", auth, usuarioController.excluirUsuario);

// Receitas :::
rotas.get("/receitas", auth, receitaController.listarReceitas);
rotas.get("/receita/:id", auth, receitaController.listarReceita);
rotas.post(
  "/receita",
  auth,
  validate(schemaCriacaoReceita, "body"),
  receitaController.criarReceita
);
rotas.patch(
  "/receita/:id",
  auth,
  validate(schemaAtualizacaoReceita, "body"),
  receitaController.atualizarReceita
);
rotas.delete("/receita/:id", auth, receitaController.excluirReceita);

// Categorias :::
rotas.get("/categorias", auth, categoriaController.listarCategorias);
rotas.get("/categoria/:id", auth, categoriaController.listarCategoria);

export default rotas;
