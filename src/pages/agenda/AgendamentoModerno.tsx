import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { startOfMonth, endOfMonth, eachWeekOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import ConfiguracaoMesAno from "./components/ConfiguracaoMesAno";
import LinkPersonalizado from "./components/LinkPersonalizado";
import LegendaCores from "./components/LegendaCores";
import SemanaAccordion from "./components/SemanaAccordion";
import PainelProfissional from "./components/PainelProfissional";
import { Slot, StatusSlot, Reserva } from "./types/Agenda";

const AgendamentoModerno: React.FC = () => {
  const [anoSelecionado, setAnoSelecionado] = useState("2025");
  const [mesSelecionado, setMesSelecionado] = useState("1");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [reservas] = useState<Reserva[]>([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([
    "07:00","08:00","09:00","10:00","11:00",
    "12:00","13:00","14:00","15:00","16:00","17:00",
  ]);

  // Ajuste aqui: defina o profissionalId (você pode buscar depois do backend/autenticação)
  const profissionalId = "maria"; // Coloque aqui o ID do profissional que desejar!

  const mesAtual = new Date(
    Number(anoSelecionado),
    Number(mesSelecionado) - 1,
    1
  );
  const semanas = eachWeekOfInterval(
    { start: startOfMonth(mesAtual), end: endOfMonth(mesAtual) },
    { weekStartsOn: 1, locale: ptBR } // começa na segunda
  );

  const alterarStatusSlot = (slotId: string, novo: StatusSlot) => {
    setSlots((prev) => {
      const idx = prev.findIndex((s) => s.id === slotId);
      if (idx !== -1) {
        return prev.map((s) =>
          s.id === slotId ? { ...s, status: novo } : s
        );
      }
      const [dataStr, hora] = slotId.split("_");
      return [
        ...prev,
        { id: slotId, data: new Date(dataStr), hora, status: novo },
      ];
    });
  };

  const adicionarMaisHorarios = () => {
    const ultima = horariosDisponiveis[horariosDisponiveis.length - 1];
    const num = Number(ultima.split(":")[0]) + 1;
    const nova = `${num.toString().padStart(2, "0")}:00`;
    setHorariosDisponiveis((h) => [...h, nova]);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConfiguracaoMesAno
            anoSelecionado={anoSelecionado}
            mesSelecionado={mesSelecionado}
            onAnoChange={setAnoSelecionado}
            onMesChange={setMesSelecionado}
          />
          <LinkPersonalizado profissionalId={profissionalId} />
          <LegendaCores />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agenda</CardTitle>
        </CardHeader>
        <CardContent>
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
