import * as bycrypt from "bcrypt";

class UtilsSenha {
  async hashSenha(senha: string): Promise<string> {
    return await bycrypt.hash(senha, 10);
  }

  async compareSenha(senha: string, hash: string): Promise<boolean> {
    return await bycrypt.compare(senha, hash);
  }
}

export const utilsSenha = new UtilsSenha();
