import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarInset,
  SidebarHeader
} from '@/components/ui/sidebar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Users, CreditCard, FileText, Bell, LogOut, Plus, Edit, Trash, Mail, UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data - será substituído por integrações reais
const mockKPIs = {
  subscriptionsOverdue: { count: 3, value: 297.00 },
  monthlyRevenue: 4850.00,
  withdrawalRequests: 1250.00,
  criticalAlerts: 1
};

const mockProfessionals = [
  { 
    id: 1, 
    name: 'Maria Silva', 
    email: 'maria@email.com', 
    status: 'ativo', 
    registrationDate: '2024-01-15',
    subscriptionStatus: 'ativo'
  },
  { 
    id: 2, 
    name: 'Ana Santos', 
    email: 'ana@email.com', 
    status: 'ativo', 
    registrationDate: '2024-02-20',
    subscriptionStatus: 'atrasado'
  },
  { 
    id: 3, 
    name: 'Carla Costa', 
    email: 'carla@email.com', 
    status: 'inativo', 
    registrationDate: '2024-01-10',
    subscriptionStatus: 'cancelado'
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const { toast } = useToast();

  const menuItems = [
    { title: 'Dashboard', value: 'dashboard', icon: FileText },
    { title: 'Profissionais', value: 'professionals', icon: Users },
    { title: 'Assinaturas/Pagamentos', value: 'subscriptions', icon: CreditCard },
    { title: 'Relatórios', value: 'reports', icon: FileText },
    { title: 'Notificações', value: 'notifications', icon: Bell },
    { title: 'Sair', value: 'logout', icon: LogOut }
  ];

  const filteredProfessionals = mockProfessionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || prof.subscriptionStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      ativo: 'bg-green-100 text-green-800',
      atrasado: 'bg-yellow-100 text-yellow-800',
      cancelado: 'bg-red-100 text-red-800',
      inativo: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || variants.inativo;
  };

  const handleSendMessage = async () => {
    // Integração futura com Resend
    toast({
      title: 'Mensagem enviada',
      description: `Mensagem enviada para ${selectedProfessional?.name}`
    });
    setIsMessageModalOpen(false);
    setMessageContent('');
    setSelectedProfessional(null);
  };

  const handleAction = async (action: string, professionalId: number) => {
    // Integrações futuras com Firebase/Pagar.me
    toast({
      title: 'Ação executada',
      description: `${action} executada com sucesso`
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinaturas em Atraso</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIs.subscriptionsOverdue.count}</div>
            <p className="text-xs text-muted-foreground">
              R$ {mockKPIs.subscriptionsOverdue.value.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recebido este Mês</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {mockKPIs.monthlyRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12% do mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saques Solicitados</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {mockKPIs.withdrawalRequests.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">3 solicitações pendentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
            <Bell className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIs.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Sistema</CardTitle>
          <CardDescription>
            Resumo das principais métricas e atividades do Cab Pro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Status do Sistema</h4>
                <p className="text-sm text-muted-foreground">Todos os serviços operacionais</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Últimas Integrações</h4>
                <p className="text-sm text-muted-foreground">Firebase, Pagar.me, Resend</p>
              </div>
              <Badge>Conectado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfessionals = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="max-w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="atrasado">Atrasado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Profissional
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestão de Profissionais</CardTitle>
          <CardDescription>
            Gerencie todas as profissionais cadastradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfessionals.map((professional) => (
                <TableRow key={professional.id}>
                  <TableCell className="font-medium">{professional.name}</TableCell>
                  <TableCell>{professional.email}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(professional.subscriptionStatus)}>
                      {professional.subscriptionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(professional.registrationDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleAction('editar', professional.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedProfessional(professional);
                          setIsMessageModalOpen(true);
                        }}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleAction('bloquear', professional.id)}
                      >
                        {professional.status === 'ativo' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleAction('remover', professional.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assinaturas e Pagamentos</CardTitle>
          <CardDescription>
            Controle financeiro e status das assinaturas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-green-600">Assinaturas Ativas</h4>
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">R$ 1.485,00/mês</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-yellow-600">Em Atraso</h4>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">R$ 297,00 pendentes</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-red-600">Canceladas</h4>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Este mês</p>
            </div>
          </div>
          <div className="mt-6">
            <Button>Exportar Relatório (PDF)</Button>
            <Button variant="outline" className="ml-2">Exportar (Excel)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios</CardTitle>
          <CardDescription>
            Exporte dados e relatórios do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Relatório Financeiro</h4>
              <p className="text-sm text-muted-foreground">Receitas, saques e inadimplência</p>
              <Button className="mt-4">Gerar Relatório</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Relatório de Profissionais</h4>
              <p className="text-sm text-muted-foreground">Cadastros, status e atividade</p>
              <Button className="mt-4">Gerar Relatório</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notificações e Alertas</CardTitle>
          <CardDescription>
            Monitore alertas críticos e comunique-se com profissionais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
              <div>
                <h4 className="font-medium">Pagamento em Atraso</h4>
                <p className="text-sm text-muted-foreground">Ana Santos - 5 dias de atraso</p>
              </div>
              <Button size="sm">Notificar</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Sistema Operacional</h4>
                <p className="text-sm text-muted-foreground">Todos os serviços funcionando normalmente</p>
              </div>
              <Badge className="bg-green-100 text-green-800">OK</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'professionals':
        return renderProfessionals();
      case 'subscriptions':
        return renderSubscriptions();
      case 'reports':
        return renderReports();
      case 'notifications':
        return renderNotifications();
      default:
        return renderDashboard();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">C</span>
              </div>
              <span className="font-semibold text-lg">Cab Pro Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.value}>
                      <SidebarMenuButton
                        onClick={() => {
                          if (item.value === 'logout') {
                            // Implementar logout
                            window.location.href = '/';
                          } else {
                            setActiveTab(item.value);
                          }
                        }}
                        isActive={activeTab === item.value}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'professionals' && 'Profissionais'}
                {activeTab === 'subscriptions' && 'Assinaturas e Pagamentos'}
                {activeTab === 'reports' && 'Relatórios'}
                {activeTab === 'notifications' && 'Notificações'}
              </h1>
            </div>
            {renderContent()}
          </div>
        </SidebarInset>
      </div>

      {/* Modal para envio de mensagem */}
      <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Mensagem</DialogTitle>
            <DialogDescription>
              Envie uma mensagem para {selectedProfessional?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Digite sua mensagem aqui..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsMessageModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSendMessage}>
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}