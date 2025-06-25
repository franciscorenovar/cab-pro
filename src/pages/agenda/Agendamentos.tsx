
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Agendamento {
  id: string;
  cliente: string;
  telefone: string;
  servico: string;
  data: Date;
  hora: string;
  status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
  observacoes?: string;
}

const Agendamentos = () => {
  const { toast } = useToast();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [formData, setFormData] = useState({
    cliente: '',
    telefone: '',
    servico: '',
    data: '',
    hora: '',
    observacoes: ''
  });

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

  const horarios = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'agendado': '#D2B360',
      'confirmado': '#7B539D',
      'concluido': '#4CAF50',
      'cancelado': '#F44336'
    };
    return colors[status as keyof typeof colors] || '#7B539D';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'agendado': 'Agendado',
      'confirmado': 'Confirmado',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cliente || !formData.telefone || !formData.servico || !formData.data || !formData.hora) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const novoAgendamento: Agendamento = {
      id: Date.now().toString(),
      cliente: formData.cliente,
      telefone: formData.telefone,
      servico: formData.servico,
      data: new Date(formData.data),
      hora: formData.hora,
      status: 'agendado',
      observacoes: formData.observacoes
    };

    setAgendamentos([...agendamentos, novoAgendamento]);
    setFormData({
      cliente: '',
      telefone: '',
      servico: '',
      data: '',
      hora: '',
      observacoes: ''
    });
    
    toast({
      title: "Sucesso",
      description: "Agendamento criado com sucesso!"
    });
  };

  const alterarStatus = (id: string, novoStatus: Agendamento['status']) => {
    setAgendamentos(agendamentos.map(a => 
      a.id === id ? { ...a, status: novoStatus } : a
    ));
    
    toast({
      title: "Status alterado",
      description: `Agendamento marcado como ${getStatusLabel(novoStatus).toLowerCase()}.`
    });
  };

  const excluirAgendamento = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAgendamentos(agendamentos.filter(a => a.id !== id));
      toast({
        title: "Sucesso",
        description: "Agendamento excluído com sucesso!"
      });
    }
  };

  // Ordenar por data e hora
  const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
    const dataA = new Date(`${format(a.data, 'yyyy-MM-dd')} ${a.hora}`);
    const dataB = new Date(`${format(b.data, 'yyyy-MM-dd')} ${b.hora}`);
    return dataA.getTime() - dataB.getTime();
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>Novo Agendamento</CardTitle>
          <CardDescription>Registre um novo agendamento para seu cliente</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente">Nome do Cliente *</Label>
                <Input
                  id="cliente"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <Label htmlFor="servico">Serviço *</Label>
                <Select value={formData.servico} onValueChange={(value) => setFormData({ ...formData, servico: value })}>
                  <SelectTrigger>
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
              </div>

              <div>
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="hora">Horário *</Label>
                <Select value={formData.hora} onValueChange={(value) => setFormData({ ...formData, hora: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {horarios.map((hora) => (
                      <SelectItem key={hora} value={hora}>
                        {hora}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Observações sobre o agendamento..."
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              style={{ backgroundColor: '#7B539D', color: 'white' }}
              className="hover:opacity-90"
            >
              Criar Agendamento
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>
            Agendamentos ({agendamentos.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {agendamentos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Nenhum agendamento encontrado. Crie seu primeiro agendamento acima.
            </div>
          ) : (
            <div className="space-y-4">
              {agendamentosOrdenados.map((agendamento) => (
                <Card key={agendamento.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg" style={{ color: '#31144A' }}>
                          {agendamento.cliente}
                        </h4>
                        <p className="text-gray-600">{agendamento.telefone}</p>
                      </div>
                      <Badge 
                        style={{ 
                          backgroundColor: getStatusColor(agendamento.status),
                          color: 'white'
                        }}
                      >
                        {getStatusLabel(agendamento.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Serviço:</span>
                        <p className="font-medium">{agendamento.servico}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Data:</span>
                        <p className="font-medium">
                          {format(agendamento.data, 'dd/MM/yyyy', { locale: ptBR })}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Horário:</span>
                        <p className="font-medium">{agendamento.hora}</p>
                      </div>
                    </div>

                    {agendamento.observacoes && (
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Observações:</span>
                        <p className="text-sm">{agendamento.observacoes}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Select
                        value={agendamento.status}
                        onValueChange={(value: Agendamento['status']) => alterarStatus(agendamento.id, value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agendado">Agendado</SelectItem>
                          <SelectItem value="confirmado">Confirmado</SelectItem>
                          <SelectItem value="concluido">Concluído</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => excluirAgendamento(agendamento.id)}
                        style={{ borderColor: '#522A71', color: '#522A71' }}
                        className="hover:bg-red-50"
                      >
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Agendamentos;
