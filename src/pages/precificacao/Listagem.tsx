
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Copy, Trash2 } from "lucide-react";

interface ServicoListagem {
  id: string;
  nome: string;
  produtos: string[];
  valores: {
    P: number;
    M: number;
    G: number;
    GG: number;
  };
}

const Listagem = () => {
  const [servicos, setServicos] = useState<ServicoListagem[]>([]);
  const [imprimirSemPreco, setImprimirSemPreco] = useState(false);

  // Mock de dados - em uma implementação real, viria do estado global dos serviços
  useEffect(() => {
    const servicosMock: ServicoListagem[] = [
      {
        id: '1',
        nome: 'Hidratação Simples',
        produtos: ['Shampoo Hydra', 'Máscara Intense'],
        valores: { P: 35.00, M: 45.00, G: 55.00, GG: 65.00 }
      },
      {
        id: '2',
        nome: 'Reconstrução Capilar',
        produtos: ['Shampoo Repair', 'Ampola Reconstrução', 'Condicionador Repair'],
        valores: { P: 65.00, M: 85.00, G: 105.00, GG: 125.00 }
      },
      {
        id: '3',
        nome: 'Progressiva Premium',
        produtos: ['Progressiva Premium', 'Shampoo Hydra'],
        valores: { P: 80.00, M: 120.00, G: 160.00, GG: 200.00 }
      },
      {
        id: '4',
        nome: 'Corte + Escova',
        produtos: ['Shampoo Hydra', 'Óleo Finalizador'],
        valores: { P: 25.00, M: 35.00, G: 45.00, GG: 55.00 }
      },
      {
        id: '5',
        nome: 'Coloração Completa',
        produtos: ['Coloração', 'Shampoo Hydra', 'Condicionador Repair'],
        valores: { P: 75.00, M: 95.00, G: 115.00, GG: 135.00 }
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

  const editarServico = (id: string) => {
    console.log('Editar serviço:', id);
    // Implementar navegação para edição
  };

  const duplicarServico = (servico: ServicoListagem) => {
    const novoServico = {
      ...servico,
      id: Date.now().toString(),
      nome: `${servico.nome} (Cópia)`
    };
    setServicos([...servicos, novoServico]);
  };

  const excluirServico = (id: string) => {
    setServicos(servicos.filter(s => s.id !== id));
  };

  const imprimirCardapio = () => {
    const conteudo = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #31144A; margin-bottom: 30px;">Cardápio de Serviços</h1>
        ${servicos.map(servico => `
          <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 15px;">
            <h3 style="color: #31144A; margin-bottom: 5px;">${servico.nome}</h3>
            <p style="color: #666; margin-bottom: 10px;">${servico.produtos.join(', ')}</p>
            ${!imprimirSemPreco ? `
              <div style="display: flex; gap: 15px;">
                <span>P: ${formatCurrency(servico.valores.P)}</span>
                <span>M: ${formatCurrency(servico.valores.M)}</span>
                <span>G: ${formatCurrency(servico.valores.G)}</span>
                <span>GG: ${formatCurrency(servico.valores.GG)}</span>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;

    const janela = window.open('', '_blank');
    if (janela) {
      janela.document.write(conteudo);
      janela.document.close();
      janela.print();
    }
  };

  const exportarPDF = () => {
    console.log('Exportar PDF');
    // Implementar exportação PDF
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {servicos.map((servico) => (
          <Card key={servico.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold" style={{ color: '#31144A' }}>
                  {servico.nome}
                </h3>
                
                <p className="text-sm text-gray-600">
                  {servico.produtos.join(', ')}
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex gap-4 text-sm">
                    <span><strong>P:</strong> {formatCurrency(servico.valores.P)}</span>
                    <span><strong>M:</strong> {formatCurrency(servico.valores.M)}</span>
                    <span><strong>G:</strong> {formatCurrency(servico.valores.G)}</span>
                    <span><strong>GG:</strong> {formatCurrency(servico.valores.GG)}</span>
                  </div>
                  
                  <div className="flex gap-2 ml-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editarServico(servico.id)}
                      style={{ borderColor: '#7B539D', color: '#7B539D' }}
                      className="hover:bg-purple-50"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => duplicarServico(servico)}
                      style={{ borderColor: '#D2B360', color: '#D2B360' }}
                      className="hover:bg-yellow-50"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => excluirServico(servico.id)}
                      style={{ borderColor: '#522A71', color: '#522A71' }}
                      className="hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>Ações da Listagem</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="semPreco"
                checked={imprimirSemPreco}
                onCheckedChange={(checked) => setImprimirSemPreco(checked as boolean)}
              />
              <label 
                htmlFor="semPreco" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Imprimir sem preços
              </label>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={imprimirCardapio}
                style={{ backgroundColor: '#7B539D', color: 'white' }}
                className="hover:opacity-90"
              >
                Imprimir Cardápio
              </Button>
              <Button 
                onClick={exportarPDF}
                variant="outline"
                style={{ borderColor: '#D2B360', color: '#D2B360' }}
                className="hover:bg-yellow-50"
              >
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Listagem;
