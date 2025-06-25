
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLancamentos } from "@/hooks/useLancamentos";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const Relatorios = () => {
  const { lancamentos } = useLancamentos();
  const [periodo, setPeriodo] = useState("mes-atual");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const getPeriodoData = () => {
    const hoje = new Date();
    
    switch (periodo) {
      case "mes-atual":
        return { inicio: startOfMonth(hoje), fim: endOfMonth(hoje) };
      case "ano-atual":
        return { inicio: startOfYear(hoje), fim: endOfYear(hoje) };
      case "personalizado":
        return { 
          inicio: dataInicio ? new Date(dataInicio) : startOfMonth(hoje),
          fim: dataFim ? new Date(dataFim) : endOfMonth(hoje)
        };
      default:
        return { inicio: startOfMonth(hoje), fim: endOfMonth(hoje) };
    }
  };

  const { inicio, fim } = getPeriodoData();
  
  const lancamentosFiltrados = lancamentos.filter(l => {
    const dataLancamento = new Date(l.data);
    return dataLancamento >= inicio && dataLancamento <= fim;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Dados para o gráfico de barras por mês com saídas separadas
  const dadosGraficoMensal = () => {
    const meses: { [key: string]: { entradas: number; saidasPessoais: number; saidasProfissionais: number } } = {};
    
    lancamentosFiltrados.forEach(l => {
      const mesAno = format(l.data, 'MM/yyyy');
      if (!meses[mesAno]) {
        meses[mesAno] = { entradas: 0, saidasPessoais: 0, saidasProfissionais: 0 };
      }
      
      if (l.tipo === 'Entrada') {
        meses[mesAno].entradas += l.valor;
      } else if (l.tipo === 'Saída') {
        if (l.categoria === 'Pessoal') {
          meses[mesAno].saidasPessoais += l.valor;
        } else {
          meses[mesAno].saidasProfissionais += l.valor;
        }
      }
    });

    return Object.entries(meses).map(([mes, dados]) => ({
      mes,
      entradas: dados.entradas,
      saidasPessoais: dados.saidasPessoais,
      saidasProfissionais: dados.saidasProfissionais
    }));
  };

  const totalEntradas = lancamentosFiltrados
    .filter(l => l.tipo === 'Entrada')
    .reduce((acc, l) => acc + l.valor, 0);

  const totalSaidasPessoais = lancamentosFiltrados
    .filter(l => l.tipo === 'Saída' && l.categoria === 'Pessoal')
    .reduce((acc, l) => acc + l.valor, 0);

  const totalSaidasProfissionais = lancamentosFiltrados
    .filter(l => l.tipo === 'Saída' && l.categoria === 'Profissional')
    .reduce((acc, l) => acc + l.valor, 0);

  const totalSaidas = totalSaidasPessoais + totalSaidasProfissionais;
  const saldoPeriodo = totalEntradas - totalSaidas;

  const handleImprimir = () => {
    window.print();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>Filtros do Relatório</CardTitle>
          <CardDescription>Selecione o período para análise</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="periodo">Período</Label>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes-atual">Mês Atual</SelectItem>
                  <SelectItem value="ano-atual">Ano Atual</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {periodo === "personalizado" && (
              <>
                <div>
                  <Label htmlFor="dataInicio">Data Início</Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="dataFim">Data Fim</Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4" style={{ borderLeftColor: '#D2B360' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Entradas</div>
            <div className="text-2xl font-bold" style={{ color: '#D2B360' }}>
              {formatCurrency(totalEntradas)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#522A71' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Saídas Pessoais</div>
            <div className="text-2xl font-bold" style={{ color: '#522A71' }}>
              {formatCurrency(totalSaidasPessoais)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#7B539D' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Saídas Profissionais</div>
            <div className="text-2xl font-bold" style={{ color: '#7B539D' }}>
              {formatCurrency(totalSaidasProfissionais)}
            </div>
          </CardContent>
        </Card>

        <Card className={`border-l-4`} style={{ borderLeftColor: saldoPeriodo >= 0 ? '#4CAF50' : '#F44336' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Saldo do Período</div>
            <div 
              className="text-2xl font-bold"
              style={{ color: saldoPeriodo >= 0 ? '#4CAF50' : '#F44336' }}
            >
              {formatCurrency(saldoPeriodo)}
            </div>
          </CardContent>
        </Card>
      </div>

      {dadosGraficoMensal().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#31144A' }}>Evolução Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dadosGraficoMensal()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="entradas" fill="#D2B360" name="Entradas" />
                <Bar dataKey="saidasPessoais" fill="#522A71" name="Saídas Pessoais" />
                <Bar dataKey="saidasProfissionais" fill="#7B539D" name="Saídas Profissionais" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>Ações do Relatório</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleImprimir}
              style={{ backgroundColor: '#7B539D', color: 'white' }}
              className="hover:opacity-90"
            >
              Imprimir Relatório
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
              Exportar Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {lancamentosFiltrados.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">
              Nenhum lançamento encontrado para o período selecionado.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Relatorios;
