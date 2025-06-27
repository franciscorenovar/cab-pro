
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Slot } from "../types/agenda";

interface GradeHorariosProps {
  slots: Slot[];
  onSelecionarSlot: (slot: Slot) => void;
  modoVisualizacao: 'cliente' | 'profissional';
  onAlterarStatusSlot?: (slotId: string, novoStatus: 'bloqueado' | 'livre' | 'reservado') => void;
  onAdicionarHorario?: () => void;
  horariosDisponiveis: string[];
}

const GradeHorarios = ({ 
  slots, 
  onSelecionarSlot, 
  modoVisualizacao, 
  onAlterarStatusSlot, 
  onAdicionarHorario,
  horariosDisponiveis 
}: GradeHorariosProps) => {
  // Pegar dias únicos e ordenar por data
  const diasUnicos = [...new Set(slots.map(slot => format(slot.data, 'yyyy-MM-dd')))]
    .sort((a, b) => {
      const dataA = new Date(a);
      const dataB = new Date(b);
      return dataA.getTime() - dataB.getTime();
    });
  
  const diasAbreviados = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const getCorSlot = (status: Slot['status']) => {
    switch (status) {
      case 'bloqueado':
        return '#FFB8BA'; // Rosa pastel
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
    console.log('Clicou no slot:', slot.id, 'Status atual:', slot.status);
    
    if (modoVisualizacao === 'cliente' && slot.status === 'livre') {
      onSelecionarSlot(slot);
    } else if (modoVisualizacao === 'profissional' && onAlterarStatusSlot) {
      if (slot.status !== 'reservado') {
        const proximoStatus = slot.status === 'bloqueado' ? 'livre' : 'bloqueado';
        console.log('Mudando status para:', proximoStatus);
        onAlterarStatusSlot(slot.id, proximoStatus);
      }
    }
  };

  return (
    <div className="relative">
      {/* Container com scroll e headers fixos */}
      <div className="overflow-auto max-h-96 border rounded-lg">
        <div className="relative">
          {/* Grid principal */}
          <div className="grid gap-0 border-collapse" style={{ gridTemplateColumns: `80px repeat(${diasUnicos.length}, 80px)` }}>
            {/* Header fixo com dias - canto superior esquerdo vazio */}
            <div className="sticky top-0 left-0 z-20 bg-gray-50 border-b border-r p-2 text-center font-medium text-sm">
              
            </div>
            {/* Headers dos dias */}
            {diasUnicos.map(dia => {
              const dataObj = new Date(dia);
              const diaSemana = diasAbreviados[dataObj.getDay()];
              return (
                <div key={dia} className="sticky top-0 z-10 bg-gray-50 border-b p-2 text-center font-medium text-sm">
                  <div className="font-semibold">{diaSemana}</div>
                  <div className="text-xs text-gray-500">{format(dataObj, 'dd/MM')}</div>
                </div>
              );
            })}

            {/* Grid de horários */}
            {horariosDisponiveis.map(hora => (
              <>
                {/* Header de hora fixo à esquerda */}
                <div key={`hora-${hora}`} className="sticky left-0 z-10 bg-gray-50 border-r p-2 text-center font-medium text-sm">
                  {hora}
                </div>
                {/* Slots para cada dia */}
                {diasUnicos.map(dia => {
                  const slot = getSlot(dia, hora);
                  if (!slot) {
                    return (
                      <div key={`${dia}-${hora}`} className="w-20 h-12 border border-gray-200 bg-gray-100"></div>
                    );
                  }

                  return (
                    <Button
                      key={slot.id}
                      variant="outline"
                      size="sm"
                      className="w-20 h-12 text-xs p-1 relative border border-gray-300 rounded-none hover:opacity-80"
                      style={{ 
                        backgroundColor: slot.status === 'reservado' ? '#B8FFB8' : getCorSlot(slot.status),
                        borderColor: '#d1d5db',
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

      {/* Botão de adicionar mais horários */}
      {modoVisualizacao === 'profissional' && onAdicionarHorario && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={onAdicionarHorario}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            style={{ borderColor: '#7B539D', color: '#7B539D' }}
          >
            <Plus size={16} />
            Adicionar mais horários
          </Button>
        </div>
      )}
    </div>
  );
};

export default GradeHorarios;
