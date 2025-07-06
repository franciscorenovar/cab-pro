import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import GradeHorarios from "./GradeHorarios";
import { Slot, StatusSlot } from "../types/agenda";

interface SemanaAccordionProps {
  semanas: Date[];
  mesAtual: Date;
  slots: Slot[];
  horariosDisponiveis: string[];
  onAlterarStatusSlot: (slotId: string, novo: StatusSlot) => void;
  onAdicionarMaisHorarios: () => void;
}

const SemanaAccordion: React.FC<SemanaAccordionProps> = ({
  semanas,
  mesAtual,
  slots,
  horariosDisponiveis,
  onAlterarStatusSlot,
  onAdicionarMaisHorarios,
}) => (
  <Accordion type="single" collapsible className="w-full">
    {semanas.map((ref, idx) => {
      const inicio = startOfWeek(ref, { weekStartsOn: 1, locale: ptBR });
      const fim = endOfWeek(ref, { weekStartsOn: 1, locale: ptBR });

      // gera lista de 7 dias SEG→DOM
      const diasCabecalho = eachDayOfInterval({ start: inicio, end: fim });

      // para cada dia/hora, ou slot existente ou bloqueado
      const slotsSemana = diasCabecalho.flatMap((dia) =>
        horariosDisponiveis.map((hora) => {
          const id = `${format(dia, "yyyy-MM-dd")}_${hora}`;
          const existe = slots.find((s) => s.id === id);
          return (
            existe || { id, data: dia, hora, status: "bloqueado" as StatusSlot }
          );
        })
      );

      return (
        <AccordionItem key={idx} value={`semana-${idx}`}>
          <AccordionTrigger className="text-base">
            Semana {format(inicio, "dd")} – {format(fim, "dd")} de{" "}
            {format(mesAtual, "MMMM", { locale: ptBR })}
          </AccordionTrigger>
          <AccordionContent>
            <GradeHorarios
              diasCabecalho={diasCabecalho}
              slots={slotsSemana}
              horariosDisponiveis={horariosDisponiveis}
              onSelecionarSlot={() => {}}
              modoVisualizacao="profissional"
              onAlterarStatusSlot={onAlterarStatusSlot}
              onAdicionarHorario={onAdicionarMaisHorarios}
            />
          </AccordionContent>
        </AccordionItem>
      );
    })}
  </Accordion>
);

export default SemanaAccordion;
