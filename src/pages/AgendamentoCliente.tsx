
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SlotDisponivel {
  id: string;
  data: Date;
  hora: string;
  profissional: string;
}

interface DadosReserva {
  nome: string;
  telefone: string;
  email: string;
  servico: string;
}

const AgendamentoCliente = () => {
  const [slotsDisponiveis, setSlotsDisponiveis] = useState<SlotDisponivel[]>([]);
  const [slotSelecionado, setSlotSelecionado] = useState<SlotDisponivel | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dadosReserva, setDadosReserva] = useState<DadosReserva>({
    nome: '',
    telefone: '',
    email: '',
    servico: ''
  });
  const [erros, setErros] = useState<Record<string, string>>({});

  // Mock data - será substituído pela integração
  useEffect(() => {
    const mockSlots: SlotDisponivel[] = [
      { id: '1', data: new Date('2025-01-10'), hora: '09:00', profissional: 'maria' },
      { id: '2', data: new Date('2025-01-10'), hora: '14:00', profissional: 'maria' },
      { id: '3', data: new Date('2025-01-12'), hora: '10:30', profissional: 'maria' },
      { id: '4', data: new Date('2025-01-15'), hora: '16:00', profissional: 'maria' },
      { id: '5', data: new Date('2025-01-18'), hora: '08:30', profissional: 'maria' },
    ];
    setSlotsDisponiveis(mockSlots);
  }, []);

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

    if (dadosReserva.nome.length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    const telefoneNumeros = dadosReserva.telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10) {
      novosErros.telefone = 'Telefone deve ter pelo menos 10 dígitos';
    }

    if (!dadosReserva.servico) {
      novosErros.servico = 'Selecione um tipo de serviço';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleReservar = (slot: SlotDisponivel) => {
    setSlotSelecionado(slot);
    setMostrarFormulario(true);
  };

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validarFormulario() && slotSelecionado) {
      // Aqui será feita a integração com Firebase/Supabase
      console.log('Reserva confirmada:', {
        slot: slotSelecionado,
        dados: dadosReserva
      });

      // Remove o slot da lista de disponíveis
      setSlotsDisponiveis(prev => prev.filter(s => s.id !== slotSelecionado.id));
      
      // Resetar formulário
      setMostrarFormulario(false);
      setSlotSelecionado(null);
      setDadosReserva({ nome: '', telefone: '', email: '', servico: '' });
      
      alert('Agendamento realizado com sucesso!');
    }
  };

  if (mostrarFormulario && slotSelecionado) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
              <CardTitle style={{ color: '#31144A' }}>
                Confirmar Agendamento
              </CardTitle>
              <div className="text-sm text-gray-600">
                {format(slotSelecionado.data, 'EEEE, dd/MM/yyyy', { locale: ptBR })} às {slotSelecionado.hora}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleConfirmarReserva} className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={dadosReserva.nome}
                    onChange={(e) => setDadosReserva({ ...dadosReserva, nome: e.target.value })}
                    placeholder="Seu nome completo"
                    className={erros.nome ? 'border-red-500' : ''}
                  />
                  {erros.nome && <p className="text-red-500 text-sm mt-1">{erros.nome}</p>}
                </div>

                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={dadosReserva.telefone}
                    onChange={(e) => setDadosReserva({ 
                      ...dadosReserva, 
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
                    value={dadosReserva.email}
                    onChange={(e) => setDadosReserva({ ...dadosReserva, email: e.target.value })}
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="servico">Tipo de Serviço *</Label>
                  <Select value={dadosReserva.servico} onValueChange={(value) => setDadosReserva({ ...dadosReserva, servico: value })}>
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
                    onClick={() => setMostrarFormulario(false)}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1"
                    style={{ backgroundColor: '#7B539D', color: 'white' }}
                  >
                    Confirmar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
            <CardTitle style={{ color: '#31144A' }} className="text-center">
              Agende seu Horário
            </CardTitle>
            <p className="text-center text-gray-600">
              Selecione um horário disponível para seu atendimento
            </p>
          </CardHeader>
          <CardContent className="p-6">
            {slotsDisponiveis.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg mb-2">Nenhum horário disponível no momento</p>
                <p className="text-sm">Entre em contato diretamente para mais informações</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {slotsDisponiveis.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                      <div className="font-medium" style={{ color: '#31144A' }}>
                        {format(slot.data, 'EEEE, dd/MM/yyyy', { locale: ptBR })}
                      </div>
                      <div className="text-sm text-gray-600">às {slot.hora}</div>
                    </div>
                    <Button
                      onClick={() => handleReservar(slot)}
                      style={{ 
                        backgroundColor: '#B8D4FF', 
                        color: '#31144A',
                        border: 'none'
                      }}
                      className="hover:opacity-80"
                    >
                      Agendar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgendamentoCliente;
