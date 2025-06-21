
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="text-center mb-12">
        <h1 
          className="text-5xl font-bold mb-4" 
          style={{ color: '#31144A', fontFamily: 'serif' }}
        >
          App Cab Pro
        </h1>
        <p className="text-xl" style={{ color: '#522A71' }}>
          Gestão Profissional para Cabeleireiras
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Módulo Precificação */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader style={{ backgroundColor: '#7B539D' }}>
            <CardTitle className="text-white">Precificação</CardTitle>
            <CardDescription className="text-gray-200">
              Calcule preços justos
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">
              Produtos, custos fixos, serviços e listagem completa de preços.
            </p>
            <Button
              onClick={() => navigate('/precificacao')}
              className="w-full"
              style={{ backgroundColor: '#D2B360', color: '#31144A' }}
            >
              Acessar Precificação
            </Button>
          </CardContent>
        </Card>

        {/* Módulo Financeiro */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader style={{ backgroundColor: '#522A71' }}>
            <CardTitle className="text-white">Financeiro</CardTitle>
            <CardDescription className="text-gray-200">
              Controle suas finanças
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">
              Gerencie entradas, saídas e acompanhe seu saldo financeiro.
            </p>
            <Button
              onClick={() => navigate('/financeiro')}
              className="w-full"
              style={{ backgroundColor: '#D2B360', color: '#31144A' }}
            >
              Acessar Financeiro
            </Button>
          </CardContent>
        </Card>

        {/* Módulo Agenda */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader style={{ backgroundColor: '#31144A' }}>
            <CardTitle className="text-white">Agenda</CardTitle>
            <CardDescription className="text-gray-200">
              Organize seus horários
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">
              Agendamentos e cadastro de clientes de forma organizada.
            </p>
            <Button
              onClick={() => navigate('/agenda')}
              className="w-full"
              style={{ backgroundColor: '#D2B360', color: '#31144A' }}
            >
              Acessar Agenda
            </Button>
          </CardContent>
        </Card>

        {/* Módulo Receitas */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader style={{ backgroundColor: '#D2B360' }}>
            <CardTitle style={{ color: '#31144A' }}>Receitas</CardTitle>
            <CardDescription style={{ color: '#522A71' }}>
              Assinatura e Indicações
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">
              Gerencie sua assinatura e ganhe com indicações.
            </p>
            <Button
              onClick={() => navigate('/receitas')}
              className="w-full"
              style={{ backgroundColor: '#7B539D', color: 'white' }}
            >
              Acessar Receitas
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-500">
          App Cab Pro v1.0 - Desenvolvido para cabeleireiras profissionais
        </p>
      </div>
    </MainLayout>
  );
};

export default Index;
