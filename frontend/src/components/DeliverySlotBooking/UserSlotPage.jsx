import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSlotPage = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [selectedInstantDelivery, setSelectedInstantDelivery] = useState(null);

  const slots = [
    { time: "10:00 AM - 12:00 PM" },
    { time: "12:00 PM - 2:00 PM" },
    { time: "2:00 PM - 4:00 PM" },
    { time: "4:00 PM - 6:00 PM" },
  ];

  const instantDeliveryOptions = [
    { minutes: 10 },
    { minutes: 15 },
    { minutes: 20 },
  ];

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const day = date.toLocaleDateString("en-GB", { weekday: "short" });
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
      days.push({ day, date: formattedDate });
    }
    return days;
  };

  const dates = getNext7Days();

  const handleSlotSelect = (index) => {
    setSelectedSlotIndex(index);
    setSelectedInstantDelivery(null);
  };

  const handleInstantDeliverySelect = (option) => {
    setSelectedInstantDelivery(option);
    setSelectedSlotIndex(null);
  };

  const handleConfirm = async () => {
    if (selectedDateIndex === null) {
      toast.error("Please select a date.");
      return;
    }

    if (selectedSlotIndex === null && !selectedInstantDelivery) {
      toast.error("Please select a time slot or instant delivery.");
      return;
    }

    const selectedDate = dates[selectedDateIndex];
    const slot = selectedInstantDelivery
      ? `${selectedInstantDelivery.minutes} min (Instant Delivery)`
      : slots[selectedSlotIndex].time;

    const bookingData = {
      date: selectedDate.date,
      day: selectedDate.day,
      slot: slot,
    };

    try {
      const response = await fetch("http://localhost:5000/api/userslot/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Booking confirmed on ${selectedDate.day}, ${selectedDate.date} at ${slot}`);
        // Optional: Reset selection after success
        setSelectedDateIndex(null);
        setSelectedSlotIndex(null);
        setSelectedInstantDelivery(null);
      } else {
        toast.error(data.message || "Failed to book slot.");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Booking Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-start">Order Summary</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Select Date</h2>
        <div className="flex gap-6 overflow-x-auto">
          {dates.map((d, idx) => (
            <div
              key={idx}
              className={`p-4 min-w-[100px] text-center rounded-lg border cursor-pointer ${
                selectedDateIndex === idx ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
              onClick={() => setSelectedDateIndex(idx)}
            >
              <div className="font-semibold">{d.day}</div>
              <div>{d.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Select Time Slot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              onClick={() => handleSlotSelect(idx)}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedSlotIndex === idx ? "bg-green-100 border-green-500" : "bg-white"
              }`}
            >
              <div className="font-medium">{slot.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Or Instant Delivery</h2>
        <div className="flex gap-3">
          {instantDeliveryOptions.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleInstantDeliverySelect(opt)}
              className={`px-4 py-2 border rounded-lg cursor-pointer ${
                selectedInstantDelivery?.minutes === opt.minutes
                  ? "bg-red-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {opt.minutes} min
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserSlotPage;
