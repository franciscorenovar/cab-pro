import React, { useState } from "react";
import BookingHeader from "../components/ui/BookingHeader";
import BookingCalendar from "../components/ui/BookingCalendar";
import BookingForm from "../components/ui/BookingForm";
import TimeSlotPopup from "../components/ui/TimeSlotPopup";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedService, setSelectedService] = useState<string>("");

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setPopupOpen(true);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setPopupOpen(false);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedTime(undefined);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <BookingHeader /> {/* Removido o prop title */}

      <div className="mt-8">
        <BookingCalendar onDateSelect={handleDateSelect} />
      </div>

      <TimeSlotPopup
        selectedDate={selectedDate}
        isOpen={popupOpen}
        onClose={handleClosePopup}
        onTimeSelect={handleTimeSelect}
        selectedTime={selectedTime}
      />

      {selectedTime && (
        <div className="mt-8 max-w-md mx-auto">
          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
          />
        </div>
      )}
    </div>
  );
}
