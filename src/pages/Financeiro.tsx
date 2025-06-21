
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumoFinanceiro } from "@/components/lancamentos/ResumoFinanceiro";
import { FormularioLancamento } from "@/components/lancamentos/FormularioLancamento";
import { ListaLancamentos } from "@/components/lancamentos/ListaLancamentos";
import { useLancamentos } from "@/hooks/useLancamentos";
import { Lancamento } from "@/types/lancamentos";
import { useToast } from "@/hooks/use-toast";

const Financeiro = () => {
  const [activeTab, setActiveTab] = useState("lancamentos");
  const { toast } = useToast();
  const {
    lancamentos,
    adicionarLancamento,
    editarLancamento,
    excluirLancamento,
    calcularResumo
  } = useLancamentos();

  const [lancamentoEditando, setLancamentoEditando] = useState<Lancamento | null>(null);

  const tabs = [
    { id: "lancamentos", name: "Lançamentos" },
    { id: "relatorios", name: "Relatórios" }
  ];

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

  const renderContent = () => {
    switch (activeTab) {
      case "lancamentos":
        return (
          <div>
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
        );
      case "relatorios":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Relatórios Financeiros</CardTitle>
              <CardDescription>Análise e exportação de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de relatórios em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#31144A' }}>
          Módulo Financeiro
        </h1>
        <p className="text-gray-600">
          Gerencie suas entradas e saídas financeiras
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "default" : "outline"}
            style={{
              backgroundColor: activeTab === tab.id ? '#7B539D' : 'transparent',
              borderColor: '#7B539D',
              color: activeTab === tab.id ? 'white' : '#7B539D'
            }}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      {renderContent()}
    </MainLayout>
  );
};

export default Financeiro;
