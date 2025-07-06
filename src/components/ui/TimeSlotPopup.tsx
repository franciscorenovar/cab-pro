
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimeSlotPopupProps {
  selectedDate: string;
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
}

const TimeSlotPopup = ({ selectedDate, isOpen, onClose, onTimeSelect, selectedTime }: TimeSlotPopupProps) => {
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Horários disponíveis para {selectedDate}
        </h2>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {timeSlots.map((time, index) => (
            <button
              key={time}
              onClick={() => onTimeSelect(time)}
              className={`
                py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200
                ${index % 3 === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                  : selectedTime === time
                  ? 'bg-purple-primary text-white border-purple-primary'
                  : 'border-purple-primary text-purple-primary hover:bg-purple-primary hover:text-white cursor-pointer'
                }
              `}
              disabled={index % 3 === 0}
            >
              {time}
            </button>
          ))}
        </div>
        
        <Button 
          onClick={onClose}
          className="w-full gradient-primary text-white"
          disabled={!selectedTime}
        >
          Confirmar Horário
        </Button>
      </Card>
    </div>
  );
};

export default TimeSlotPopup;
 