
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lancamento } from "@/types/lancamentos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ListaLancamentosProps {
  lancamentos: Lancamento[];
  onEdit: (lancamento: Lancamento) => void;
  onDelete: (id: string) => void;
}

export const ListaLancamentos = ({ lancamentos, onEdit, onDelete }: ListaLancamentosProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  const getFormaPagamentoLabel = (forma: string) => {
    const labels: { [key: string]: string } = {
      'CC': 'Cartão de Crédito',
      'CD': 'Cartão de Débito',
      'Crédito Loja': 'Crédito Loja',
      'Pix': 'Pix',
      'Dinheiro': 'Dinheiro'
    };
    return labels[forma] || forma;
  };

  // Ordenar por data mais recente
  const lancamentosOrdenados = [...lancamentos].sort((a, b) => 
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <Card>
      <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
        <CardTitle style={{ color: '#31144A' }}>
          Histórico de Lançamentos ({lancamentos.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {lancamentos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum lançamento encontrado. Adicione seu primeiro lançamento acima.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ backgroundColor: '#F2F2F2' }}>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lancamentosOrdenados.map((lancamento) => (
                  <TableRow key={lancamento.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {formatDate(lancamento.data)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lancamento.tipo === 'Entrada'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {lancamento.tipo}
                      </span>
                    </TableCell>
                    <TableCell 
                      className={`font-semibold ${
                        lancamento.tipo === 'Entrada' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatCurrency(lancamento.valor)}
                    </TableCell>
                    <TableCell>{getFormaPagamentoLabel(lancamento.formaPagamento)}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: lancamento.categoria === 'Profissional' ? '#D2B360' : '#7B539D',
                          color: 'white'
                        }}
                      >
                        {lancamento.categoria}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {lancamento.descricao || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(lancamento)}
                          style={{ borderColor: '#7B539D', color: '#7B539D' }}
                          className="hover:bg-purple-50"
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDelete(lancamento.id)}
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};
