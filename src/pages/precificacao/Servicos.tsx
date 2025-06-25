
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

interface Produto {
  id: string;
  nome: string;
  custoAplicacao: number;
  tipo: string;
}

interface Servico {
  id: string;
  nome: string;
  produtos: string[];
  horas: number;
  margem: number;
  valores: {
    P: number;
    M: number;
    G: number;
    GG: number;
  };
}

const Servicos = () => {
  const { toast } = useToast();
  const [servicoAtual, setServicoAtual] = useState<Servico | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    produtosSelecionados: [] as string[],
    horas: '',
    margem: ''
  });
  const [produtoSearch, setProdutoSearch] = useState('');
  const [showProdutos, setShowProdutos] = useState(false);

  // Mock de produtos - em implementação real viria do localStorage ou estado global
  const produtosDisponiveis: Produto[] = [
    { id: '1', nome: 'Progressiva Premium', custoAplicacao: 15.00, tipo: 'quimica' },
    { id: '2', nome: 'Shampoo Hydra', custoAplicacao: 2.50, tipo: 'shampoo' },
    { id: '3', nome: 'Condicionador Repair', custoAplicacao: 3.00, tipo: 'cond-masc-protei' },
    { id: '4', nome: 'Máscara Intense', custoAplicacao: 8.00, tipo: 'cond-masc-protei' },
    { id: '5', nome: 'Ampola Reconstrução', custoAplicacao: 15.00, tipo: 'kit-tratamento' },
    { id: '6', nome: 'Óleo Finalizador', custoAplicacao: 4.50, tipo: 'finalizador' }
  ].sort((a, b) => a.nome.localeCompare(b.nome));

  const fatoresTamanho = { P: 1, M: 2, G: 3, GG: 4 };
  const valorHora = 15.50; // Mock - viria do estado global dos custos fixos

  const produtosFiltrados = produtosDisponiveis.filter(p =>
    p.nome.toLowerCase().includes(produtoSearch.toLowerCase()) &&
    !formData.produtosSelecionados.includes(p.id)
  );

  const adicionarProduto = (produtoId: string) => {
    setFormData(prev => ({
      ...prev,
      produtosSelecionados: [...prev.produtosSelecionados, produtoId]
    }));
    setProdutoSearch('');
    setShowProdutos(false);
  };

  const removerProduto = (produtoId: string) => {
    setFormData(prev => ({
      ...prev,
      produtosSelecionados: prev.produtosSelecionados.filter(id => id !== produtoId)
    }));
  };

  const calcularValores = () => {
    if (formData.produtosSelecionados.length === 0 || !formData.horas || !formData.margem) {
      return { P: 0, M: 0, G: 0, GG: 0 };
    }

    const custoProdutos = formData.produtosSelecionados.reduce((acc, produtoId) => {
      const produto = produtosDisponiveis.find(p => p.id === produtoId);
      return acc + (produto?.custoAplicacao || 0);
    }, 0);

    const custoMaoDeObra = valorHora * Number(formData.horas);
    const valores = {} as { P: number; M: number; G: number; GG: number };

    Object.entries(fatoresTamanho).forEach(([tamanho, fator]) => {
      const custoTotal = (custoProdutos * fator) + custoMaoDeObra;
      const lucro = custoTotal * (Number(formData.margem) / 100);
      valores[tamanho as keyof typeof valores] = custoTotal + lucro;
    });

    return valores;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || formData.produtosSelecionados.length === 0 || !formData.horas || !formData.margem) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const valores = calcularValores();

    const novoServico: Servico = {
      id: Date.now().toString(),
      nome: formData.nome,
      produtos: formData.produtosSelecionados,
      horas: Number(formData.horas),
      margem: Number(formData.margem),
      valores
    };

    setServicoAtual(novoServico);
    setFormData({
      nome: '',
      produtosSelecionados: [],
      horas: '',
      margem: ''
    });
    
    toast({
      title: "Sucesso",
      description: "Serviço configurado com sucesso!"
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const valores = calcularValores();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>Configurar Serviço</CardTitle>
          <CardDescription>Configure um novo serviço com precificação automática</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="nome">Nome do Serviço</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Hidratação Completa"
              />
            </div>

            <div>
              <Label className="text-base font-medium">Produtos</Label>
              
              {formData.produtosSelecionados.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {formData.produtosSelecionados.map((produtoId) => {
                    const produto = produtosDisponiveis.find(p => p.id === produtoId);
                    return produto ? (
                      <Badge key={produtoId} variant="outline" className="flex items-center gap-1">
                        {produto.nome}
                        <button
                          type="button"
                          onClick={() => removerProduto(produtoId)}
                          className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}

              <div className="relative">
                <Input
                  value={produtoSearch}
                  onChange={(e) => {
                    setProdutoSearch(e.target.value);
                    setShowProdutos(true);
                  }}
                  onFocus={() => setShowProdutos(true)}
                  placeholder="Digite para pesquisar produtos..."
                />
                
                {showProdutos && produtosFiltrados.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {produtosFiltrados.map((produto) => (
                      <button
                        key={produto.id}
                        type="button"
                        onClick={() => adicionarProduto(produto.id)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                      >
                        <span>{produto.nome}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {formatCurrency(produto.custoAplicacao)}
                          </span>
                          <Plus className="w-4 h-4 text-green-600" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="horas">Horas de Trabalho</Label>
                <Input
                  id="horas"
                  type="number"
                  step="0.5"
                  value={formData.horas}
                  onChange={(e) => setFormData({ ...formData, horas: e.target.value })}
                  placeholder="Ex: 2.5"
                />
              </div>

              <div>
                <Label htmlFor="margem">Margem de Lucro (%)</Label>
                <Input
                  id="margem"
                  type="number"
                  value={formData.margem}
                  onChange={(e) => setFormData({ ...formData, margem: e.target.value })}
                  placeholder="Ex: 80"
                />
              </div>
            </div>

            {(valores.P > 0 || valores.M > 0 || valores.G > 0 || valores.GG > 0) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                {Object.entries(valores).map(([tamanho, valor]) => (
                  <div key={tamanho} className="text-center">
                    <div className="text-sm text-gray-600">Cabelo {tamanho}</div>
                    <div className="text-lg font-bold" style={{ color: '#D2B360' }}>
                      {formatCurrency(valor)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button 
              type="submit" 
              style={{ backgroundColor: '#7B539D', color: 'white' }}
              className="hover:opacity-90"
            >
              Configurar Serviço
            </Button>
          </form>
        </CardContent>
      </Card>

      {servicoAtual && (
        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }}>Serviço Atual</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold" style={{ color: '#31144A' }}>
                  {servicoAtual.nome}
                </h3>
                <p className="text-sm text-gray-600">
                  {servicoAtual.produtos.length} produtos • {servicoAtual.horas}h • {servicoAtual.margem}% lucro
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(servicoAtual.valores).map(([tamanho, valor]) => (
                  <div key={tamanho} className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">Cabelo {tamanho}</div>
                    <div className="text-xl font-bold" style={{ color: '#D2B360' }}>
                      {formatCurrency(valor)}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setServicoAtual(null)}
                variant="outline"
                style={{ borderColor: '#522A71', color: '#522A71' }}
              >
                Configurar Novo Serviço
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Servicos;
