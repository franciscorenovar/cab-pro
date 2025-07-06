
import { User, Phone, Mail, Scissors } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingFormProps {
  selectedDate?: string;
  selectedTime?: string;
  selectedService?: string;
  onServiceSelect: (service: string) => void;
}

const BookingForm = ({ selectedDate, selectedTime, selectedService, onServiceSelect }: BookingFormProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Seus dados</h2>
      <form className="space-y-6">
        {/* Service Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
            <Scissors className="w-4 h-4" />
            <span>Escolha o serviço</span>
          </label>
          <Select value={selectedService} onValueChange={onServiceSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corte-feminino">Corte Feminino - R$ 50,00</SelectItem>
              <SelectItem value="corte-escova">Corte + Escova - R$ 80,00</SelectItem>
              <SelectItem value="coloracao">Coloração - R$ 120,00</SelectItem>
              <SelectItem value="luzes">Luzes - R$ 150,00</SelectItem>
              <SelectItem value="escova">Escova - R$ 40,00</SelectItem>
              <SelectItem value="hidratacao">Hidratação - R$ 60,00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Nome completo</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Digite seu nome completo"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Telefone</span>
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>E-mail</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="w-full"
            required
          />
        </div>

        <div className="bg-purple-secondary p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Resumo do agendamento</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Data:</span> {selectedDate || 'Selecione uma data'}</p>
            <p><span className="font-medium">Horário:</span> {selectedTime || 'Selecione um horário'}</p>
            <p><span className="font-medium">Serviço:</span> {selectedService || 'Selecione um serviço'}</p>
            <p><span className="font-medium">Profissional:</span> Ana Silva</p>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full gradient-primary text-white py-3 text-lg font-medium hover:opacity-90 transition-opacity"
          size="lg"
        >
          Confirmar Agendamento
        </Button>

        <p className="text-xs text-gray-medium text-center">
          Ao confirmar, você receberá um e-mail e SMS com os detalhes do seu agendamento.
        </p>
      </form>
    </Card>
  );
};

export default BookingForm;
