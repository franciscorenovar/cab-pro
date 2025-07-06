import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Criar uma conta</h1>
              <p className="text-muted-foreground">Preencha os dados para se cadastrar</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="chaveAcesso">Chave de Acesso</Label>
                <Input
                  id="chaveAcesso"
                  type="text"
                  placeholder="CABPRO-XXXX-XXXX-XXXX"
                  {...register("chaveAcesso")}
                  className={errors.chaveAcesso ? "border-destructive" : ""}
                />
                {errors.chaveAcesso && (
                  <p className="text-sm text-destructive">{errors.chaveAcesso.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha (mínimo 6 caracteres)</Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    {...register("senha")}
                    className={errors.senha ? "border-destructive pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                  <p className="text-sm text-destructive">{errors.senha.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    {...register("confirmarSenha")}
                    className={errors.confirmarSenha ? "border-destructive pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                  <p className="text-sm text-destructive">{errors.confirmarSenha.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
                size="lg"
              >
                Cadastrar
              </Button>
            </form>

            <Button 
              onClick={handleAdquirirChave}
              variant="outline"
              className="w-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-medium"
              size="lg"
            >
              Adquirir chave de acesso
            </Button>

            <div className="text-center pt-4">
              <Link 
                to="/" 
                className="text-purple-600 hover:text-purple-700 hover:underline font-medium text-sm"
              >
                Já tenho uma conta
              </Link>
            </div>
          </CardContent>
        </Card>

        <footer className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            © 2025 Cab Pro. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Cadastro;