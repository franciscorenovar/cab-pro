
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  ultimoServico?: string;
  ultimaVisita?: Date;
  totalVisitas: number;
}

const ClientesSimples = () => {
  // Mock data - será substituído pela integração
  const [clientes] = useState<Cliente[]>([
    {
      id: '1',
      nome: 'Maria Silva',
      telefone: '(11) 99999-9999',
      email: 'maria@email.com',
      ultimoServico: 'Corte + Escova',
      ultimaVisita: new Date('2024-12-20'),
      totalVisitas: 5
    },
    {
      id: '2',
      nome: 'Ana Costa',
      telefone: '(11) 88888-8888',
      ultimoServico: 'Hidratação',
      ultimaVisita: new Date('2024-12-18'),
      totalVisitas: 3
    }
  ]);

  const [termoBusca, setTermoBusca] = useState('');

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.telefone.includes(termoBusca)
  );

  const exportarClientes = () => {
    // Aqui será implementada a exportação para campanhas de marketing
    const dadosExportacao = clientes.map(cliente => ({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      ultimaVisita: cliente.ultimaVisita ? format(cliente.ultimaVisita, 'dd/MM/yyyy') : '',
      totalVisitas: cliente.totalVisitas
    }));
    
    console.log('Dados para exportação:', dadosExportacao);
    // Implementar download CSV ou integração com plataformas de marketing
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <div className="flex justify-between items-center">
            <CardTitle style={{ color: '#31144A' }}>
              Base de Clientes ({clientes.length})
            </CardTitle>
            <Button
              onClick={exportarClientes}
              style={{ backgroundColor: '#7B539D', color: 'white' }}
              size="sm"
            >
              Exportar para Marketing
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="max-w-md"
            />

            <div className="grid gap-4">
              {clientesFiltrados.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  {termoBusca ? 'Nenhum cliente encontrado.' : 'Nenhum cliente cadastrado ainda.'}
                </div>
              ) : (
                clientesFiltrados.map((cliente) => (
                  <Card key={cliente.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-lg" style={{ color: '#31144A' }}>
                            {cliente.nome}
                          </h4>
                          <p className="text-gray-600">{cliente.telefone}</p>
                          {cliente.email && (
                            <p className="text-gray-600 text-sm">{cliente.email}</p>
                          )}
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-medium text-gray-700">
                            {cliente.totalVisitas} visita{cliente.totalVisitas !== 1 ? 's' : ''}
                          </div>
                          {cliente.ultimaVisita && (
                            <div className="text-gray-500">
                              Última: {format(cliente.ultimaVisita, 'dd/MM/yyyy', { locale: ptBR })}
                            </div>
                          )}
                        </div>
                      </div>
                      {cliente.ultimoServico && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="text-sm">
                            <span className="text-gray-500">Último serviço:</span>
                            <span className="ml-2 font-medium">{cliente.ultimoServico}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientesSimples;
