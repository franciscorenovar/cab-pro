
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import AgendamentoModerno from "./agenda/AgendamentoModerno";
import ClientesSimples from "./agenda/ClientesSimples";

const Agenda = () => {
  const [activeTab, setActiveTab] = useState("agendamentos");

  const tabs = [
    { id: "agendamentos", name: "Datas Disponíveis" },
    { id: "clientes", name: "Clientes" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "agendamentos":
        return <AgendamentoModerno />;
      case "clientes":
        return <ClientesSimples />;
      default:
        return <AgendamentoModerno />;
    }
  };

  return (
    <MainLayout>
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
