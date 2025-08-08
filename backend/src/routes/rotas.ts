import { Router } from "express";
import { usuarioController } from "../controllers/UsuarioController";
const rotas = Router();

rotas.get("/usuarios", usuarioController.listarUsuarios);
rotas.get("/usuario/:id", usuarioController.listarUsuario);
rotas.post("/usuario", usuarioController.criarUsuario);
rotas.patch("/usuario/:id", usuarioController.atualizarUsuario);
rotas.delete("/usuario/:id", usuarioController.excluirUsuario);

export default rotas;
