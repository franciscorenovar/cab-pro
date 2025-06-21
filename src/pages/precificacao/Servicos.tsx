
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Servico {
  id: string;
  nome: string;
  produtos: string[];
  tamanho: string;
  horas: number;
  margem: number;
  custoTotal: number;
  valorFinal: number;
}

const Servicos = () => {
  const { toast } = useToast();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    produtos: [] as string[],
    tamanho: '',
    horas: '',
    margem: ''
  });

  // Mock de produtos disponíveis - em uma implementação real, viria do estado global
  const produtosDisponiveis = [
    { id: '1', nome: 'Shampoo Hydra', custoAplicacao: 2.50 },
    { id: '2', nome: 'Condicionador Repair', custoAplicacao: 3.00 },
    { id: '3', nome: 'Máscara Intense', custoAplicacao: 8.00 },
    { id: '4', nome: 'Ampola Reconstrução', custoAplicacao: 15.00 },
    { id: '5', nome: 'Óleo Finalizador', custoAplicacao: 4.50 },
    { id: '6', nome: 'Spray Protetor', custoAplicacao: 1.80 }
  ];

  const fatoresTamanho = {
    'P': { label: 'Pequeno', fator: 1 },
    'M': { label: 'Médio', fator: 2 },
    'G': { label: 'Grande', fator: 3 },
    'GG': { label: 'Muito Grande', fator: 4 }
  };

  // Mock do valor/hora dos custos fixos - em uma implementação real, viria do estado global
  const valorHora = 15.50;

  const calcularServico = () => {
    if (!formData.nome || formData.produtos.length === 0 || !formData.tamanho || !formData.horas || !formData.margem) {
      return { custoTotal: 0, valorFinal: 0 };
    }

    const custoProdutos = formData.produtos.reduce((acc, produtoId) => {
      const produto = produtosDisponiveis.find(p => p.id === produtoId);
      return acc + (produto?.custoAplicacao || 0);
    }, 0);

    const fator = fatoresTamanho[formData.tamanho as keyof typeof fatoresTamanho]?.fator || 1;
    const custoMaoDeObra = valorHora * Number(formData.horas);
    const custoTotal = (custoProdutos * fator) + custoMaoDeObra;
    const lucro = custoTotal * (Number(formData.margem) / 100);
    const valorFinal = custoTotal + lucro;

    return { custoTotal, valorFinal };
  };

  const handleProdutoChange = (produtoId: string, checked: boolean) => {
    if (checked && formData.produtos.length >= 6) {
      toast({
        title: "Limite atingido",
        description: "Máximo de 6 produtos por serviço.",
        variant: "destructive"
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      produtos: checked 
        ? [...prev.produtos, produtoId]
        : prev.produtos.filter(id => id !== produtoId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || formData.produtos.length === 0 || !formData.tamanho || !formData.horas || !formData.margem) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const { custoTotal, valorFinal } = calcularServico();

    const novoServico: Servico = {
      id: Date.now().toString(),
      nome: formData.nome,
      produtos: formData.produtos,
      tamanho: formData.tamanho,
      horas: Number(formData.horas),
      margem: Number(formData.margem),
      custoTotal,
      valorFinal
    };

    setServicos([...servicos, novoServico]);
    setFormData({
      nome: '',
      produtos: [],
      tamanho: '',
      horas: '',
      margem: ''
    });
    
    toast({
      title: "Sucesso",
      description: "Serviço adicionado com sucesso!"
    });
  };

  const excluirServico = (id: string) => {
    setServicos(servicos.filter(s => s.id !== id));
    toast({
      title: "Sucesso",
      description: "Serviço excluído com sucesso!"
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const { custoTotal, valorFinal } = calcularServico();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#31144A' }}>
          Serviços
        </h2>
        <p className="text-gray-600">
          Configure seus serviços com produtos, tempo e margem de lucro
        </p>
      </div>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>Novo Serviço</CardTitle>
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
              <Label className="text-base font-medium">Produtos (máximo 6)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {produtosDisponiveis.map((produto) => (
                  <div key={produto.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`produto-${produto.id}`}
                      checked={formData.produtos.includes(produto.id)}
                      onCheckedChange={(checked) => handleProdutoChange(produto.id, checked as boolean)}
                    />
                    <Label htmlFor={`produto-${produto.id}`} className="text-sm">
                      {produto.nome} ({formatCurrency(produto.custoAplicacao)})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="tamanho">Tamanho do Cabelo</Label>
                <Select value={formData.tamanho} onValueChange={(value) => setFormData({ ...formData, tamanho: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(fatoresTamanho).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label} ({key})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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

            {custoTotal > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">Custo Total:</span>
                  <div className="text-lg font-semibold" style={{ color: '#522A71' }}>
                    {formatCurrency(custoTotal)}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Valor Final:</span>
                  <div className="text-xl font-bold" style={{ color: '#D2B360' }}>
                    {formatCurrency(valorFinal)}
                  </div>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              style={{ backgroundColor: '#7B539D', color: 'white' }}
              className="hover:opacity-90"
            >
              Adicionar Serviço
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>
            Serviços Cadastrados ({servicos.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {servicos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Nenhum serviço cadastrado. Adicione seu primeiro serviço acima.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicos.map((servico) => (
                <Card key={servico.id} className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg" style={{ color: '#31144A' }}>
                      {servico.nome}
                    </CardTitle>
                    <CardDescription>
                      Tamanho {servico.tamanho} • {servico.horas}h • {servico.margem}% lucro
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        Produtos: {servico.produtos.length}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Custo:</span>
                        <span className="font-medium">{formatCurrency(servico.custoTotal)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Valor:</span>
                        <span className="font-bold text-lg" style={{ color: '#D2B360' }}>
                          {formatCurrency(servico.valorFinal)}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => excluirServico(servico.id)}
                        className="w-full mt-2"
                        style={{ borderColor: '#522A71', color: '#522A71' }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Servicos;
