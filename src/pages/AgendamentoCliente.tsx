
import { useState } from "react";
import BookingHeader from "../components/ui/BookingHeader";
import BookingCalendar from "../components/ui/BookingCalendar";
import BookingForm from "../components/ui/BookingForm";
import TimeSlotPopup from "../components/ui/TimeSlotPopup";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsPopupOpen(true);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsPopupOpen(false);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-secondary to-white">
      <BookingHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Agende seu horário
          </h1>
          <p className="text-gray-medium text-lg">
            Escolha a data e horário que melhor se adequa à sua agenda
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Calendar - takes 2 columns */}
          <div className="lg:col-span-2">
            <BookingCalendar onDateSelect={handleDateSelect} />
          </div>

          {/* Booking form - takes 1 column */}
          <div className="lg:col-span-1">
            <BookingForm 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedService={selectedService}
              onServiceSelect={handleServiceSelect}
            />
          </div>
        </div>

        {/* Professional info section */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-md mx-auto">
            <div className="w-16 h-16 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ana Silva</h3>
            <p className="text-gray-medium mb-4">Cabeleireira Especialista</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <span>⭐ 4.9 (127 avaliações)</span>
              <span>📍 Vila Madalena, SP</span>
            </div>
          </div>
        </div>
      </main>

      {/* Time Slot Popup */}
      <TimeSlotPopup
        selectedDate={selectedDate}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onTimeSelect={handleTimeSelect}
        selectedTime={selectedTime}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-medium">
          <p>&copy; 2025 Cab Pro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
