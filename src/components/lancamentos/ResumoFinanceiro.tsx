
import { Card, CardContent } from "@/components/ui/card";
import { ResumoFinanceiro as IResumoFinanceiro } from "@/types/lancamentos";

interface ResumoFinanceiroProps {
  resumo: IResumoFinanceiro;
}

export const ResumoFinanceiro = ({ resumo }: ResumoFinanceiroProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="border-l-4 border-l-green-500" style={{ borderLeftColor: '#D2B360' }}>
        <CardContent className="p-4">
          <div className="text-sm font-medium text-gray-600">Entradas</div>
          <div className="text-2xl font-bold text-green-600" style={{ color: '#D2B360' }}>
            {formatCurrency(resumo.entradas)}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500" style={{ borderLeftColor: '#522A71' }}>
        <CardContent className="p-4">
          <div className="text-sm font-medium text-gray-600">Saídas</div>
          <div className="text-2xl font-bold text-red-600" style={{ color: '#522A71' }}>
            {formatCurrency(resumo.saidas)}
          </div>
        </CardContent>
      </Card>

      <Card className={`border-l-4 ${resumo.saldo >= 0 ? 'border-l-blue-500' : 'border-l-red-500'}`} style={{ borderLeftColor: resumo.saldo >= 0 ? '#7B539D' : '#522A71' }}>
        <CardContent className="p-4">
          <div className="text-sm font-medium text-gray-600">Saldo</div>
          <div 
            className={`text-2xl font-bold ${resumo.saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`}
            style={{ color: resumo.saldo >= 0 ? '#7B539D' : '#522A71' }}
          >
            {formatCurrency(resumo.saldo)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
