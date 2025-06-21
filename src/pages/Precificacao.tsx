
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Precificacao = () => {
  const [activeTab, setActiveTab] = useState("produtos");

  const tabs = [
    { id: "produtos", name: "Produtos" },
    { id: "custos-fixos", name: "Custos Fixos" },
    { id: "servicos", name: "Serviços" },
    { id: "listagem", name: "Listagem" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "produtos":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Cadastro de Produtos</CardTitle>
              <CardDescription>Gerencie seus produtos e materiais</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de produtos em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "custos-fixos":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Custos Fixos</CardTitle>
              <CardDescription>Configure seus custos mensais</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de custos fixos em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "servicos":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Serviços</CardTitle>
              <CardDescription>Configure seus serviços e preços</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de serviços em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "listagem":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Listagem de Preços</CardTitle>
              <CardDescription>Seu cardápio de serviços</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de listagem em desenvolvimento...</p>
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
          Módulo Precificação
        </h1>
        <p className="text-gray-600">
          Gerencie produtos, custos e precifique seus serviços
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

export default Precificacao;
