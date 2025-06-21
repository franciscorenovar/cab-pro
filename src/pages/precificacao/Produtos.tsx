
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  valor: number;
  tipo: string;
  custoAplicacao: number;
}

const Produtos = () => {
  const { toast } = useToast();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    valor: '',
    tipo: ''
  });

  const tiposProduto = [
    { value: 'ampola', label: 'Ampola', divisor: 1 },
    { value: 'frasco', label: 'Frasco', divisor: 10 },
    { value: 'pote', label: 'Pote', divisor: 20 },
    { value: 'tubo', label: 'Tubo', divisor: 15 }
  ];

  const calcularCustoAplicacao = (quantidade: number, valor: number, tipo: string) => {
    const tipoInfo = tiposProduto.find(t => t.value === tipo);
    if (!tipoInfo) return 0;
    
    const base = quantidade / tipoInfo.divisor;
    return valor / base;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.quantidade || !formData.valor || !formData.tipo) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const custoAplicacao = calcularCustoAplicacao(
      Number(formData.quantidade),
      Number(formData.valor),
      formData.tipo
    );

    const novoProduto: Produto = {
      id: Date.now().toString(),
      nome: formData.nome,
      quantidade: Number(formData.quantidade),
      valor: Number(formData.valor),
      tipo: formData.tipo,
      custoAplicacao
    };

    setProdutos([...produtos, novoProduto]);
    setFormData({ nome: '', quantidade: '', valor: '', tipo: '' });
    
    toast({
      title: "Sucesso",
      description: "Produto adicionado com sucesso!"
    });
  };

  const excluirProduto = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id));
    toast({
      title: "Sucesso",
      description: "Produto excluído com sucesso!"
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#31144A' }}>
          Produtos
        </h2>
        <p className="text-gray-600">
          Cadastre seus produtos e calcule o custo por aplicação
        </p>
      </div>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>Novo Produto</CardTitle>
          <CardDescription>Adicione um novo produto ao seu estoque</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome do Produto</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Shampoo Hydra"
                />
              </div>

              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposProduto.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  placeholder="Ex: 500"
                />
              </div>

              <div>
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  placeholder="0,00"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              style={{ backgroundColor: '#7B539D', color: 'white' }}
              className="hover:opacity-90"
            >
              Adicionar Produto
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>
            Produtos Cadastrados ({produtos.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {produtos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum produto cadastrado. Adicione seu primeiro produto acima.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow style={{ backgroundColor: '#F2F2F2' }}>
                  <TableHead>Produto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Custo/Aplicação</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtos.map((produto) => (
                  <TableRow key={produto.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{produto.nome}</TableCell>
                    <TableCell>{tiposProduto.find(t => t.value === produto.tipo)?.label}</TableCell>
                    <TableCell>{produto.quantidade}</TableCell>
                    <TableCell>{formatCurrency(produto.valor)}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {formatCurrency(produto.custoAplicacao)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => excluirProduto(produto.id)}
                        style={{ borderColor: '#522A71', color: '#522A71' }}
                        className="hover:bg-red-50"
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Produtos;
