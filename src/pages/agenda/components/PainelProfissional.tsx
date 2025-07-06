
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Slot, Reserva } from "../types/Agenda";

interface PainelProfissionalProps {
  slots: Slot[];
  reservas: Reserva[];
  onAlterarStatusSlot: (slotId: string, novoStatus: 'bloqueado' | 'livre' | 'reservado') => void;
}

const PainelProfissional = ({ slots, reservas, onAlterarStatusSlot }: PainelProfissionalProps) => {
  const reservasHoje = reservas.filter(reserva => {
    const hoje = new Date();
    return format(reserva.data, 'yyyy-MM-dd') === format(hoje, 'yyyy-MM-dd');
  });

  const proximasReservas = reservas
    .filter(reserva => reserva.data >= new Date())
    .sort((a, b) => a.data.getTime() - b.data.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Resumo do Dia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Agendamentos Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#7B539D' }}>
              {reservasHoje.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#7B539D' }}>
              {reservas.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Horários Bloqueados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#7B539D' }}>
              {slots.filter(s => s.status === 'bloqueado').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Reservas */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#31144A' }}>Próximas Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          {proximasReservas.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Nenhuma reserva encontrada.
            </p>
          ) : (
            <div className="space-y-3">
              {proximasReservas.map((reserva) => (
                <div key={reserva.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-semibold">{reserva.clienteNome}</div>
                    <div className="text-sm text-gray-600">{reserva.clienteTelefone}</div>
                    <div className="text-sm text-gray-500">{reserva.tipoServico}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {format(reserva.data, 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                    <div className="text-sm text-gray-600">{reserva.hora}</div>
                    <Badge 
                      style={{ 
                        backgroundColor: reserva.status === 'confirmado' ? '#B8FFB8' : '#FFB8BA',
                        color: '#333'
                      }}
                    >
                      {reserva.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PainelProfissional;
