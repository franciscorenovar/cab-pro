
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Slot } from "../AgendamentoModerno";

interface GradeHorariosProps {
  slots: Slot[];
  onSelecionarSlot: (slot: Slot) => void;
  modoVisualizacao: 'cliente' | 'profissional';
  onAlterarStatusSlot?: (slotId: string, novoStatus: 'bloqueado' | 'livre' | 'reservado') => void;
}

const GradeHorarios = ({ slots, onSelecionarSlot, modoVisualizacao, onAlterarStatusSlot }: GradeHorariosProps) => {
  const diasUnicos = [...new Set(slots.map(slot => format(slot.data, 'yyyy-MM-dd')))];
  
  // Horários de 7:00 às 18:00 de hora em hora
  const horariosUnicos = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

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
    if (modoVisualizacao === 'cliente' && slot.status === 'livre') {
      onSelecionarSlot(slot);
    } else if (modoVisualizacao === 'profissional' && onAlterarStatusSlot) {
      const proximoStatus = slot.status === 'bloqueado' ? 'livre' : 'bloqueado';
      if (slot.status !== 'reservado') {
        onAlterarStatusSlot(slot.id, proximoStatus);
      }
    }
  };

  const adicionarMaisHorarios = () => {
    // Função para adicionar mais horários - será implementada conforme necessário
    console.log('Adicionar mais horários');
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
            {horariosUnicos.map(hora => (
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
                      className="w-20 h-12 text-xs p-1 relative border border-gray-300 rounded-none"
                      style={{ 
                        backgroundColor: getCorSlot(slot.status),
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
      <div className="flex justify-center mt-4">
        <Button
          onClick={adicionarMaisHorarios}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          style={{ borderColor: '#7B539D', color: '#7B539D' }}
        >
          <Plus size={16} />
          Adicionar mais horários
        </Button>
      </div>
    </div>
  );
};

export default GradeHorarios;
