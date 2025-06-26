
import { Button } from "@/components/ui/button";

interface LinkPersonalizadoProps {
  linkPersonalizado: string;
  onCopiarLink: () => void;
}

const LinkPersonalizado = ({ linkPersonalizado, onCopiarLink }: LinkPersonalizadoProps) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-800">Seu Link de Agendamento</h3>
          <p className="text-sm text-gray-600 break-all">{linkPersonalizado}</p>
        </div>
        <Button
          onClick={onCopiarLink}
          style={{ backgroundColor: '#7B539D', color: 'white' }}
          size="sm"
        >
          Copiar Link
        </Button>
      </div>
    </div>
  );
};

export default LinkPersonalizado;
