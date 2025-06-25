
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, addDays, startOfMonth, endOfMonth, eachWeekOfInterval, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import GradeHorarios from "./components/GradeHorarios";
import FormularioReserva from "./components/FormularioReserva";
import PainelProfissional from "./components/PainelProfissional";

export type StatusSlot = 'bloqueado' | 'livre' | 'reservado';

export interface Slot {
  id: string;
  data: Date;
  hora: string;
  status: StatusSlot;
  clienteNome?: string;
  clienteTelefone?: string;
  clienteEmail?: string;
  tipoServico?: string;
}

export interface Reserva {
  id: string;
  slotId: string;
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail?: string;
  tipoServico: string;
  data: Date;
  hora: string;
  status: 'confirmado' | 'cancelado';
}

const AgendamentoModerno = () => {
  const [modoVisualizacao, setModoVisualizacao] = useState<'cliente' | 'profissional'>('cliente');
  const [slotSelecionado, setSlotSelecionado] = useState<Slot | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // Mock data - será substituído pela integração com Firebase
  const [slots, setSlots] = useState<Slot[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const hoje = new Date();
  const proximosMeses = Array.from({ length: 6 }, (_, i) => addDays(startOfMonth(hoje), i * 30));

  const gerarSlotsParaSemana = (inicioSemana: Date, fimSemana: Date) => {
    const dias = eachDayOfInterval({ start: inicioSemana, end: fimSemana });
    const horarios = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
    ];
    
    const slotsGerados: Slot[] = [];
    dias.forEach(dia => {
      // Pular domingos (dia 0)
      if (dia.getDay() === 0) return;
      
      horarios.forEach(hora => {
        slotsGerados.push({
          id: `${format(dia, 'yyyy-MM-dd')}_${hora}`,
          data: dia,
          hora,
          status: Math.random() > 0.7 ? 'bloqueado' : Math.random() > 0.5 ? 'reservado' : 'livre'
        });
      });
    });
    
    return slotsGerados;
  };

  const handleReservarSlot = (slot: Slot) => {
    if (slot.status === 'livre') {
      setSlotSelecionado(slot);
      setMostrarFormulario(true);
    }
  };

  const handleConfirmarReserva = (dadosCliente: any) => {
    if (slotSelecionado) {
      // Aqui será feita a integração com Firebase
      const novaReserva: Reserva = {
        id: Date.now().toString(),
        slotId: slotSelecionado.id,
        clienteNome: dadosCliente.nome,
        clienteTelefone: dadosCliente.telefone,
        clienteEmail: dadosCliente.email,
        tipoServico: dadosCliente.servico,
        data: slotSelecionado.data,
        hora: slotSelecionado.hora,
        status: 'confirmado'
      };
      
      setReservas([...reservas, novaReserva]);
      
      // Atualizar status do slot
      setSlots(slots.map(s => 
        s.id === slotSelecionado.id 
          ? { ...s, status: 'reservado' as StatusSlot, ...dadosCliente }
          : s
      ));
      
      setMostrarFormulario(false);
      setSlotSelecionado(null);
    }
  };

  const alterarStatusSlot = (slotId: string, novoStatus: StatusSlot) => {
    setSlots(slots.map(s => 
      s.id === slotId ? { ...s, status: novoStatus } : s
    ));
  };

  if (mostrarFormulario && slotSelecionado) {
    return (
      <FormularioReserva 
        slot={slotSelecionado}
        onConfirmar={handleConfirmarReserva}
        onCancelar={() => {
          setMostrarFormulario(false);
          setSlotSelecionado(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <div className="flex justify-between items-center">
            <CardTitle style={{ color: '#31144A' }}>
              Sistema de Agendamento
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={modoVisualizacao === 'cliente' ? 'default' : 'outline'}
                onClick={() => setModoVisualizacao('cliente')}
                style={{
                  backgroundColor: modoVisualizacao === 'cliente' ? '#7B539D' : 'transparent',
                  borderColor: '#7B539D',
                  color: modoVisualizacao === 'cliente' ? 'white' : '#7B539D'
                }}
              >
                Visão Cliente
              </Button>
              <Button
                size="sm"
                variant={modoVisualizacao === 'profissional' ? 'default' : 'outline'}
                onClick={() => setModoVisualizacao('profissional')}
                style={{
                  backgroundColor: modoVisualizacao === 'profissional' ? '#7B539D' : 'transparent',
                  borderColor: '#7B539D',
                  color: modoVisualizacao === 'profissional' ? 'white' : '#7B539D'
                }}
              >
                Painel Profissional
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {modoVisualizacao === 'profissional' ? (
            <PainelProfissional 
              slots={slots}
              reservas={reservas}
              onAlterarStatusSlot={alterarStatusSlot}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFB8BA' }}></div>
                  <span className="text-sm">Bloqueado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#B8D4FF' }}></div>
                  <span className="text-sm">Disponível</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#B8FFB8' }}></div>
                  <span className="text-sm">Reservado</span>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {proximosMeses.map((mes, indexMes) => {
                  const inicioMes = startOfMonth(mes);
                  const fimMes = endOfMonth(mes);
                  const semanas = eachWeekOfInterval(
                    { start: inicioMes, end: fimMes },
                    { weekStartsOn: 1 }
                  );

                  return (
                    <AccordionItem key={indexMes} value={`mes-${indexMes}`}>
                      <AccordionTrigger className="text-lg font-semibold" style={{ color: '#31144A' }}>
                        {format(mes, 'MMMM yyyy', { locale: ptBR })}
                      </AccordionTrigger>
                      <AccordionContent>
                        <Accordion type="single" collapsible className="pl-4">
                          {semanas.map((semana, indexSemana) => {
                            const inicioSemana = startOfWeek(semana, { weekStartsOn: 1 });
                            const fimSemana = endOfWeek(semana, { weekStartsOn: 1 });
                            const slotsParaSemana = gerarSlotsParaSemana(inicioSemana, fimSemana);

                            return (
                              <AccordionItem key={indexSemana} value={`semana-${indexMes}-${indexSemana}`}>
                                <AccordionTrigger className="text-base">
                                  Semana {format(inicioSemana, 'dd')} - {format(fimSemana, 'dd')}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <GradeHorarios 
                                    slots={slotsParaSemana}
                                    onSelecionarSlot={handleReservarSlot}
                                    modoVisualizacao="cliente"
                                  />
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgendamentoModerno;
