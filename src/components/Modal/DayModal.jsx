import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, PenTool } from 'lucide-react';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import NotePad from '../Features/NotePad';
import DrawingPad from '../Features/DrawingPad';
import useLocalStorage from '../../hooks/useLocalStorage';

const DayModal = ({ date, onClose }) => {
    const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'drawing'
    const dateKey = format(date, 'yyyy-MM-dd');

    // Storage keys
    const noteKey = `calendar-note-${dateKey}`;
    const drawingKey = `calendar-drawing-${dateKey}`;

    const [savedNote, setSavedNote] = useLocalStorage(noteKey, '');
    const [savedDrawing, setSavedDrawing] = useLocalStorage(drawingKey, null);

    const generatePDF = (currentNote, currentDrawing) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        let yPos = 20;

        // Header
        doc.setFontSize(22);
        doc.setTextColor(15, 23, 42); // Slate 900
        doc.text(format(date, 'EEEE, MMMM do, yyyy'), margin, yPos);

        yPos += 10;
        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139); // Slate 500
        doc.text(`Generated on ${format(new Date(), 'PPpp')}`, margin, yPos);

        yPos += 20;

        // Notes Section
        if (currentNote) {
            doc.setFontSize(16);
            doc.setTextColor(15, 23, 42);
            doc.text('Notes', margin, yPos);
            yPos += 10;

            doc.setFontSize(12);
            doc.setTextColor(51, 65, 85); // Slate 700
            const splitNote = doc.splitTextToSize(currentNote, pageWidth - (margin * 2));
            doc.text(splitNote, margin, yPos);
            yPos += (splitNote.length * 7) + 20;
        }

        // Drawing Section
        if (currentDrawing) {
            // Check if we need a new page
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(16);
            doc.setTextColor(15, 23, 42);
            doc.text('Drawing', margin, yPos);
            yPos += 10;

            const imgProps = doc.getImageProperties(currentDrawing);
            const imgWidth = pageWidth - (margin * 2);
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            doc.addImage(currentDrawing, 'PNG', margin, yPos, imgWidth, imgHeight);
        }

        doc.save(`calendar-entry-${dateKey}.pdf`);
    };

    const handleNoteSave = (note) => {
        setSavedNote(note);
        generatePDF(note, savedDrawing);
    };

    const handleDrawingSave = (drawing) => {
        setSavedDrawing(drawing);
        generatePDF(savedNote, drawing);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-slate-900 border border-slate-700 w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{format(date, 'EEEE, MMMM do, yyyy')}</h2>
                            <p className="text-slate-400 text-sm">Manage your day</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-800">
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${activeTab === 'notes'
                                ? 'text-sky-400 border-b-2 border-sky-400 bg-slate-800/30'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                                }`}
                        >
                            <FileText size={20} />
                            Notes
                        </button>
                        <button
                            onClick={() => setActiveTab('drawing')}
                            className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${activeTab === 'drawing'
                                ? 'text-sky-400 border-b-2 border-sky-400 bg-slate-800/30'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                                }`}
                        >
                            <PenTool size={20} />
                            Drawing
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 overflow-hidden bg-slate-900/30">
                        {activeTab === 'notes' ? (
                            <NotePad
                                dateKey={dateKey}
                                initialData={savedNote}
                                onSave={handleNoteSave}
                            />
                        ) : (
                            <DrawingPad
                                dateKey={dateKey}
                                initialData={savedDrawing}
                                onSave={handleDrawingSave}
                            />
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DayModal;
