import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const BookingSlot = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [isInstant, setIsInstant] = useState(false);
    const [editing, setEditing] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [dates, setDates] = useState([]);

    // Generate next 7 dates from today
    useEffect(() => {
        const generateDates = () => {
            const today = new Date();
            const next7Days = [];
            for (let i = 0; i < 7; i++) {
                const newDate = new Date(today);
                newDate.setDate(today.getDate() + i);
                const day = newDate.toLocaleDateString('en-US', { weekday: 'short' });
                const date = newDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                });
                next7Days.push({ day, date });
            }
            setDates(next7Days);
        };
        generateDates();
    }, []);

    const [timeSlots, setTimeSlots] = useState([
        { time: '6:00 AM - 8:00 AM', charge: 5 },
        { time: '8:00 AM - 10:00 AM', charge: 5 },
        { time: '10:00 AM - 12:00 PM', charge: 5 },
        { time: '12:00 PM - 2:00 PM', charge: 5 },
        { time: '2:00 PM - 4:00 PM', charge: 10 },
        { time: '4:00 PM - 6:00 PM', charge: 10 },
        { time: '6:00 PM - 8:00 PM', charge: 15 },
        { time: '8:00 PM - 10:00 PM', charge: 15 },
        { time: '10:00 PM - 12:00 AM', charge: 20 },
    ]);

    const instantSlots = [{ label: '10 minutes', charge: 30 }];

    const handleTimeChange = (index, newTime) => {
        const updated = [...timeSlots];
        updated[index].time = newTime;
        setTimeSlots(updated);
        if (selectedTimeSlot?.time === timeSlots[index].time) {
            setSelectedTimeSlot(updated[index]);
        }
    };

    const handleChargeChange = (index, newCharge) => {
        const updated = [...timeSlots];
        updated[index].charge = Number(newCharge);
        setTimeSlots(updated);
        if (selectedTimeSlot?.time === timeSlots[index].time) {
            setSelectedTimeSlot(updated[index]);
        }
    };

    const handleDateClick = (date) => {
        if (!date.full) {
            setSelectedDate(date.date);
            setSelectedTimeSlot(null);
            setIsInstant(false);
        }
    };

    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(slot);
        setIsInstant(false);
    };

    const handleInstantDelivery = (minutes) => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
        }).replace(/ /g, ' ');

        setSelectedDate(formattedDate);
        setSelectedTimeSlot({ time: `Instant Delivery - ${minutes}`, charge: 30 });
        setIsInstant(true);
    };

    const handleConfirm = async () => {
        if (!selectedDate || !selectedTimeSlot) return;

        const booking = {
            date: selectedDate,
            timeSlot: selectedTimeSlot.time,
            charge: selectedTimeSlot.charge,
            isInstant,
        };

        try {
            const url = editing
                ? `http://localhost:5000/api/booking-slot-update/${bookingId}`
                : 'http://localhost:5000/api/booking-slot';

            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(
                    editing
                        ? `Slot updated to ${booking.timeSlot} on ${booking.date} (₹${booking.charge})`
                        : `Booking confirmed for ${booking.timeSlot} on ${booking.date} (₹${booking.charge})`,
                    { position: 'top-right', autoClose: 3000 }
                );
                setSelectedDate('');
                setSelectedTimeSlot(null);
                setIsInstant(false);
                setEditing(false);
                setBookingId(null);
            } else {
                toast.error(data.error || 'Operation failed');
            }
        } catch (err) {
            toast.error('Server error. Try again later.');
            console.error(err);
        }
    };

    const handleEditSlot = () => {
        const mockBooking = {
            id: 'booking123',
            date: dates[2]?.date || '',
            timeSlot: '4:00 PM - 6:00 PM',
            charge: 10,
            isInstant: false,
        };

        const existingSlot = timeSlots.find(slot => slot.time === mockBooking.timeSlot);

        if (existingSlot) {
            setSelectedDate(mockBooking.date);
            setSelectedTimeSlot(existingSlot);
            setIsInstant(mockBooking.isInstant);
            setBookingId(mockBooking.id);
            setEditing(true);
            toast.info('You can now update your booking. Click "Update Booking" to save.', {
                position: 'top-right',
                autoClose: 3000,
            });
        } else {
            toast.error('Selected booking slot not found.');
        }
    };

    return (
        <div>
            <div className="flex justify-around items-center mb-6 mt-4">
                <h1 className="text-3xl font-bold text-blue-700">Order Summary</h1>
                <Link
                    to="/booking-slot-page"
                    className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                >
                    Slot Booking
                </Link>
            </div>

            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <ToastContainer />
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Delivery Date</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 mb-6">
                    {dates.map((d, index) => (
                        <button
                            key={index}
                            disabled={d.full}
                            onClick={() => handleDateClick(d)}
                            className={`flex flex-col items-center border p-2 rounded-lg transition ${
                                selectedDate === d.date && !isInstant
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : d.full
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'hover:bg-blue-100 text-gray-800 border-gray-300'
                            }`}
                        >
                            <span className="font-medium">{d.day}</span>
                            <span className="text-sm">{d.date}</span>
                            {d.full && <span className="text-xs text-red-500 mt-1">Slot Full</span>}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                    {instantSlots.map((slot, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleInstantDelivery(slot.label)}
                            className={`px-4 py-2 rounded-md text-white font-semibold transition ${
                                isInstant && selectedTimeSlot?.time.includes(slot.label)
                                    ? 'bg-red-600'
                                    : 'bg-red-500 hover:bg-red-600'
                            }`}
                        >
                            Instant Delivery
                        </button>
                    ))}
                </div>

                {!isInstant && selectedDate && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                        {timeSlots.map((slot, i) => (
                            <div
                                key={i}
                                className={`border p-3 rounded-lg text-sm transition flex flex-col gap-2 cursor-pointer ${
                                    selectedTimeSlot?.time === slot.time
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'hover:bg-green-100 text-gray-800 border-gray-300'
                                }`}
                                onClick={() => handleTimeSlotClick(slot)}
                            >
                                <div>
                                    <span className="mr-1">Time:</span>
                                    <input
                                        type="text"
                                        value={slot.time}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => handleTimeChange(i, e.target.value)}
                                        className="w-full px-1 py-0.5 border rounded text-xs text-black"
                                    />
                                </div>
                                <div>
                                    <span className="mr-1">Charge:</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={slot.charge}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => handleChargeChange(i, e.target.value)}
                                        className="w-20 px-1 py-0.5 border rounded text-xs text-black"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedTimeSlot && (
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                        <p className="text-gray-700 font-medium">
                            Selected Date: <span className="text-blue-600">{selectedDate}</span>
                        </p>
                        <p className="text-gray-700 font-medium">
                            Time Slot: <span className="text-blue-600">{selectedTimeSlot.time}</span>
                        </p>
                        <p className="text-gray-700 font-medium">
                            Delivery Charge: <span className="text-blue-600">₹{selectedTimeSlot.charge}</span>
                        </p>
                    </div>
                )}

                <div className="flex gap-4">
                    {selectedDate && selectedTimeSlot ? (
                        <button
                            onClick={handleConfirm}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                        >
                            {editing ? 'Update Booking' : 'Confirm Booking'}
                        </button>
                    ) : (
                        <p className="text-gray-600">Please select a date and time slot.</p>
                    )}
                    <button
                        onClick={handleEditSlot}
                        className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
                    >
                        Edit Existing Slot
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSlot;
