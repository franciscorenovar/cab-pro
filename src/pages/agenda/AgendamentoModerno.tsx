
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays, startOfMonth, endOfMonth, eachWeekOfInterval, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import GradeHorarios from "./components/GradeHorarios";
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
  const [anoSelecionado, setAnoSelecionado] = useState<string>('2025');
  const [mesSelecionado, setMesSelecionado] = useState<string>('1');
  const [linkPersonalizado] = useState('https://seuapp.com/maria'); // Mock - será gerado dinamicamente
  
  // Mock data - será substituído pela integração com Firebase
  const [slots, setSlots] = useState<Slot[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const anos = ['2024', '2025', '2026'];
  const meses = [
    { valor: '1', nome: 'Janeiro' },
    { valor: '2', nome: 'Fevereiro' },
    { valor: '3', nome: 'Março' },
    { valor: '4', nome: 'Abril' },
    { valor: '5', nome: 'Maio' },
    { valor: '6', nome: 'Junho' },
    { valor: '7', nome: 'Julho' },
    { valor: '8', nome: 'Agosto' },
    { valor: '9', nome: 'Setembro' },
    { valor: '10', nome: 'Outubro' },
    { valor: '11', nome: 'Novembro' },
    { valor: '12', nome: 'Dezembro' }
  ];

  const mesAtual = new Date(parseInt(anoSelecionado), parseInt(mesSelecionado) - 1, 1);
  const inicioMes = startOfMonth(mesAtual);
  const fimMes = endOfMonth(mesAtual);
  const semanas = eachWeekOfInterval(
    { start: inicioMes, end: fimMes },
    { weekStartsOn: 1 }
  );

  const gerarSlotsParaSemana = (inicioSemana: Date, fimSemana: Date) => {
    const dias = eachDayOfInterval({ start: inicioSemana, end: fimSemana });
    // Horários de 7:00 às 18:00 de hora em hora
    const horarios = [
      '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
      '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
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
          status: 'bloqueado' // Por padrão, tudo bloqueado até a cabeleireira liberar
        });
      });
    });
    
    return slotsGerados;
  };

  const alterarStatusSlot = (slotId: string, novoStatus: StatusSlot) => {
    setSlots(slots.map(s => 
      s.id === slotId ? { ...s, status: novoStatus } : s
    ));
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
          {/* Link personalizado */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Seu Link de Agendamento</h3>
                <p className="text-sm text-gray-600 break-all">{linkPersonalizado}</p>
              </div>
              <Button
                onClick={copiarLink}
                style={{ backgroundColor: '#7B539D', color: 'white' }}
                size="sm"
              >
                Copiar Link
              </Button>
            </div>
          </div>

          {/* Seletores de Ano e Mês */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
              <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {anos.map((ano) => (
                    <SelectItem key={ano} value={ano}>
                      {ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mês</label>
              <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {meses.map((mes) => (
                    <SelectItem key={mes.valor} value={mes.valor}>
                      {mes.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Legenda */}
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

          {/* Accordion das Semanas */}
          <Accordion type="single" collapsible className="w-full">
            {semanas.map((semana, indexSemana) => {
              const inicioSemana = startOfWeek(semana, { weekStartsOn: 1 });
              const fimSemana = endOfWeek(semana, { weekStartsOn: 1 });
              const slotsParaSemana = gerarSlotsParaSemana(inicioSemana, fimSemana);

              return (
                <AccordionItem key={indexSemana} value={`semana-${indexSemana}`}>
                  <AccordionTrigger className="text-base">
                    Semana {format(inicioSemana, 'dd')} - {format(fimSemana, 'dd')} de {format(mesAtual, 'MMMM', { locale: ptBR })}
                  </AccordionTrigger>
                  <AccordionContent>
                    <GradeHorarios 
                      slots={slotsParaSemana}
                      onSelecionarSlot={() => {}}
                      modoVisualizacao="profissional"
                      onAlterarStatusSlot={alterarStatusSlot}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Painel de Reservas */}
      <PainelProfissional 
        slots={slots}
        reservas={reservas}
        onAlterarStatusSlot={alterarStatusSlot}
      />
    </div>
  );
};

export default AgendamentoModerno;
