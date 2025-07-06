import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Recuperar senha</h1>
              <p className="text-muted-foreground">Informe seu e-mail para receber instruções</p>
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

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
                size="lg"
              >
                Enviar instruções
              </Button>
            </form>

            <div className="text-center pt-4">
              <Link 
                to="/" 
                className="text-purple-600 hover:text-purple-700 hover:underline font-medium text-sm"
              >
                Voltar para o login
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

export default RecuperarSenha;