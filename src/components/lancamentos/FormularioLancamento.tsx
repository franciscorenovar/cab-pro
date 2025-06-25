
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Lancamento } from "@/types/lancamentos";
import { useToast } from "@/hooks/use-toast";

interface FormularioLancamentoProps {
  onSubmit: (lancamento: Omit<Lancamento, 'id' | 'createdAt'>) => void;
  lancamentoEditando?: Lancamento | null;
  onCancelEdit?: () => void;
}

export const FormularioLancamento = ({ 
  onSubmit, 
  lancamentoEditando, 
  onCancelEdit 
}: FormularioLancamentoProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    tipo: '' as 'Entrada' | 'Saída' | '',
    valor: '',
    formaPagamento: '' as 'Pix' | 'Dinheiro' | 'CC' | 'CD' | 'Crédito Loja' | '',
    categoria: '' as 'Profissional' | 'Pessoal' | '',
    descricao: ''
  });

  useEffect(() => {
    if (lancamentoEditando) {
      setFormData({
        data: lancamentoEditando.data.toISOString().split('T')[0],
        tipo: lancamentoEditando.tipo,
        valor: lancamentoEditando.valor.toString(),
        formaPagamento: lancamentoEditando.formaPagamento,
        categoria: lancamentoEditando.categoria,
        descricao: lancamentoEditando.descricao
      });
    }
  }, [lancamentoEditando]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.valor || !formData.formaPagamento || !formData.categoria) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const lancamento = {
      data: new Date(formData.data),
      tipo: formData.tipo,
      valor: parseFloat(formData.valor),
      formaPagamento: formData.formaPagamento,
      categoria: formData.categoria,
      descricao: formData.descricao
    };

    onSubmit(lancamento);
    
    // Limpar formulário após salvar
    setFormData({
      data: new Date().toISOString().split('T')[0],
      tipo: '',
      valor: '',
      formaPagamento: '',
      categoria: '',
      descricao: ''
    });

    toast({
      title: "Sucesso",
      description: `Lançamento ${lancamentoEditando ? 'atualizado' : 'adicionado'} com sucesso!`
    });

    if (onCancelEdit) onCancelEdit();
  };

  const handleCancel = () => {
    setFormData({
      data: new Date().toISOString().split('T')[0],
      tipo: '',
      valor: '',
      formaPagamento: '',
      categoria: '',
      descricao: ''
    });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <Card className="mb-6">
      <CardHeader style={{ backgroundColor: '#F2F2F2' }}>
        <CardTitle style={{ color: '#31144A' }}>
          {lancamentoEditando ? 'Editar Lançamento' : 'Novo Lançamento'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data">Data *</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Tipo *</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipo: 'Entrada' })}
                  style={{
                    backgroundColor: formData.tipo === 'Entrada' ? '#7B539D' : 'transparent',
                    borderColor: '#7B539D',
                    color: formData.tipo === 'Entrada' ? 'white' : '#7B539D'
                  }}
                  variant={formData.tipo === 'Entrada' ? 'default' : 'outline'}
                  className="flex-1 hover:opacity-90"
                >
                  Entrada
                </Button>
                <Button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipo: 'Saída' })}
                  style={{
                    backgroundColor: formData.tipo === 'Saída' ? '#7B539D' : 'transparent',
                    borderColor: '#7B539D',
                    color: formData.tipo === 'Saída' ? 'white' : '#7B539D'
                  }}
                  variant={formData.tipo === 'Saída' ? 'default' : 'outline'}
                  className="flex-1 hover:opacity-90"
                >
                  Saída
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="valor">Valor *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
              <Select value={formData.formaPagamento} onValueChange={(value: any) => setFormData({ ...formData, formaPagamento: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pix">Pix</SelectItem>
                  <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="CC">Cartão de Crédito</SelectItem>
                  <SelectItem value="CD">Cartão de Débito</SelectItem>
                  <SelectItem value="Crédito Loja">Crédito Loja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Categoria *</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  type="button"
                  onClick={() => setFormData({ ...formData, categoria: 'Profissional' })}
                  style={{
                    backgroundColor: formData.categoria === 'Profissional' ? '#7B539D' : 'transparent',
                    borderColor: '#7B539D',
                    color: formData.categoria === 'Profissional' ? 'white' : '#7B539D'
                  }}
                  variant={formData.categoria === 'Profissional' ? 'default' : 'outline'}
                  className="flex-1 hover:opacity-90"
                >
                  Profissional
                </Button>
                <Button
                  type="button"
                  onClick={() => setFormData({ ...formData, categoria: 'Pessoal' })}
                  style={{
                    backgroundColor: formData.categoria === 'Pessoal' ? '#7B539D' : 'transparent',
                    borderColor: '#7B539D',
                    color: formData.categoria === 'Pessoal' ? 'white' : '#7B539D'
                  }}
                  variant={formData.categoria === 'Pessoal' ? 'default' : 'outline'}
                  className="flex-1 hover:opacity-90"
                >
                  Pessoal
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva o lançamento..."
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              style={{ backgroundColor: '#7B539D', color: 'white' }}
              className="hover:opacity-90"
            >
              {lancamentoEditando ? 'Atualizar' : 'Salvar'} Lançamento
            </Button>
            
            {lancamentoEditando && (
              <Button 
                type="button" 
                variant="outline"
                onClick={handleCancel}
                style={{ borderColor: '#522A71', color: '#522A71' }}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
