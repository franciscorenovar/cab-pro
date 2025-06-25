
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Slot } from "../AgendamentoModerno";

interface FormularioReservaProps {
  slot: Slot;
  onConfirmar: (dados: {
    nome: string;
    telefone: string;
    email?: string;
    servico: string;
  }) => void;
  onCancelar: () => void;
}

const FormularioReserva = ({ slot, onConfirmar, onCancelar }: FormularioReservaProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    servico: ''
  });

  const [erros, setErros] = useState<Record<string, string>>({});

  const servicos = [
    'Corte Feminino',
    'Corte Masculino',
    'Hidratação',
    'Reconstrução',
    'Coloração',
    'Reflexo/Luzes',
    'Escova',
    'Prancha',
    'Penteado',
    'Sobrancelha'
  ];

  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return valor;
  };

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (formData.nome.length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    const telefoneNumeros = formData.telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10) {
      novosErros.telefone = 'Telefone deve ter pelo menos 10 dígitos';
    }

    if (!formData.servico) {
      novosErros.servico = 'Selecione um tipo de serviço';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onConfirmar({
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email || undefined,
        servico: formData.servico
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
        <CardTitle style={{ color: '#31144A' }}>
          Reservar Horário
        </CardTitle>
        <div className="text-sm text-gray-600">
          {format(slot.data, 'EEEE, dd/MM/yyyy', { locale: ptBR })} às {slot.hora}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Seu nome completo"
              className={erros.nome ? 'border-red-500' : ''}
            />
            {erros.nome && <p className="text-red-500 text-sm mt-1">{erros.nome}</p>}
          </div>

          <div>
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ 
                ...formData, 
                telefone: formatarTelefone(e.target.value) 
              })}
              placeholder="(00) 00000-0000"
              className={erros.telefone ? 'border-red-500' : ''}
            />
            {erros.telefone && <p className="text-red-500 text-sm mt-1">{erros.telefone}</p>}
          </div>

          <div>
            <Label htmlFor="email">E-mail (opcional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="servico">Tipo de Serviço *</Label>
            <Select value={formData.servico} onValueChange={(value) => setFormData({ ...formData, servico: value })}>
              <SelectTrigger className={erros.servico ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {servicos.map((servico) => (
                  <SelectItem key={servico} value={servico}>
                    {servico}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {erros.servico && <p className="text-red-500 text-sm mt-1">{erros.servico}</p>}
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancelar}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="flex-1"
              style={{ backgroundColor: '#7B539D', color: 'white' }}
            >
              Confirmar Reserva
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormularioReserva;
