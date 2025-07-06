import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login:", data);
    // Aqui seria implementada a lógica de autenticação
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
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Bem-vinda ao Cab Pro</h1>
            <p className="text-gray-600 text-sm">Entre com seus dados para acessar o sistema</p>
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

            <div>
              <Label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  {...register("senha")}
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  style={{ fontSize: '16px' }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">{errors.senha.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#7B539D', fontSize: '16px' }}
            >
              Entrar
            </Button>
          </form>

          {/* Links */}
          <div className="flex justify-between items-center mt-6 text-sm">
            <Link 
              to="/cadastro" 
              className="hover:underline"
              style={{ color: '#7B539D' }}
            >
              Criar uma conta
            </Link>
            <Link 
              to="/recuperar-senha" 
              className="hover:underline"
              style={{ color: '#7B539D' }}
            >
              Esqueci minha senha
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

export default Login;