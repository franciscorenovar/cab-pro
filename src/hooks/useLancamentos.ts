
import { useState, useEffect } from 'react';
import { Lancamento, ResumoFinanceiro } from '@/types/lancamentos';

export const useLancamentos = () => {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar lançamentos do localStorage
  useEffect(() => {
    const savedLancamentos = localStorage.getItem('cabpro-lancamentos');
    if (savedLancamentos) {
      const parsed = JSON.parse(savedLancamentos);
      setLancamentos(parsed.map((l: any) => ({
        ...l,
        data: new Date(l.data)
      })));
    }
  }, []);

  // Salvar no localStorage quando houver mudanças
  const saveLancamentos = (newLancamentos: Lancamento[]) => {
    localStorage.setItem('cabpro-lancamentos', JSON.stringify(newLancamentos));
    setLancamentos(newLancamentos);
  };

  const adicionarLancamento = (lancamento: Omit<Lancamento, 'id' | 'createdAt'>) => {
    const novoLancamento: Lancamento = {
      ...lancamento,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    const novosLancamentos = [...lancamentos, novoLancamento];
    saveLancamentos(novosLancamentos);
  };

  const editarLancamento = (id: string, lancamentoAtualizado: Omit<Lancamento, 'id' | 'createdAt'>) => {
    const novosLancamentos = lancamentos.map(l => 
      l.id === id ? { ...l, ...lancamentoAtualizado } : l
    );
    saveLancamentos(novosLancamentos);
  };

  const excluirLancamento = (id: string) => {
    const novosLancamentos = lancamentos.filter(l => l.id !== id);
    saveLancamentos(novosLancamentos);
  };

  const calcularResumo = (): ResumoFinanceiro => {
    const entradas = lancamentos
      .filter(l => l.tipo === 'Entrada')
      .reduce((acc, l) => acc + l.valor, 0);
    
    const saidas = lancamentos
      .filter(l => l.tipo === 'Saída')
      .reduce((acc, l) => acc + l.valor, 0);
    
    return {
      entradas,
      saidas,
      saldo: entradas - saidas
    };
  };

  return {
    lancamentos,
    loading,
    adicionarLancamento,
    editarLancamento,
    excluirLancamento,
    calcularResumo
  };
};
