
import { useState } from "react";
import { ResumoFinanceiro } from "@/components/lancamentos/ResumoFinanceiro";
import { FormularioLancamento } from "@/components/lancamentos/FormularioLancamento";
import { ListaLancamentos } from "@/components/lancamentos/ListaLancamentos";
import { useLancamentos } from "@/hooks/useLancamentos";
import { Lancamento } from "@/types/lancamentos";
import { useToast } from "@/hooks/use-toast";

const Lancamentos = () => {
  const { toast } = useToast();
  const {
    lancamentos,
    adicionarLancamento,
    editarLancamento,
    excluirLancamento,
    calcularResumo
  } = useLancamentos();

  const [lancamentoEditando, setLancamentoEditando] = useState<Lancamento | null>(null);

  const handleSubmit = (lancamentoData: Omit<Lancamento, 'id' | 'createdAt'>) => {
    if (lancamentoEditando) {
      editarLancamento(lancamentoEditando.id, lancamentoData);
      setLancamentoEditando(null);
    } else {
      adicionarLancamento(lancamentoData);
    }
  };

  const handleEdit = (lancamento: Lancamento) => {
    setLancamentoEditando(lancamento);
    // Scroll to top para mostrar o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este lançamento?')) {
      excluirLancamento(id);
      toast({
        title: "Sucesso",
        description: "Lançamento excluído com sucesso!"
      });
    }
  };

  const handleCancelEdit = () => {
    setLancamentoEditando(null);
  };

  const resumo = calcularResumo();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F2F2' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#31144A' }}>
            Módulo Financeiro - Lançamentos
          </h1>
          <p className="text-gray-600">
            Gerencie suas entradas e saídas financeiras de forma organizada
          </p>
        </div>

        <ResumoFinanceiro resumo={resumo} />

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
