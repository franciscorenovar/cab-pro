
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Indicacao {
  id: string;
  nomeIndicado: string;
  emailIndicado: string;
  dataIndicacao: Date;
  status: 'pendente' | 'ativo' | 'cancelado';
  comissaoGerada: number;
  dataAtivacao?: Date;
}

interface SaldoIndicacoes {
  totalComissao: number;
  saldoDisponivel: number;
  totalSacado: number;
}

const Indicacoes = () => {
  const { toast } = useToast();
  const [indicacoes, setIndicacoes] = useState<Indicacao[]>([
    {
      id: '1',
      nomeIndicado: 'Maria Silva',
      emailIndicado: 'maria@email.com',
      dataIndicacao: new Date(2024, 10, 15),
      status: 'ativo',
      comissaoGerada: 49.50, // 33% de R$15 por 10 meses
      dataAtivacao: new Date(2024, 10, 16)
    },
    {
      id: '2',
      nomeIndicado: 'Ana Costa',
      emailIndicado: 'ana@email.com',
      dataIndicacao: new Date(2024, 11, 1),
      status: 'ativo',
      comissaoGerada: 14.85, // 33% de R$15 por 3 meses
      dataAtivacao: new Date(2024, 11, 2)
    },
    {
      id: '3',
      nomeIndicado: 'Carla Santos',
      emailIndicado: 'carla@email.com',
      dataIndicacao: new Date(2024, 11, 10),
      status: 'pendente',
      comissaoGerada: 0
    }
  ]);

  const [novaIndicacao, setNovaIndicacao] = useState({
    nome: '',
    email: ''
  });

  const [dadosSaque, setDadosSaque] = useState({
    chavePix: '',
    valor: ''
  });

  const saldo: SaldoIndicacoes = {
    totalComissao: indicacoes.reduce((acc, ind) => acc + ind.comissaoGerada, 0),
    saldoDisponivel: 64.35, // Mock do saldo disponível
    totalSacado: 0
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pendente': '#FF9800',
      'ativo': '#4CAF50',
      'cancelado': '#F44336'
    };
    return colors[status as keyof typeof colors] || '#9E9E9E';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'pendente': 'Pendente',
      'ativo': 'Ativo',
      'cancelado': 'Cancelado'
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

  const handleNovaIndicacao = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!novaIndicacao.nome || !novaIndicacao.email) {
      toast({
        title: "Erro",
        description: "Por favor, preencha nome e email.",
        variant: "destructive"
      });
      return;
    }

    const indicacao: Indicacao = {
      id: Date.now().toString(),
      nomeIndicado: novaIndicacao.nome,
      emailIndicado: novaIndicacao.email,
      dataIndicacao: new Date(),
      status: 'pendente',
      comissaoGerada: 0
    };

    setIndicacoes([...indicacoes, indicacao]);
    setNovaIndicacao({ nome: '', email: '' });
    
    toast({
      title: "Sucesso",
      description: "Indicação registrada! Seu link foi enviado por email."
    });
  };

  const handleSaque = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dadosSaque.chavePix || !dadosSaque.valor) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const valorSaque = Number(dadosSaque.valor);
    
    if (valorSaque < 600) {
      toast({
        title: "Valor Mínimo",
        description: "O valor mínimo para saque é R$ 600,00.",
        variant: "destructive"
      });
      return;
    }

    if (valorSaque > saldo.saldoDisponivel) {
      toast({
        title: "Saldo Insuficiente",
        description: "Valor maior que o saldo disponível.",
        variant: "destructive"
      });
      return;
    }

    // Simular processamento do saque
    toast({
      title: "Saque Solicitado",
      description: `Saque de ${formatCurrency(valorSaque)} solicitado via PIX. Processamento em até 2 dias úteis.`
    });

    setDadosSaque({ chavePix: '', valor: '' });
  };

  const copiarLinkIndicacao = () => {
    const link = `https://appcabpro.com/indicacao?ref=USER123`;
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Link Copiado",
      description: "Link de indicação copiado para a área de transferência!"
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4" style={{ borderLeftColor: '#D2B360' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Comissão</div>
            <div className="text-2xl font-bold" style={{ color: '#D2B360' }}>
              {formatCurrency(saldo.totalComissao)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#7B539D' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Saldo Disponível</div>
            <div className="text-2xl font-bold" style={{ color: '#7B539D' }}>
              {formatCurrency(saldo.saldoDisponivel)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#522A71' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Indicações Ativas</div>
            <div className="text-2xl font-bold" style={{ color: '#522A71' }}>
              {indicacoes.filter(i => i.status === 'ativo').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-yellow-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#31144A' }}>
              Como Funciona?
            </h3>
            <p className="text-gray-600 mb-4">
              Para cada pessoa que se cadastrar através do seu link, você ganha 33% do valor da assinatura mensal dela, 
              enquanto ela mantiver a assinatura ativa. Saque mínimo: R$ 600,00.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold" style={{ color: '#D2B360' }}>
                  R$ 4,95
                </div>
                <div className="text-sm text-gray-600">por mês (plano básico)</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#7B539D' }}>
                  R$ 9,57
                </div>
                <div className="text-sm text-gray-600">por mês (plano premium)</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#522A71' }}>
                  33%
                </div>
                <div className="text-sm text-gray-600">de comissão recorrente</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }}>Nova Indicação</CardTitle>
            <CardDescription>Indique uma amiga e ganhe comissão recorrente</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <Label className="font-medium">Seu Link de Indicação</Label>
              <div className="flex mt-2">
                <Input 
                  value="https://appcabpro.com/indicacao?ref=USER123" 
                  readOnly 
                  className="bg-gray-50"
                />
                <Button 
                  onClick={copiarLinkIndicacao}
                  style={{ backgroundColor: '#7B539D', color: 'white' }}
                  className="ml-2 hover:opacity-90"
                >
                  Copiar
                </Button>
              </div>
            </div>

            <form onSubmit={handleNovaIndicacao} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome da Pessoa</Label>
                <Input
                  id="nome"
                  value={novaIndicacao.nome}
                  onChange={(e) => setNovaIndicacao({ ...novaIndicacao, nome: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={novaIndicacao.email}
                  onChange={(e) => setNovaIndicacao({ ...novaIndicacao, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>

              <Button 
                type="submit" 
                style={{ backgroundColor: '#D2B360', color: '#31144A' }}
                className="w-full hover:opacity-90"
              >
                Enviar Indicação
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }}>Solicitar Saque</CardTitle>
            <CardDescription>Saque seu saldo via PIX (mínimo R$ 600,00)</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Saldo disponível:</strong> {formatCurrency(saldo.saldoDisponivel)}
              </p>
            </div>

            <form onSubmit={handleSaque} className="space-y-4">
              <div>
                <Label htmlFor="chavePix">Chave PIX</Label>
                <Input
                  id="chavePix"
                  value={dadosSaque.chavePix}
                  onChange={(e) => setDadosSaque({ ...dadosSaque, chavePix: e.target.value })}
                  placeholder="CPF, email, telefone ou chave aleatória"
                />
              </div>

              <div>
                <Label htmlFor="valorSaque">Valor do Saque</Label>
                <Input
                  id="valorSaque"
                  type="number"
                  step="0.01"
                  min="600"
                  value={dadosSaque.valor}
                  onChange={(e) => setDadosSaque({ ...dadosSaque, valor: e.target.value })}
                  placeholder="600.00"
                />
              </div>

              <Button 
                type="submit" 
                style={{ backgroundColor: '#522A71', color: 'white' }}
                className="w-full hover:opacity-90"
                disabled={saldo.saldoDisponivel < 600}
              >
                {saldo.saldoDisponivel < 600 ? 'Saldo Insuficiente' : 'Solicitar Saque'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>
            Minhas Indicações ({indicacoes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {indicacoes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Você ainda não fez nenhuma indicação. Comece agora!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: '#F2F2F2' }}>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Data Indicação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Comissão Gerada</TableHead>
                    <TableHead>Data Ativação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicacoes.map((indicacao) => (
                    <TableRow key={indicacao.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{indicacao.nomeIndicado}</TableCell>
                      <TableCell>{indicacao.emailIndicado}</TableCell>
                      <TableCell>{formatDate(indicacao.dataIndicacao)}</TableCell>
                      <TableCell>
                        <Badge 
                          style={{ 
                            backgroundColor: getStatusColor(indicacao.status),
                            color: 'white'
                          }}
                        >
                          {getStatusLabel(indicacao.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {formatCurrency(indicacao.comissaoGerada)}
                      </TableCell>
                      <TableCell>
                        {indicacao.dataAtivacao ? formatDate(indicacao.dataAtivacao) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Indicacoes;
