
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Upload, Edit } from "lucide-react";

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
  const [editingId, setEditingId] = useState<string | null>(null);

  const tiposProduto = [
    { value: 'kit-tratamento', label: 'Kit Tratamento', divisor: 15 },
    { value: 'quimica', label: 'Química', divisor: 50 },
    { value: 'finalizador', label: 'Finalizador', divisor: 10 },
    { value: 'shampoo', label: 'Shampoo', divisor: 15 },
    { value: 'cond-masc-protei', label: 'Cond. Masc. Protei', divisor: 15 },
    { value: 'po', label: 'Pó', divisor: 50 },
    { value: 'ox', label: 'Ox', divisor: 100 },
    { value: 'coloracao', label: 'Coloração', divisor: 1 },
    { value: 'outros', label: 'Outros', divisor: 1 }
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

    if (editingId) {
      setProdutos(produtos.map(p => 
        p.id === editingId 
          ? {
              ...p,
              nome: formData.nome,
              quantidade: Number(formData.quantidade),
              valor: Number(formData.valor),
              tipo: formData.tipo,
              custoAplicacao
            }
          : p
      ));
      setEditingId(null);
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso!"
      });
    } else {
      const novoProduto: Produto = {
        id: Date.now().toString(),
        nome: formData.nome,
        quantidade: Number(formData.quantidade),
        valor: Number(formData.valor),
        tipo: formData.tipo,
        custoAplicacao
      };

      setProdutos([...produtos, novoProduto]);
      toast({
        title: "Sucesso",
        description: "Produto adicionado com sucesso!"
      });
    }

    setFormData({ nome: '', quantidade: '', valor: '', tipo: '' });
  };

  const editarProduto = (produto: Produto) => {
    setFormData({
      nome: produto.nome,
      quantidade: produto.quantidade.toString(),
      valor: produto.valor.toString(),
      tipo: produto.tipo
    });
    setEditingId(produto.id);
  };

  const excluirProduto = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id));
    toast({
      title: "Sucesso",
      description: "Produto excluído com sucesso!"
    });
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const header = lines[0].split(',');
      
      const novosProdutos: Produto[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= 4) {
          const nome = values[0]?.trim();
          const tipo = values[1]?.trim();
          const quantidade = Number(values[2]?.trim());
          const valor = Number(values[3]?.trim());
          
          if (nome && tipo && quantidade && valor) {
            const custoAplicacao = calcularCustoAplicacao(quantidade, valor, tipo);
            novosProdutos.push({
              id: Date.now().toString() + i,
              nome,
              tipo,
              quantidade,
              valor,
              custoAplicacao
            });
          }
        }
      }
      
      setProdutos([...produtos, ...novosProdutos]);
      toast({
        title: "Sucesso",
        description: `${novosProdutos.length} produtos importados com sucesso!`
      });
    };
    
    reader.readAsText(file);
    event.target.value = '';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>
            {editingId ? 'Editar Produto' : 'Novo Produto'}
          </CardTitle>
          <CardDescription>
            {editingId ? 'Edite os dados do produto' : 'Adicione um novo produto ao seu estoque'}
          </CardDescription>
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
                  placeholder="Ex: Progressiva Premium"
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
                  placeholder="Ex: 1000"
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
                  placeholder="300,00"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                type="submit" 
                style={{ backgroundColor: '#7B539D', color: 'white' }}
                className="hover:opacity-90"
              >
                {editingId ? 'Atualizar Produto' : 'Adicionar Produto'}
              </Button>
              
              {editingId && (
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ nome: '', quantidade: '', valor: '', tipo: '' });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>

          <div className="mt-4 pt-4 border-t">
            <Label htmlFor="csv-import" className="block mb-2">Importar Planilha CSV</Label>
            <div className="flex items-center gap-2">
              <Input
                id="csv-import"
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('csv-import')?.click()}
                style={{ borderColor: '#D2B360', color: '#D2B360' }}
                className="hover:bg-yellow-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
              <span className="text-sm text-gray-500">
                Formato: Nome,Tipo,Quantidade,Valor
              </span>
            </div>
          </div>
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
                      <div className="flex gap-1 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editarProduto(produto)}
                          style={{ borderColor: '#7B539D', color: '#7B539D' }}
                          className="hover:bg-purple-50"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => excluirProduto(produto.id)}
                          style={{ borderColor: '#522A71', color: '#522A71' }}
                          className="hover:bg-red-50"
                        >
                          Excluir
                        </Button>
                      </div>
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
