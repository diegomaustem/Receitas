import prisma from "../lib/prismaClient";
import { ModeloTabelas } from "../Types/ModeloTabelas";

class RepositorioGenerico {
  async queryGenerica(
    table: ModeloTabelas,
    field: string,
    value: string | number,
    id?: number
  ): Promise<boolean> {
    const model = (prisma as any)[table];
    const where = id
      ? { AND: [{ [field]: value }, { id: { not: id } }] }
      : {
          [field]: typeof value === "string" ? { equals: value } : value,
        };

    const hasInTable = await model.findFirst({ where });
    return !!hasInTable;
  }
}
export const repositorioGenerico = new RepositorioGenerico();
