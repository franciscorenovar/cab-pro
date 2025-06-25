
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Slot } from "../AgendamentoModerno";

interface GradeHorariosProps {
  slots: Slot[];
  onSelecionarSlot: (slot: Slot) => void;
  modoVisualizacao: 'cliente' | 'profissional';
  onAlterarStatusSlot?: (slotId: string, novoStatus: 'bloqueado' | 'livre' | 'reservado') => void;
}

const GradeHorarios = ({ slots, onSelecionarSlot, modoVisualizacao, onAlterarStatusSlot }: GradeHorariosProps) => {
  const diasUnicos = [...new Set(slots.map(slot => format(slot.data, 'yyyy-MM-dd')))];
  const horariosUnicos = [...new Set(slots.map(slot => slot.hora))].sort();

  const getCorSlot = (status: Slot['status']) => {
    switch (status) {
      case 'bloqueado':
        return '#FFB8BA'; // Vermelho pastel
      case 'livre':
        return '#B8D4FF'; // Azul pastel
      case 'reservado':
        return '#B8FFB8'; // Verde pastel
      default:
        return '#F5F5F5';
    }
  };

  const getSlot = (dia: string, hora: string) => {
    return slots.find(slot => 
      format(slot.data, 'yyyy-MM-dd') === dia && slot.hora === hora
    );
  };

  const handleClickSlot = (slot: Slot) => {
    if (modoVisualizacao === 'cliente' && slot.status === 'livre') {
      onSelecionarSlot(slot);
    } else if (modoVisualizacao === 'profissional' && onAlterarStatusSlot) {
      // Lógica para profissional alterar status
      const proximoStatus = slot.status === 'bloqueado' ? 'livre' : 'bloqueado';
      if (slot.status !== 'reservado') {
        onAlterarStatusSlot(slot.id, proximoStatus);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="grid gap-2" style={{ gridTemplateColumns: `120px repeat(${diasUnicos.length}, 1fr)` }}>
          {/* Header com dias */}
          <div></div>
          {diasUnicos.map(dia => (
            <div key={dia} className="text-center text-sm font-medium p-2">
              <div>{format(new Date(dia), 'EEE', { locale: ptBR })}</div>
              <div className="text-xs text-gray-500">{format(new Date(dia), 'dd/MM')}</div>
            </div>
          ))}

          {/* Grid de horários */}
          {horariosUnicos.map(hora => (
            <>
              <div key={`hora-${hora}`} className="text-sm font-medium p-2 text-right">
                {hora}
              </div>
              {diasUnicos.map(dia => {
                const slot = getSlot(dia, hora);
                if (!slot) return <div key={`${dia}-${hora}`}></div>;

                return (
                  <Button
                    key={slot.id}
                    variant="outline"
                    size="sm"
                    className="h-12 text-xs p-1 relative border-2"
                    style={{ 
                      backgroundColor: getCorSlot(slot.status),
                      borderColor: getCorSlot(slot.status),
                      cursor: (modoVisualizacao === 'cliente' && slot.status === 'livre') || 
                             (modoVisualizacao === 'profissional' && slot.status !== 'reservado') 
                             ? 'pointer' : 'default'
                    }}
                    onClick={() => handleClickSlot(slot)}
                    disabled={modoVisualizacao === 'cliente' && slot.status !== 'livre'}
                  >
                    {slot.status === 'reservado' && (
                      <div className="text-xs">
                        <div className="font-semibold truncate">{slot.clienteNome}</div>
                      </div>
                    )}
                  </Button>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeHorarios;
