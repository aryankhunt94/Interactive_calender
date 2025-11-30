import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
    return (
        <div className="flex items-center justify-between mb-8 px-4">
            <div className="flex flex-col">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <p className="text-slate-400 text-sm mt-1">Select a date to add notes or drawings</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onPrevMonth}
                    className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={onNextMonth}
                    className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default CalendarHeader;
