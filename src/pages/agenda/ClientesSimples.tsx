
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Calendar } from "lucide-react";

const ClientesSimples = () => {
  // Mock data - será substituído pela integração com Firebase
  const clientes = [
    {
      id: 1,
      nome: "Ana Silva",
      telefone: "(11) 99999-9999",
      email: "ana@email.com",
      ultimoAgendamento: "15/12/2024",
      totalAgendamentos: 5,
      status: "ativo"
    },
    {
      id: 2,
      nome: "Carla Santos",
      telefone: "(11) 88888-8888",
      email: "carla@email.com",
      ultimoAgendamento: "20/12/2024",
      totalAgendamentos: 3,
      status: "ativo"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>
            {/* Clientes */}
          </CardTitle>
         {/* <p className="text-gray-600">
            Gerencie seus clientes e visualize o histórico de agendamentos
          </p> */}
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {clientes.map((cliente) => (
              <div key={cliente.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <User size={20} style={{ color: '#7B539D' }} />
                    <h3 className="font-semibold text-lg">{cliente.nome}</h3>
                  </div>
                  <Badge 
                    style={{ 
                      backgroundColor: cliente.status === 'ativo' ? '#B8FFB8' : '#FFB8BA',
                      color: '#333'
                    }}
                  >
                    {cliente.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} />
                    {cliente.telefone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} />
                    {cliente.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    Último agendamento: {cliente.ultimoAgendamento}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total de agendamentos: {cliente.totalAgendamentos}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    style={{ borderColor: '#7B539D', color: '#7B539D' }}
                  >
                    Ver Histórico
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    style={{ borderColor: '#7B539D', color: '#7B539D' }}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              style={{ backgroundColor: '#7B539D', color: 'white' }}
            >
              Adicionar Novo Cliente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientesSimples;
