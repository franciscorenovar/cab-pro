
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Edit } from "lucide-react";

interface CustoFixo {
  id: string;
  nome: string;
  valor: number;
  isPredefinido: boolean;
}

interface ConfiguracaoTrabalho {
  diasTrabalhados: number;
  horasPorDia: number;
}

const CustosFixos = () => {
  const { toast } = useToast();
  const [custos, setCustos] = useState<CustoFixo[]>([]);
  const [novoItem, setNovoItem] = useState({ nome: '', valor: '' });
  const [configuracao, setConfiguracao] = useState<ConfiguracaoTrabalho>({
    diasTrabalhados: 22,
    horasPorDia: 8
  });
  const [editandoConfig, setEditandoConfig] = useState(false);

  const custosPredefinidos = [
    { id: 'agua', nome: 'Água', valor: 0 },
    { id: 'energia', nome: 'Energia', valor: 0 },
    { id: 'internet', nome: 'Internet', valor: 0 },
    { id: 'telefone', nome: 'Telefone', valor: 0 },
    { id: 'aluguel', nome: 'Aluguel', valor: 0 },
    { id: 'transporte', nome: 'Transporte', valor: 0 },
    { id: 'iptu', nome: 'IPTU', valor: 0 },
    { id: 'impostos', nome: 'Impostos', valor: 0 },
    { id: 'pro-labore', nome: 'Pró-Labore', valor: 0 },
    { id: 'manutencao', nome: 'Manutenção', valor: 0 }
  ];

  useEffect(() => {
    const savedCustos = localStorage.getItem('cabpro-custos-fixos');
    const savedConfig = localStorage.getItem('cabpro-config-trabalho');
    
    if (savedCustos) {
      setCustos(JSON.parse(savedCustos));
    } else {
      const custosIniciais = custosPredefinidos.map(c => ({ ...c, isPredefinido: true }));
      setCustos(custosIniciais);
    }
    
    if (savedConfig) {
      setConfiguracao(JSON.parse(savedConfig));
    }
  }, []);

  const saveCustos = (newCustos: CustoFixo[]) => {
    localStorage.setItem('cabpro-custos-fixos', JSON.stringify(newCustos));
    setCustos(newCustos);
  };

  const saveConfiguracao = (newConfig: ConfiguracaoTrabalho) => {
    localStorage.setItem('cabpro-config-trabalho', JSON.stringify(newConfig));
    setConfiguracao(newConfig);
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

  const atualizarConfiguracao = () => {
    saveConfiguracao(configuracao);
    setEditandoConfig(false);
    toast({
      title: "Sucesso",
      description: "Configuração atualizada com sucesso!"
    });
  };

  const totalCustos = custos.reduce((acc, c) => acc + c.valor, 0);
  const valorHora = totalCustos / configuracao.diasTrabalhados / configuracao.horasPorDia;
  const valorDia = totalCustos / configuracao.diasTrabalhados;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
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
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Valor/Dia</div>
                <div className="text-2xl font-bold" style={{ color: '#7B539D' }}>
                  {formatCurrency(valorDia)}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditandoConfig(true)}
                style={{ borderColor: '#7B539D', color: '#7B539D' }}
              >
                <Edit className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#522A71' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Valor/Hora</div>
            <div className="text-2xl font-bold" style={{ color: '#522A71' }}>
              {formatCurrency(valorHora)}
            </div>
            <div className="text-xs text-gray-500">
              {configuracao.diasTrabalhados}d × {configuracao.horasPorDia}h
            </div>
          </CardContent>
        </Card>
      </div>

      {editandoConfig && (
        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }}>Configurar Dias e Horas</CardTitle>
            <CardDescription>Ajuste a quantidade de dias e horas trabalhadas</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dias">Dias Trabalhados por Mês</Label>
                <Input
                  id="dias"
                  type="number"
                  value={configuracao.diasTrabalhados}
                  onChange={(e) => setConfiguracao({ ...configuracao, diasTrabalhados: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="horas">Horas por Dia</Label>
                <Input
                  id="horas"
                  type="number"
                  value={configuracao.horasPorDia}
                  onChange={(e) => setConfiguracao({ ...configuracao, horasPorDia: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={atualizarConfiguracao}
                style={{ backgroundColor: '#7B539D', color: 'white' }}
              >
                Salvar
              </Button>
              <Button 
                variant="outline"
                onClick={() => setEditandoConfig(false)}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
