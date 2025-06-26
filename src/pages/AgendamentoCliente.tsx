import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Slot } from "./agenda/types/agenda";

const AgendamentoCliente = () => {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const handleSlotSelection = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Agendamento</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedSlot ? (
            <div>
              <p>Você selecionou o horário de {selectedSlot.hora} do dia {format(selectedSlot.data, 'dd/MM/yyyy', { locale: ptBR })}.</p>
              <Button>Confirmar Agendamento</Button>
            </div>
          ) : (
            <p>Selecione um horário disponível.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgendamentoCliente;
