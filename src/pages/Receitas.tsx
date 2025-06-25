
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import AssinaturaApp from "./receitas/AssinaturaApp";
import Indicacoes from "./receitas/Indicacoes";

const Receitas = () => {
  const [activeTab, setActiveTab] = useState("assinatura");

  const tabs = [
    { id: "assinatura", name: "Assinatura do App" },
    { id: "indicacoes", name: "Indicações" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "assinatura":
        return <AssinaturaApp />;
      case "indicacoes":
        return <Indicacoes />;
      default:
        return <AssinaturaApp />;
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

export default Receitas;
