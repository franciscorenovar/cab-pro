import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const recuperarSenhaSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

type RecuperarSenhaForm = z.infer<typeof recuperarSenhaSchema>;

const RecuperarSenha = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecuperarSenhaForm>({
    resolver: zodResolver(recuperarSenhaSchema),
  });

  const onSubmit = (data: RecuperarSenhaForm) => {
    console.log("Recuperar senha:", data);
    // Aqui seria implementada a lógica de recuperação de senha
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7B539D' }}>
              <span className="text-white font-bold text-2xl">C</span>
            </div>
          </div>

          {/* Título */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Recuperar senha</h1>
            <p className="text-gray-600 text-sm">Informe seu e-mail para receber instruções</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ fontSize: '16px' }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#7B539D', fontSize: '16px' }}
            >
              Enviar instruções
            </Button>
          </form>

          {/* Link */}
          <div className="text-center mt-6">
            <Link 
              to="/login" 
              className="text-sm hover:underline"
              style={{ color: '#7B539D' }}
            >
              Voltar para o login
            </Link>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Cab Pro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;