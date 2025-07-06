
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BookingCalendarProps {
  onDateSelect: (date: string) => void;
}

const BookingCalendar = ({ onDateSelect }: BookingCalendarProps) => {
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Mock calendar days for January 2025
  const calendarDays = [
    { date: 29, disabled: true, prevMonth: true },
    { date: 30, disabled: true, prevMonth: true },
    { date: 31, disabled: true, prevMonth: true },
    { date: 1, available: true },
    { date: 2, available: true },
    { date: 3, available: true },
    { date: 4, available: false },
    { date: 5, available: false },
    { date: 6, available: true },
    { date: 7, available: true },
    { date: 8, available: true },
    { date: 9, available: true },
    { date: 10, available: true },
    { date: 11, available: false },
    { date: 12, available: false },
    { date: 13, available: true },
    { date: 14, available: true },
    { date: 15, available: true },
    { date: 16, available: true },
    { date: 17, available: true },
    { date: 18, available: false },
    { date: 19, available: false },
    { date: 20, available: true },
    { date: 21, available: true },
    { date: 22, available: true },
    { date: 23, available: true },
    { date: 24, available: true },
    { date: 25, available: false },
    { date: 26, available: false },
    { date: 27, available: true },
    { date: 28, available: true },
    { date: 29, available: true },
    { date: 30, available: true },
    { date: 31, available: true },
    { date: 1, disabled: true, nextMonth: true },
    { date: 2, disabled: true, nextMonth: true },
  ];

  const handleDateClick = (day: any) => {
    if (day.available && !day.disabled && !day.prevMonth && !day.nextMonth) {
      const formattedDate = `${day.date}/01/2025`;
      onDateSelect(formattedDate);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Escolha uma data</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-medium text-lg text-gray-900">Janeiro 2025</span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 font-medium
              ${day.disabled || day.prevMonth || day.nextMonth
                ? 'text-gray-300 cursor-not-allowed'
                : day.available
                ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer border-2 border-green-300'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }
            `}
            disabled={day.disabled || !day.available || day.prevMonth || day.nextMonth}
          >
            {day.date}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
          <span className="text-gray-600">Disponível</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-gray-600">Indisponível</span>
        </div>
      </div>
    </Card>
  );
};

export default BookingCalendar;
