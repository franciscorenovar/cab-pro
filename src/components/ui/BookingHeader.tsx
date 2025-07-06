
import { Calendar, Clock } from "lucide-react";

const BookingHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cab Pro</h1>
              <p className="text-gray-medium">Salão de Beleza</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-purple-primary">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Agendar Horário</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BookingHeader;
