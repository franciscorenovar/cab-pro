
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const modules = [
    { name: "Precificação", path: "/precificacao" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Agenda", path: "/agenda" },
    { name: "Receitas", path: "/receitas" }
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="w-full" style={{ backgroundColor: '#31144A' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => navigate('/')}
            style={{ fontFamily: 'serif' }}
          >
            App Cab Pro
          </h1>
        </div>
        
        <nav className="flex flex-wrap gap-2">
          {modules.map((module) => (
            <Button
              key={module.path}
              onClick={() => navigate(module.path)}
              variant={isActive(module.path) ? "default" : "outline"}
              className={`${
                isActive(module.path) 
                  ? "text-white" 
                  : "text-white border-white hover:bg-white hover:text-gray-900"
              }`}
              style={{
                backgroundColor: isActive(module.path) ? '#D2B360' : 'transparent',
                borderColor: '#D2B360'
              }}
            >
              {module.name}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};
