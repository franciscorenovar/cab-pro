
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLancamentos } from "@/hooks/useLancamentos";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

  // Dados para o gráfico de barras por mês
  const dadosGraficoMensal = () => {
    const meses: { [key: string]: { entradas: number; saidas: number } } = {};
    
    lancamentosFiltrados.forEach(l => {
      const mesAno = format(l.data, 'MM/yyyy');
      if (!meses[mesAno]) {
        meses[mesAno] = { entradas: 0, saidas: 0 };
      }
      
      if (l.tipo === 'Entrada') {
        meses[mesAno].entradas += l.valor;
      } else {
        meses[mesAno].saidas += l.valor;
      }
    });

    return Object.entries(meses).map(([mes, dados]) => ({
      mes,
      entradas: dados.entradas,
      saidas: dados.saidas,
      saldo: dados.entradas - dados.saidas
    }));
  };

  // Dados para o gráfico de pizza por categoria
  const dadosGraficoPizza = () => {
    const categorias: { [key: string]: number } = {};
    
    lancamentosFiltrados.forEach(l => {
      if (!categorias[l.categoria]) {
        categorias[l.categoria] = 0;
      }
      categorias[l.categoria] += l.valor;
    });

    return Object.entries(categorias).map(([categoria, valor]) => ({
      name: categoria,
      value: valor
    }));
  };

  // Dados para o gráfico por forma de pagamento
  const dadosFormasPagamento = () => {
    const formas: { [key: string]: number } = {};
    
    lancamentosFiltrados.forEach(l => {
      if (!formas[l.formaPagamento]) {
        formas[l.formaPagamento] = 0;
      }
      formas[l.formaPagamento] += l.valor;
    });

    return Object.entries(formas).map(([forma, valor]) => ({
      name: forma,
      value: valor
    }));
  };

  const totalEntradas = lancamentosFiltrados
    .filter(l => l.tipo === 'Entrada')
    .reduce((acc, l) => acc + l.valor, 0);

  const totalSaidas = lancamentosFiltrados
    .filter(l => l.tipo === 'Saída')
    .reduce((acc, l) => acc + l.valor, 0);

  const saldoPeriodo = totalEntradas - totalSaidas;

  const coresPizza = ['#D2B360', '#7B539D', '#522A71', '#31144A'];

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#31144A' }}>
          Relatórios Financeiros
        </h2>
        <p className="text-gray-600">
          Análise detalhada das suas movimentações financeiras
        </p>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4" style={{ borderLeftColor: '#D2B360' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Entradas</div>
            <div className="text-2xl font-bold" style={{ color: '#D2B360' }}>
              {formatCurrency(totalEntradas)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#522A71' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Saídas</div>
            <div className="text-2xl font-bold" style={{ color: '#522A71' }}>
              {formatCurrency(totalSaidas)}
            </div>
          </CardContent>
        </Card>

        <Card className={`border-l-4`} style={{ borderLeftColor: saldoPeriodo >= 0 ? '#7B539D' : '#522A71' }}>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Saldo do Período</div>
            <div 
              className="text-2xl font-bold"
              style={{ color: saldoPeriodo >= 0 ? '#7B539D' : '#522A71' }}
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGraficoMensal()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="entradas" fill="#D2B360" name="Entradas" />
                <Bar dataKey="saidas" fill="#522A71" name="Saídas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dadosGraficoPizza().length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dadosGraficoPizza()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosGraficoPizza().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={coresPizza[index % coresPizza.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {dadosFormasPagamento().length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#31144A' }}>Por Forma de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dadosFormasPagamento()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosFormasPagamento().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={coresPizza[index % coresPizza.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

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
