
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import GradeHorarios from "./GradeHorarios";
import { Slot, StatusSlot } from "../types/agenda";

interface SemanaAccordionProps {
  semanas: Date[];
  mesAtual: Date;
  slots: Slot[];
  horariosDisponiveis: string[];
  onAlterarStatusSlot: (slotId: string, novoStatus: StatusSlot) => void;
  onAdicionarMaisHorarios: () => void;
}

const SemanaAccordion = ({ 
  semanas, 
  mesAtual, 
  slots, 
  horariosDisponiveis, 
  onAlterarStatusSlot, 
  onAdicionarMaisHorarios 
}: SemanaAccordionProps) => {
  const gerarSlotsParaSemana = (inicioSemana: Date, fimSemana: Date) => {
    const dias = eachDayOfInterval({ start: inicioSemana, end: fimSemana });
    
    const slotsGerados: Slot[] = [];
    dias.forEach(dia => {
      horariosDisponiveis.forEach(hora => {
        const slotId = `${format(dia, 'yyyy-MM-dd')}_${hora}`;
        // Verificar se o slot já existe
        const slotExistente = slots.find(s => s.id === slotId);
        
        slotsGerados.push(slotExistente || {
          id: slotId,
          data: dia,
          hora,
          status: 'bloqueado' // Por padrão, tudo bloqueado até a cabeleireira liberar
        });
      });
    });
    
    return slotsGerados;
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {semanas.map((semana, indexSemana) => {
        const inicioSemana = startOfWeek(semana, { locale: ptBR }); // Começa no domingo
        const fimSemana = endOfWeek(semana, { locale: ptBR }); // Termina no sábado
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
                onAlterarStatusSlot={onAlterarStatusSlot}
                onAdicionarHorario={onAdicionarMaisHorarios}
                horariosDisponiveis={horariosDisponiveis}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default SemanaAccordion;
