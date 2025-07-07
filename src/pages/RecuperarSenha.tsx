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
              Recuperar senha
            </h1>
            <p className="text-muted-foreground text-sm">
              Informe seu e-mail para receber instruções
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

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
            >
              Enviar instruções
            </Button>
          </form>

          {/* Link */}
          <div className="text-center mt-6">
            <Link 
              to="/login" 
              className="text-sm text-primary hover:underline"
            >
              Voltar para o login
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

export default RecuperarSenha;