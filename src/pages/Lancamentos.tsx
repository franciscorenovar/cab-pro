
import { useState } from "react";
import { ResumoFinanceiro } from "@/components/lancamentos/ResumoFinanceiro";
import { FormularioLancamento } from "@/components/lancamentos/FormularioLancamento";
import { ListaLancamentos } from "@/components/lancamentos/ListaLancamentos";
import { useLancamentos } from "@/hooks/useLancamentos";
import { Lancamento } from "@/types/lancamentos";

const Lancamentos = () => {
  const {
    lancamentos,
    adicionarLancamento,
    editarLancamento,
    excluirLancamento,
    calcularResumo
  } = useLancamentos();

  const [lancamentoEditando, setLancamentoEditando] = useState<Lancamento | null>(null);

  const handleSubmit = (lancamento: Omit<Lancamento, 'id' | 'createdAt'>) => {
    if (lancamentoEditando) {
      editarLancamento(lancamentoEditando.id, lancamento);
      setLancamentoEditando(null);
    } else {
      adicionarLancamento(lancamento);
    }
  };

  const handleEdit = (lancamento: Lancamento) => {
    setLancamentoEditando(lancamento);
  };

  const handleDelete = (id: string) => {
    excluirLancamento(id);
  };

  const handleCancelEdit = () => {
    setLancamentoEditando(null);
  };

  const resumo = calcularResumo();

  return (
    <div className="space-y-6">
      <ResumoFinanceiro resumo={resumo} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormularioLancamento 
          onSubmit={handleSubmit}
          lancamentoEditando={lancamentoEditando}
          onCancelEdit={handleCancelEdit}
        />
        <ListaLancamentos 
          lancamentos={lancamentos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Lancamentos;
