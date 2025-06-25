
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import Lancamentos from "./Lancamentos";
import Relatorios from "./financeiro/Relatorios";

const Financeiro = () => {
  const [activeTab, setActiveTab] = useState("lancamentos");

  const tabs = [
    { id: "lancamentos", name: "Lançamentos" },
    { id: "relatorios", name: "Relatórios" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "lancamentos":
        return <Lancamentos />;
      case "relatorios":
        return <Relatorios />;
      default:
        return <Lancamentos />;
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

export default Financeiro;
