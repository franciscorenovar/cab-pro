import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calculator, DollarSign, Calendar, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Precificação",
      description: "Calcule preços de produtos e serviços",
      icon: Calculator,
      path: "/precificacao",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Financeiro",
      description: "Controle suas finanças e lançamentos",
      icon: DollarSign,
      path: "/financeiro",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Agenda",
      description: "Gerencie seus agendamentos",
      icon: Calendar,
      path: "/agenda",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Receitas",
      description: "Acompanhe suas receitas e indicações",
      icon: TrendingUp,
      path: "/receitas",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Bem-vinda ao Cab Pro
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Seu sistema completo de gestão profissional para cabeleireiras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card key={module.path} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate(module.path)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Acessar {module.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;