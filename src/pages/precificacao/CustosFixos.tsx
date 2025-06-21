
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CustoFixo {
  id: string;
  nome: string;
  valor: number;
  isPredefinido: boolean;
}

const CustosFixos = () => {
  const { toast } = useToast();
  const [custos, setCustos] = useState<CustoFixo[]>([]);
  const [novoItem, setNovoItem] = useState({ nome: '', valor: '' });

  const custosPredefinidos = [
    { id: 'agua', nome: 'Água', valor: 0 },
    { id: 'energia', nome: 'Energia Elétrica', valor: 0 },
    { id: 'gas', nome: 'Gás', valor: 0 },
    { id: 'internet', nome: 'Internet', valor: 0 },
    { id: 'aluguel', nome: 'Aluguel', valor: 0 },
    { id: 'telefone', nome: 'Telefone', valor: 0 }
  ];

  useEffect(() => {
    const savedCustos = localStorage.getItem('cabpro-custos-fixos');
    if (savedCustos) {
      setCustos(JSON.parse(savedCustos));
    } else {
      const custosIniciais = custosPredefinidos.map(c => ({ ...c, isPredefinido: true }));
      setCustos(custosIniciais);
    }
  }, []);

  const saveCustos = (newCustos: CustoFixo[]) => {
    localStorage.setItem('cabpro-custos-fixos', JSON.stringify(newCustos));
    setCustos(newCustos);
  };

  const atualizarValor = (id: string, valor: number) => {
    const novosCustos = custos.map(c => 
      c.id === id ? { ...c, valor } : c
    );
    saveCustos(novosCustos);
  };

  const adicionarItem = () => {
    if (!novoItem.nome || !novoItem.valor) {
      toast({
        title: "Erro",
        description: "Por favor, preencha nome e valor.",
        variant: "destructive"
      });
      return;
    }

    const novoCusto: CustoFixo = {
      id: Date.now().toString(),
      nome: novoItem.nome,
      valor: Number(novoItem.valor),
      isPredefinido: false
    };

    saveCustos([...custos, novoCusto]);
    setNovoItem({ nome: '', valor: '' });
    
    toast({
      title: "Sucesso",
      description: "Item adicionado com sucesso!"
    });
  };

  const removerItem = (id: string) => {
    const novosCustos = custos.filter(c => c.id !== id);
    saveCustos(novosCustos);
    
    toast({
      title: "Sucesso",
      description: "Item removido com sucesso!"
    });
  };

  const totalCustos = custos.reduce((acc, c) => acc + c.valor, 0);
  const valorHora = totalCustos / 22 / 8; // 22 dias úteis, 8 horas/dia
  const valorDia = totalCustos / 22;

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
          Custos Fixos
        </h2>
        <p className="text-gray-600">
          Gerencie seus custos fixos mensais e calcule o valor/hora
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4" style={{ borderLeftColor: '#D2B360' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Mensal</div>
            <div className="text-2xl font-bold" style={{ color: '#D2B360' }}>
              {formatCurrency(totalCustos)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#7B539D' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Valor/Dia</div>
            <div className="text-2xl font-bold" style={{ color: '#7B539D' }}>
              {formatCurrency(valorDia)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#522A71' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Valor/Hora</div>
            <div className="text-2xl font-bold" style={{ color: '#522A71' }}>
              {formatCurrency(valorHora)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }}>Custos Predefinidos</CardTitle>
            <CardDescription>Valores mensais dos custos fixos básicos</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {custos.filter(c => c.isPredefinido).map((custo) => (
              <div key={custo.id} className="flex items-center justify-between">
                <Label className="flex-1">{custo.nome}</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={custo.valor}
                  onChange={(e) => atualizarValor(custo.id, Number(e.target.value))}
                  className="w-32"
                  placeholder="0,00"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }}>Custos Extras</CardTitle>
            <CardDescription>Adicione outros custos específicos</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 mb-4">
              <div>
                <Label htmlFor="nomeItem">Nome do Item</Label>
                <Input
                  id="nomeItem"
                  value={novoItem.nome}
                  onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
                  placeholder="Ex: Seguro"
                />
              </div>
              <div>
                <Label htmlFor="valorItem">Valor Mensal</Label>
                <Input
                  id="valorItem"
                  type="number"
                  step="0.01"
                  value={novoItem.valor}
                  onChange={(e) => setNovoItem({ ...novoItem, valor: e.target.value })}
                  placeholder="0,00"
                />
              </div>
              <Button 
                onClick={adicionarItem}
                style={{ backgroundColor: '#7B539D', color: 'white' }}
                className="w-full hover:opacity-90"
              >
                Adicionar Item
              </Button>
            </div>

            {custos.filter(c => !c.isPredefinido).length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium" style={{ color: '#31144A' }}>Itens Extras:</h4>
                {custos.filter(c => !c.isPredefinido).map((custo) => (
                  <div key={custo.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>{custo.nome}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{formatCurrency(custo.valor)}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removerItem(custo.id)}
                        style={{ borderColor: '#522A71', color: '#522A71' }}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustosFixos;
