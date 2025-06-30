import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Slot } from "../types/agenda";

interface GradeHorariosProps {
  diasCabecalho: Date[];
  slots: Slot[];
  horariosDisponiveis: string[];
  modoVisualizacao: "cliente" | "profissional";
  onSelecionarSlot: (slot: Slot) => void;
  onAlterarStatusSlot?: (slotId: string, novoStatus: Slot["status"]) => void;
  onAdicionarHorario?: () => void;
}

const diasAbrev = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const GradeHorarios: React.FC<GradeHorariosProps> = ({
  diasCabecalho,
  slots,
  horariosDisponiveis,
  modoVisualizacao,
  onSelecionarSlot,
  onAlterarStatusSlot,
  onAdicionarHorario,
}) => {
  const handleClique = (slot: Slot) => {
    if (modoVisualizacao === "cliente") {
      if (slot.status === "livre") onSelecionarSlot(slot);
      return;
    }
    if (!onAlterarStatusSlot || slot.status === "reservado") return;
    const prox: Slot["status"] =
      slot.status === "bloqueado" ? "livre" : "bloqueado";
    onAlterarStatusSlot(slot.id, prox);
  };

  const corSlot = (status: Slot["status"]) => {
    switch (status) {
      case "bloqueado":
        return "#FFB8BA";
      case "livre":
        return "#B8D4FF";
      case "reservado":
        return "#B8FFB8";
    }
  };

  return (
    <div>
      {/* cabeçalho SEG→DOM */}
      <div className="grid" style={{ gridTemplateColumns: "80px repeat(7,1fr)" }}>
        <div className="border-r"></div>
        {diasCabecalho.map((dia) => (
          <div
            key={dia.toISOString()}
            className="text-center p-2 border-b font-medium"
          >
            <div>{diasAbrev[dia.getDay()]}</div>
            <div className="text-xs text-muted-foreground">
              {format(dia, "dd/MM", { locale: ptBR })}
            </div>
          </div>
        ))}
      </div>

      {/* células de horários */}
      <div className="overflow-auto max-h-[400px] border-b border-l">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "80px repeat(7,1fr)",
            gridAutoRows: "48px",
          }}
        >
          {horariosDisponiveis.map((hora) => (
            <React.Fragment key={hora}>
              {/* coluna fixa da hora */}
              <div className="sticky left-0 bg-white border-r flex items-center justify-center">
                {hora}
              </div>
              {diasCabecalho.map((dia) => {
                const id = `${format(dia, "yyyy-MM-dd")}_${hora}`;
                const slot =
                  slots.find((s) => s.id === id) || {
                    id,
                    data: dia,
                    hora,
                    status: "bloqueado" as Slot["status"],
                  };
                return (
                  <Button
                    key={id}
                    variant="ghost"
                    className="h-full w-full rounded-none border"
                    style={{ backgroundColor: corSlot(slot.status) }}
                    onClick={() => handleClique(slot)}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* botão “Adicionar mais horários” */}
      {modoVisualizacao === "profissional" && onAdicionarHorario && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={onAdicionarHorario}
          >
            <Plus size={16} /> Adicionar mais horários
          </Button>
        </div>
      )}
    </div>
  );
};

export default GradeHorarios;
