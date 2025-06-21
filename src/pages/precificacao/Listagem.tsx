
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServicoListagem {
  id: string;
  nome: string;
  valor: number;
  categoria: string;
  descricao?: string;
}

const Listagem = () => {
  const [servicos, setServicos] = useState<ServicoListagem[]>([]);

  // Mock de dados - em uma implementação real, viria do estado global dos serviços
  useEffect(() => {
    const servicosMock: ServicoListagem[] = [
      {
        id: '1',
        nome: 'Hidratação Simples',
        valor: 45.00,
        categoria: 'Hidratação',
        descricao: 'Tratamento básico para cabelos ressecados'
      },
      {
        id: '2',
        nome: 'Reconstrução Capilar',
        valor: 85.00,
        categoria: 'Reconstrução',
        descricao: 'Tratamento intensivo para cabelos danificados'
      },
      {
        id: '3',
        nome: 'Botox Capilar',
        valor: 120.00,
        categoria: 'Alisamento',
        descricao: 'Alisamento natural com efeito botox'
      },
      {
        id: '4',
        nome: 'Corte + Escova',
        valor: 35.00,
        categoria: 'Corte',
        descricao: 'Corte moderno com finalização'
      },
      {
        id: '5',
        nome: 'Coloração Completa',
        valor: 95.00,
        categoria: 'Coloração',
        descricao: 'Mudança completa de cor'
      },
      {
        id: '6',
        nome: 'Reflexo/Luzes',
        valor: 75.00,
        categoria: 'Coloração',
        descricao: 'Mechas e reflexos personalizados'
      }
    ];
    setServicos(servicosMock);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getCategoriaColor = (categoria: string) => {
    const colors: { [key: string]: string } = {
      'Hidratação': '#D2B360',
      'Reconstrução': '#7B539D',
      'Alisamento': '#522A71',
      'Corte': '#31144A',
      'Coloração': '#D2B360'
    };
    return colors[categoria] || '#7B539D';
  };

  const categorias = [...new Set(servicos.map(s => s.categoria))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#31144A' }}>
          Listagem de Serviços
        </h2>
        <p className="text-gray-600">
          Cardápio completo dos seus serviços para apresentar aos clientes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <Card key={categoria} className="h-fit">
            <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
              <CardTitle 
                className="text-center text-lg"
                style={{ color: getCategoriaColor(categoria) }}
              >
                {categoria}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {servicos
                .filter(s => s.categoria === categoria)
                .map((servico) => (
                  <div 
                    key={servico.id} 
                    className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-gray-900">{servico.nome}</h4>
                      <span 
                        className="font-bold text-lg"
                        style={{ color: getCategoriaColor(categoria) }}
                      >
                        {formatCurrency(servico.valor)}
                      </span>
                    </div>
                    {servico.descricao && (
                      <p className="text-sm text-gray-600">{servico.descricao}</p>
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>Ações da Listagem</CardTitle>
          <CardDescription>Opções para gerenciar sua listagem de serviços</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button 
              style={{ backgroundColor: '#7B539D', color: 'white' }}
              className="hover:opacity-90"
            >
              Imprimir Cardápio
            </Button>
            <Button 
              variant="outline"
              style={{ borderColor: '#D2B360', color: '#D2B360' }}
              className="hover:bg-yellow-50"
            >
              Exportar PDF
            </Button>
            <Button 
              variant="outline"
              style={{ borderColor: '#522A71', color: '#522A71' }}
              className="hover:bg-purple-50"
            >
              Compartilhar WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold" style={{ color: '#31144A' }}>
                Valor médio dos serviços
              </h3>
              <p className="text-sm text-gray-600">
                Baseado em {servicos.length} serviços cadastrados
              </p>
            </div>
            <div className="text-right">
              <div 
                className="text-2xl font-bold"
                style={{ color: '#D2B360' }}
              >
                {formatCurrency(servicos.reduce((acc, s) => acc + s.valor, 0) / servicos.length || 0)}
              </div>
              <div className="text-sm text-gray-600">por serviço</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Listagem;
