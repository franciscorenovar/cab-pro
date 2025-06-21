
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Agenda = () => {
  const [activeTab, setActiveTab] = useState("agendamentos");

  const tabs = [
    { id: "agendamentos", name: "Agendamentos" },
    { id: "clientes", name: "Clientes" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "agendamentos":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Agendamentos</CardTitle>
              <CardDescription>Gerencie sua agenda de horários</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de agendamentos em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "clientes":
        return (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Cadastro de Clientes</CardTitle>
              <CardDescription>Gerencie seus clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Módulo de clientes em desenvolvimento...</p>
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
          Módulo Agenda
        </h1>
        <p className="text-gray-600">
          Organize seus horários e clientes
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

export default Agenda;
