import BookingPage from "./pages/BookingPage";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import Index from "./pages/Index";
import Precificacao from "./pages/Precificacao";
import Financeiro from "./pages/Financeiro";
import Agenda from "./pages/Agenda";
import Receitas from "./pages/Receitas";
import Lancamentos from "./pages/Lancamentos";
import AgendamentoCliente from "./pages/AgendamentoCliente";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota principal - Login */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={<Index />} />
          
          {/* Rotas dos módulos */}
          <Route path="/precificacao" element={<Precificacao />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/lancamentos" element={<Lancamentos />} />
          <Route path="/agenda-cliente" element={<AgendamentoCliente />} />
          
          {/* rota de reserva do cliente */}
          <Route path="/book/:profissionalId" element={<BookingPage />} />
          
          {/* Rota curinga */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
