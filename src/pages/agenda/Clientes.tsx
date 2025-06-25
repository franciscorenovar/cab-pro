
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Cliente {
  id: string;
  nome: string;
  nascimento?: Date;
  email?: string;
  telefone: string;
  ultimoServico?: Date;
  totalServicos: number;
  criadoEm: Date;
}

const Clientes = () => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    email: '',
    telefone: ''
  });
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.telefone) {
      toast({
        title: "Erro",
        description: "Nome e telefone são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (clienteEditando) {
      // Editando cliente existente
      setClientes(clientes.map(c => 
        c.id === clienteEditando.id 
          ? {
              ...c,
              nome: formData.nome,
              nascimento: formData.nascimento ? new Date(formData.nascimento) : undefined,
              email: formData.email || undefined,
              telefone: formData.telefone
            }
          : c
      ));
      setClienteEditando(null);
      
      toast({
        title: "Sucesso",
        description: "Cliente atualizado com sucesso!"
      });
    } else {
      // Novo cliente
      const novoCliente: Cliente = {
        id: Date.now().toString(),
        nome: formData.nome,
        nascimento: formData.nascimento ? new Date(formData.nascimento) : undefined,
        email: formData.email || undefined,
        telefone: formData.telefone,
        totalServicos: 0,
        criadoEm: new Date()
      };

      setClientes([...clientes, novoCliente]);
      
      toast({
        title: "Sucesso",
        description: "Cliente cadastrado com sucesso!"
      });
    }

    // Limpar formulário
    setFormData({
      nome: '',
      nascimento: '',
      email: '',
      telefone: ''
    });
  };

  const handleEdit = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setFormData({
      nome: cliente.nome,
      nascimento: cliente.nascimento ? format(cliente.nascimento, 'yyyy-MM-dd') : '',
      email: cliente.email || '',
      telefone: cliente.telefone
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setClienteEditando(null);
    setFormData({
      nome: '',
      nascimento: '',
      email: '',
      telefone: ''
    });
  };

  const excluirCliente = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
      toast({
        title: "Sucesso",
        description: "Cliente excluído com sucesso!"
      });
    }
  };

  const exportarCSV = () => {
    if (clientes.length === 0) {
      toast({
        title: "Aviso",
        description: "Não há clientes para exportar.",
        variant: "destructive"
      });
      return;
    }

    const headers = ['Nome', 'Telefone', 'Email', 'Nascimento', 'Total Serviços', 'Cadastrado em'];
    const csvContent = [
      headers.join(','),
      ...clientes.map(cliente => [
        cliente.nome,
        cliente.telefone,
        cliente.email || '',
        cliente.nascimento ? format(cliente.nascimento, 'dd/MM/yyyy') : '',
        cliente.totalServicos,
        format(cliente.criadoEm, 'dd/MM/yyyy')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clientes_${format(new Date(), 'dd-MM-yyyy')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Sucesso",
      description: "Lista de clientes exportada com sucesso!"
    });
  };

  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  // Ordenar clientes por nome
  const clientesOrdenados = [...clientes].sort((a, b) => 
    a.nome.localeCompare(b.nome)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <CardTitle style={{ color: '#31144A' }}>
            {clienteEditando ? 'Editar Cliente' : 'Novo Cliente'}
          </CardTitle>
          <CardDescription>
            {clienteEditando 
              ? 'Atualize as informações do cliente' 
              : 'Cadastre um novo cliente'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome completo do cliente"
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="nascimento">Data de Nascimento</Label>
                <Input
                  id="nascimento"
                  type="date"
                  value={formData.nascimento}
                  onChange={(e) => setFormData({ ...formData, nascimento: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                type="submit" 
                style={{ backgroundColor: '#7B539D', color: 'white' }}
                className="hover:opacity-90"
              >
                {clienteEditando ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
              </Button>
              
              {clienteEditando && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleCancelEdit}
                  style={{ borderColor: '#522A71', color: '#522A71' }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
          <div className="flex justify-between items-center">
            <CardTitle style={{ color: '#31144A' }}>
              Clientes Cadastrados ({clientes.length})
            </CardTitle>
            <Button
              onClick={exportarCSV}
              variant="outline"
              style={{ borderColor: '#D2B360', color: '#D2B360' }}
              className="hover:bg-yellow-50"
            >
              Exportar CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {clientes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum cliente cadastrado. Adicione seu primeiro cliente acima.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: '#F2F2F2' }}>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nascimento</TableHead>
                    <TableHead>Serviços</TableHead>
                    <TableHead>Cadastrado</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientesOrdenados.map((cliente) => (
                    <TableRow key={cliente.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{cliente.nome}</TableCell>
                      <TableCell>{cliente.telefone}</TableCell>
                      <TableCell>{cliente.email || '-'}</TableCell>
                      <TableCell>
                        {cliente.nascimento ? formatDate(cliente.nascimento) : '-'}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {cliente.totalServicos}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(cliente.criadoEm)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(cliente)}
                            style={{ borderColor: '#7B539D', color: '#7B539D' }}
                            className="hover:bg-purple-50"
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => excluirCliente(cliente.id)}
                            style={{ borderColor: '#522A71', color: '#522A71' }}
                            className="hover:bg-red-50"
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clientes;
