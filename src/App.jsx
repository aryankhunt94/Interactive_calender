import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './components/Calendar/CalendarHeader';
import CalendarGrid from './components/Calendar/CalendarGrid';
import DayModal from './components/Modal/DayModal';

function App() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-4">
                        My Creative Calendar
                    </h1>
                    <p className="text-slate-400 text-lg">Plan, Draw, and Create.</p>
                </header>

                <CalendarHeader
                    currentDate={currentDate}
                    onPrevMonth={prevMonth}
                    onNextMonth={nextMonth}
                />

                <CalendarGrid
                    currentDate={currentDate}
                    onDateClick={handleDateClick}
                />
            </div>

            {selectedDate && (
                <DayModal
                    date={selectedDate}
                    onClose={() => setSelectedDate(null)}
                />
            )}
        </div>
    );
}

export default App;
