
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Slot } from "../types/agenda";

interface FormularioReservaProps {
  slot: Slot;
  onFechar: () => void;
  onConfirmar: (dadosReserva: any) => void;
}

const FormularioReserva = ({ slot, onFechar, onConfirmar }: FormularioReservaProps) => {
  const [dadosReserva, setDadosReserva] = useState({
    clienteNome: '',
    clienteTelefone: '',
    clienteEmail: '',
    tipoServico: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmar({
      ...dadosReserva,
      slotId: slot.id,
      data: slot.data,
      hora: slot.hora
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Reserva</CardTitle>
        <p className="text-sm text-gray-600">
          {format(slot.data, 'dd/MM/yyyy', { locale: ptBR })} às {slot.hora}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Cliente</Label>
            <Input
              id="nome"
              value={dadosReserva.clienteNome}
              onChange={(e) => setDadosReserva({ ...dadosReserva, clienteNome: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={dadosReserva.clienteTelefone}
              onChange={(e) => setDadosReserva({ ...dadosReserva, clienteTelefone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email (opcional)</Label>
            <Input
              id="email"
              type="email"
              value={dadosReserva.clienteEmail}
              onChange={(e) => setDadosReserva({ ...dadosReserva, clienteEmail: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="servico">Tipo de Serviço</Label>
            <Select
              value={dadosReserva.tipoServico}
              onValueChange={(value) => setDadosReserva({ ...dadosReserva, tipoServico: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corte">Corte</SelectItem>
                <SelectItem value="escova">Escova</SelectItem>
                <SelectItem value="coloracao">Coloração</SelectItem>
                <SelectItem value="hidratacao">Hidratação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button type="submit" style={{ backgroundColor: '#7B539D', color: 'white' }}>
              Confirmar Reserva
            </Button>
            <Button type="button" variant="outline" onClick={onFechar}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormularioReserva;
