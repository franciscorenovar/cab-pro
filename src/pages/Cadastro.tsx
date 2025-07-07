import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const cadastroSchema = z.object({
  email: z.string().email("E-mail inválido"),
  chaveAcesso: z.string().min(1, "Chave de acesso é obrigatória"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmarSenha: z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "Senhas não coincidem",
  path: ["confirmarSenha"],
});

type CadastroForm = z.infer<typeof cadastroSchema>;

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
  });

  const onSubmit = (data: CadastroForm) => {
    console.log("Cadastro:", data);
    // Aqui seria implementada a lógica de cadastro
  };

  const handleAdquirirChave = () => {
    // Redirecionar para página de compra/pagamento
    console.log("Redirecionando para compra da chave");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Criar uma conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Preencha os dados para se cadastrar
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="w-full h-12 px-4 text-base border-input focus:border-primary focus:ring-primary"
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="chaveAcesso" className="text-sm font-medium text-foreground">
                Chave de Acesso
              </Label>
              <Input
                id="chaveAcesso"
                type="text"
                placeholder="CABPRO-XXXX-XXXX-XXXX"
                {...register("chaveAcesso")}
                className="w-full h-12 px-4 text-base border-input focus:border-primary focus:ring-primary"
              />
              {errors.chaveAcesso && (
                <p className="text-destructive text-sm">{errors.chaveAcesso.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-sm font-medium text-foreground">
                Senha (mínimo 6 caracteres)
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  {...register("senha")}
                  className="w-full h-12 px-4 pr-12 text-base border-input focus:border-primary focus:ring-primary"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.senha && (
                <p className="text-destructive text-sm">{errors.senha.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha" className="text-sm font-medium text-foreground">
                Confirmar senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmarSenha"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmarSenha")}
                  className="w-full h-12 px-4 pr-12 text-base border-input focus:border-primary focus:ring-primary"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.confirmarSenha && (
                <p className="text-destructive text-sm">{errors.confirmarSenha.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
            >
              Cadastrar
            </Button>
          </form>

          {/* Botão Adquirir Chave */}
          <Button 
            onClick={handleAdquirirChave}
            className="w-full h-12 mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-base"
          >
            Adquirir chave de acesso
          </Button>

          {/* Link */}
          <div className="text-center mt-6">
            <Link 
              to="/login" 
              className="text-sm text-primary hover:underline"
            >
              Já tenho uma conta
            </Link>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            © 2025 Cab Pro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;