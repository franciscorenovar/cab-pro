
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DadosAssinatura {
  plano: 'basico' | 'premium';
  status: 'ativa' | 'vencida' | 'cancelada';
  proximoVencimento: Date;
  valorMensal: number;
  metodoPagamento?: string;
  ultimosPagamentos: PagamentoHistorico[];
}

interface PagamentoHistorico {
  id: string;
  data: Date;
  valor: number;
  status: 'pago' | 'pendente' | 'falhado';
  metodo: string;
}

const AssinaturaApp = () => {
  const { toast } = useToast();
  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  });

  // Mock dos dados da assinatura
  const [assinatura] = useState<DadosAssinatura>({
    plano: 'basico',
    status: 'ativa',
    proximoVencimento: new Date(2025, 0, 15), // 15 de janeiro de 2025
    valorMensal: 15.00,
    metodoPagamento: 'Cartão terminado em 1234',
    ultimosPagamentos: [
      {
        id: '1',
        data: new Date(2024, 11, 15),
        valor: 15.00,
        status: 'pago',
        metodo: 'Cartão de Crédito'
      },
      {
        id: '2',
        data: new Date(2024, 10, 15),
        valor: 15.00,
        status: 'pago',
        metodo: 'Cartão de Crédito'
      },
      {
        id: '3',
        data: new Date(2024, 9, 15),
        valor: 15.00,
        status: 'pago',
        metodo: 'Cartão de Crédito'
      }
    ]
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'ativa': '#4CAF50',
      'vencida': '#F44336',
      'cancelada': '#9E9E9E',
      'pago': '#4CAF50',
      'pendente': '#FF9800',
      'falhado': '#F44336'
    };
    return colors[status as keyof typeof colors] || '#9E9E9E';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'ativa': 'Ativa',
      'vencida': 'Vencida',
      'cancelada': 'Cancelada',
      'pago': 'Pago',
      'pendente': 'Pendente',
      'falhado': 'Falhado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const handleAtualizarCartao = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dadosCartao.numero || !dadosCartao.nome || !dadosCartao.validade || !dadosCartao.cvv) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos do cartão.",
        variant: "destructive"
      });
      return;
    }

    // Simular atualização do cartão
    toast({
      title: "Sucesso",
      description: "Cartão de crédito atualizado com sucesso!"
    });

    setDadosCartao({
      numero: '',
      nome: '',
      validade: '',
      cvv: ''
    });
  };

  const handleCancelarAssinatura = () => {
    if (window.confirm('Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos recursos premium.')) {
      toast({
        title: "Assinatura Cancelada",
        description: "Sua assinatura foi cancelada e será finalizada no próximo vencimento.",
        variant: "destructive"
      });
    }
  };

  const diasParaVencimento = Math.ceil((assinatura.proximoVencimento.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4" style={{ borderLeftColor: getStatusColor(assinatura.status) }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Status da Assinatura</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge style={{ backgroundColor: getStatusColor(assinatura.status), color: 'white' }}>
                {getStatusLabel(assinatura.status)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#D2B360' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Valor Mensal</div>
            <div className="text-2xl font-bold" style={{ color: '#D2B360' }}>
              {formatCurrency(assinatura.valorMensal)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: diasParaVencimento <= 3 ? '#F44336' : '#7B539D' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Próximo Vencimento</div>
            <div 
              className="text-lg font-bold"
              style={{ color: diasParaVencimento <= 3 ? '#F44336' : '#7B539D' }}
            >
              {formatDate(assinatura.proximoVencimento)}
            </div>
            <div className="text-xs text-gray-500">
              {diasParaVencimento > 0 ? `${diasParaVencimento} dias` : 'Vencido'}
            </div>
          </CardContent>
        </Card>
      </div>

      {diasParaVencimento <= 3 && diasParaVencimento > 0 && (
        <Card className="border-l-4 border-l-orange-500 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-orange-800">Atenção: Vencimento Próximo</h3>
                <p className="text-sm text-orange-700">
                  Sua assinatura vence em {diasParaVencimento} dias. Verifique seu método de pagamento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }}>Método de Pagamento</CardTitle>
            <CardDescription>Atualize seus dados de pagamento</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Método Atual</p>
                  <p className="text-sm text-gray-600">{assinatura.metodoPagamento}</p>
                </div>
                <Badge style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                  Ativo
                </Badge>
              </div>
            </div>

            <form onSubmit={handleAtualizarCartao} className="space-y-4">
              <div>
                <Label htmlFor="numero">Número do Cartão</Label>
                <Input
                  id="numero"
                  value={dadosCartao.numero}
                  onChange={(e) => setDadosCartao({ ...dadosCartao, numero: e.target.value })}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                />
              </div>

              <div>
                <Label htmlFor="nome">Nome no Cartão</Label>
                <Input
                  id="nome"
                  value={dadosCartao.nome}
                  onChange={(e) => setDadosCartao({ ...dadosCartao, nome: e.target.value })}
                  placeholder="Nome como aparece no cartão"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validade">Validade</Label>
                  <Input
                    id="validade"
                    value={dadosCartao.validade}
                    onChange={(e) => setDadosCartao({ ...dadosCartao, validade: e.target.value })}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={dadosCartao.cvv}
                    onChange={(e) => setDadosCartao({ ...dadosCartao, cvv: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                style={{ backgroundColor: '#7B539D', color: 'white' }}
                className="w-full hover:opacity-90"
              >
                Atualizar Cartão
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }}>Histórico de Pagamentos</CardTitle>
            <CardDescription>Últimas transações da sua assinatura</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {assinatura.ultimosPagamentos.map((pagamento) => (
                <div key={pagamento.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{formatDate(pagamento.data)}</p>
                    <p className="text-sm text-gray-600">{pagamento.metodo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(pagamento.valor)}</p>
                    <Badge 
                      style={{ 
                        backgroundColor: getStatusColor(pagamento.status),
                        color: 'white'
                      }}
                      className="text-xs"
                    >
                      {getStatusLabel(pagamento.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <Button 
                variant="outline"
                style={{ borderColor: '#D2B360', color: '#D2B360' }}
                className="w-full hover:bg-yellow-50"
              >
                Ver Histórico Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Zona de Perigo</CardTitle>
          <CardDescription className="text-red-600">
            Ações irreversíveis relacionadas à sua assinatura
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-red-800">Cancelar Assinatura</h3>
              <p className="text-sm text-red-600">
                Você perderá acesso aos recursos premium no próximo vencimento
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={handleCancelarAssinatura}
              className="border-red-500 text-red-500 hover:bg-red-100"
            >
              Cancelar Assinatura
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssinaturaApp;
