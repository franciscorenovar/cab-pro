
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startOfMonth, endOfMonth, eachWeekOfInterval } from "date-fns";
import PainelProfissional from "./components/PainelProfissional";
import ConfiguracaoMesAno from "./components/ConfiguracaoMesAno";
import LinkPersonalizado from "./components/LinkPersonalizado";
import LegendaCores from "./components/LegendaCores";
import SemanaAccordion from "./components/SemanaAccordion";
import { Slot, Reserva, StatusSlot } from "./types/agenda";

const AgendamentoModerno = () => {
  const [anoSelecionado, setAnoSelecionado] = useState<string>('2025');
  const [mesSelecionado, setMesSelecionado] = useState<string>('1');
  const [linkPersonalizado] = useState('https://seuapp.com/maria');
  
  // Horários iniciais de 7:00 às 18:00
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ]);
  
  // Mock data - será substituído pela integração com Firebase
  const [slots, setSlots] = useState<Slot[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const mesAtual = new Date(parseInt(anoSelecionado), parseInt(mesSelecionado) - 1, 1);
  const inicioMes = startOfMonth(mesAtual);
  const fimMes = endOfMonth(mesAtual);
  const semanas = eachWeekOfInterval(
    { start: inicioMes, end: fimMes },
    { weekStartsOn: 1 }
  );

  const alterarStatusSlot = (slotId: string, novoStatus: StatusSlot) => {
    setSlots(slotsAtuais => {
      const slotsExistentes = slotsAtuais.map(s => 
        s.id === slotId ? { ...s, status: novoStatus } : s
      );
      
      // Se o slot não existir, criar um novo
      if (!slotsExistentes.find(s => s.id === slotId)) {
        const [dataStr, hora] = slotId.split('_');
        const novoSlot: Slot = {
          id: slotId,
          data: new Date(dataStr),
          hora,
          status: novoStatus
        };
        return [...slotsExistentes, novoSlot];
      }
      
      return slotsExistentes;
    });
  };

  const adicionarMaisHorarios = () => {
    const ultimoHorario = horariosDisponiveis[horariosDisponiveis.length - 1];
    const [horas] = ultimoHorario.split(':');
    const proximaHora = (parseInt(horas) + 1).toString().padStart(2, '0') + ':00';
    
    setHorariosDisponiveis(horarios => [...horarios, proximaHora]);
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(linkPersonalizado);
    alert('Link copiado para a área de transferência!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>
            Gerenciar Datas Disponíveis
          </CardTitle>
          <p className="text-gray-600">
            Configure os horários que estarão disponíveis para seus clientes
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <LinkPersonalizado 
            linkPersonalizado={linkPersonalizado} 
            onCopiarLink={copiarLink} 
          />

          <ConfiguracaoMesAno 
            anoSelecionado={anoSelecionado}
            mesSelecionado={mesSelecionado}
            onAnoChange={setAnoSelecionado}
            onMesChange={setMesSelecionado}
          />

          <LegendaCores />

          <SemanaAccordion 
            semanas={semanas}
            mesAtual={mesAtual}
            slots={slots}
            horariosDisponiveis={horariosDisponiveis}
            onAlterarStatusSlot={alterarStatusSlot}
            onAdicionarMaisHorarios={adicionarMaisHorarios}
          />
        </CardContent>
      </Card>

      <PainelProfissional 
        slots={slots}
        reservas={reservas}
        onAlterarStatusSlot={alterarStatusSlot}
      />
    </div>
  );
};

export default AgendamentoModerno;
