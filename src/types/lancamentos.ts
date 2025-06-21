
export interface Lancamento {
  id: string;
  data: Date;
  tipo: 'Entrada' | 'Saída';
  valor: number;
  formaPagamento: 'Pix' | 'Dinheiro' | 'CC' | 'CD' | 'Crédito Loja';
  categoria: 'Profissional' | 'Pessoal';
  descricao: string;
  createdAt?: Date;
}

export interface ResumoFinanceiro {
  entradas: number;
  saidas: number;
  saldo: number;
}
