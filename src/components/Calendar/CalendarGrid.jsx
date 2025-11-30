import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { motion } from 'framer-motion';

const CalendarGrid = ({ currentDate, onDateClick }) => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-7 mb-4">
                {weekDays.map((dayName) => (
                    <div key={dayName} className="text-center text-slate-500 text-sm font-medium py-2">
                        {dayName}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((dayItem, index) => {
                    const isCurrentMonth = isSameMonth(dayItem, monthStart);
                    const isCurrentDay = isToday(dayItem);

                    return (
                        <motion.div
                            key={dayItem.toString()}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(56, 189, 248, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onDateClick(dayItem)}
                            className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden
                ${!isCurrentMonth ? 'text-slate-700 bg-slate-900/20' : 'text-slate-300 bg-slate-800/40 hover:bg-slate-800'}
                ${isCurrentDay ? 'ring-2 ring-sky-500 bg-sky-500/10 text-sky-400' : ''}
              `}
                        >
                            <span className={`text-lg font-semibold ${isCurrentDay ? 'text-sky-400' : ''}`}>
                                {format(dayItem, dateFormat)}
                            </span>
                            {/* Indicator for content (to be implemented) */}
                            <div className="absolute bottom-2 flex gap-1">
                                {/* Placeholder dots */}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;
