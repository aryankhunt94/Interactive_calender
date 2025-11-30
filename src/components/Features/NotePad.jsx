import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const NotePad = ({ dateKey, initialData, onSave }) => {
    const [note, setNote] = useState(initialData || '');
    const [saveStatus, setSaveStatus] = useState('Save Note');

    useEffect(() => {
        setNote(initialData || '');
    }, [initialData]);

    const handleSave = () => {
        onSave(note);
        setSaveStatus('Saved!');
        setTimeout(() => setSaveStatus('Save Note'), 2000);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Notes</h3>
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${saveStatus === 'Saved!'
                            ? 'bg-green-600 text-white hover:bg-green-500'
                            : 'bg-sky-600 text-white hover:bg-sky-500'
                        }`}
                >
                    <Save size={16} />
                    {saveStatus}
                </button>
            </div>
            <textarea
                className="flex-1 w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
                placeholder="Write your plans for the day..."
                value={note}
                onChange={(e) => {
                    setNote(e.target.value);
                    setSaveStatus('Save Note');
                }}
            />
        </div>
    );
};

export default NotePad;
