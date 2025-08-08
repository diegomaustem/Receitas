export interface IResultadoPaginado<T> {
  dados: T[];
  paginacao: {
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
  };
}
