
import { ResumoFinanceiro } from "@/components/lancamentos/ResumoFinanceiro";
import { FormularioLancamento } from "@/components/lancamentos/FormularioLancamento";
import { ListaLancamentos } from "@/components/lancamentos/ListaLancamentos";

const Lancamentos = () => {
  return (
    <div className="space-y-6">
      <ResumoFinanceiro />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormularioLancamento />
        <ListaLancamentos />
      </div>
    </div>
  );
};

export default Lancamentos;
