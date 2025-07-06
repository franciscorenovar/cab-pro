import React from "react";
import { Button } from "@/components/ui/button";

interface LinkPersonalizadoProps {
  profissionalId: string;
}

const LinkPersonalizado: React.FC<LinkPersonalizadoProps> = ({ profissionalId }) => {
  const url = `${window.location.origin}/book/${profissionalId}`;

  const onCopiarLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link copiado!");
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-800">Seu Link de Agendamento</h3>
          <p className="text-sm text-gray-600 break-all">{url}</p>
        </div>
        <Button
          onClick={onCopiarLink}
          style={{ backgroundColor: "#7B539D", color: "white" }}
          size="sm"
        >
          Copiar Link
        </Button>
      </div>
    </div>
  );
};

export default LinkPersonalizado;
