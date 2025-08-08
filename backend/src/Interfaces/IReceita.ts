export interface IReceita {
  id: number;
  idUsuarios: number;
  idCategorias?: number | null;
  nome?: string | null;
  tempoPreparoMinutos?: number | null;
  porcoes?: number | null;
  modoPreparo: string;
  ingredientes?: string | null;
  criadoEm: Date;
  alteradoEm: Date;
}
