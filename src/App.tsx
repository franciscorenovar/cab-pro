import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/" element={<Index />} />
          <Route path="/precificacao" element={<Precificacao />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/lancamentos" element={<Lancamentos />} />
          <Route path="/:profissional" element={<AgendamentoCliente />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
