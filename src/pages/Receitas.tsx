
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Receitas = () => {
  const [activeTab, setActiveTab] = useState("assinatura");

  const tabs = [
    { id: "assinatura", name: "Assinatura do App" },
    { id: "indicacoes", name: "Indicações" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "assinatura":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Assinatura do App</CardTitle>
              <CardDescription>Gerencie sua assinatura mensal</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de assinatura em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "indicacoes":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Programa de Indicações</CardTitle>
              <CardDescription>Ganhe 33% de comissão das indicações</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de indicações em desenvolvimento...</p>
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
          Módulo Receitas
        </h1>
        <p className="text-gray-600">
          Gerencie sua assinatura e indicações
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

export default Receitas;
