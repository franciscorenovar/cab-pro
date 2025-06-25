
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import Produtos from "./precificacao/Produtos";
import CustosFixos from "./precificacao/CustosFixos";
import Servicos from "./precificacao/Servicos";
import Listagem from "./precificacao/Listagem";

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
        return <Produtos />;
      case "custos-fixos":
        return <CustosFixos />;
      case "servicos":
        return <Servicos />;
      case "listagem":
        return <Listagem />;
      default:
        return <Produtos />;
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

export default Precificacao;
