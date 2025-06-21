
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F2F2' }}>
      <div className="container mx-auto px-4 py-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Módulo Financeiro */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader style={{ backgroundColor: '#7B539D' }}>
              <CardTitle className="text-white">Módulo Financeiro</CardTitle>
              <CardDescription className="text-gray-200">
                Controle suas finanças
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Gerencie entradas, saídas e acompanhe seu saldo financeiro em tempo real.
              </p>
              <Button
                onClick={() => navigate('/lancamentos')}
                className="w-full"
                style={{ backgroundColor: '#D2B360', color: '#31144A' }}
              >
                Acessar Lançamentos
              </Button>
            </CardContent>
          </Card>

          {/* Precificação */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader style={{ backgroundColor: '#522A71' }}>
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
                variant="outline"
                className="w-full"
                style={{ borderColor: '#522A71', color: '#522A71' }}
                disabled
              >
                Em Desenvolvimento
              </Button>
            </CardContent>
          </Card>

          {/* Agenda */}
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
                variant="outline"
                className="w-full"
                style={{ borderColor: '#31144A', color: '#31144A' }}
                disabled
              >
                Em Desenvolvimento
              </Button>
            </CardContent>
          </Card>

          {/* Receitas */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader style={{ backgroundColor: '#D2B360' }}>
              <CardTitle style={{ color: '#31144A' }}>Receitas</CardTitle>
              <CardDescription style={{ color: '#522A71' }}>
                Assinatura do App
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Gerencie sua assinatura e pagamentos do aplicativo.
              </p>
              <Button
                variant="outline"
                className="w-full"
                style={{ borderColor: '#D2B360', color: '#31144A' }}
                disabled
              >
                Em Desenvolvimento
              </Button>
            </CardContent>
          </Card>

          {/* Indicações */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader style={{ backgroundColor: '#7B539D' }}>
              <CardTitle className="text-white">Indicações</CardTitle>
              <CardDescription className="text-gray-200">
                Ganhe comissões
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Indique o app e ganhe 33% de comissão das assinaturas.
              </p>
              <Button
                variant="outline"
                className="w-full"
                style={{ borderColor: '#7B539D', color: '#7B539D' }}
                disabled
              >
                Em Desenvolvimento
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            App Cab Pro v1.0 - Desenvolvido para cabeleireiras profissionais
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
