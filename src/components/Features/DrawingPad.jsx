import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pen, Save, Trash2, Undo } from 'lucide-react';

const DrawingPad = ({ dateKey, initialData, onSave }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#38bdf8'); // Sky 400
    const [lineWidth, setLineWidth] = useState(3);
    const [tool, setTool] = useState('pen'); // 'pen' or 'eraser'
    const [saveStatus, setSaveStatus] = useState('Save Drawing');

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        // Load initial data if exists
        if (initialData) {
            const img = new Image();
            img.src = initialData;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
        }

        // Set initial styles
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }, [initialData]);

    // Helper to get coordinates for both mouse and touch
    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        e.preventDefault(); // Prevent scrolling on touch
        const { x, y } = getCoordinates(e);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
        setSaveStatus('Save Drawing'); // Reset save status on new edit
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault();

        const { x, y } = getCoordinates(e);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = tool === 'eraser' ? '#1e293b' : color;

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
        } else {
            ctx.globalCompositeOperation = 'source-over';
        }

        ctx.lineWidth = lineWidth;
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();
        onSave(dataUrl);
        setSaveStatus('Saved!');
        setTimeout(() => setSaveStatus('Save Drawing'), 2000);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSaveStatus('Save Drawing');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTool('pen')}
                        className={`p-2 rounded-lg transition-colors ${tool === 'pen' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <Pen size={18} />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded-lg transition-colors ${tool === 'eraser' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <Eraser size={18} />
                    </button>
                    <div className="w-px h-6 bg-slate-700 mx-1"></div>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                    />
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(parseInt(e.target.value))}
                        className="w-24 accent-sky-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearCanvas}
                        className="p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-red-900/20 transition-colors"
                        title="Clear Canvas"
                    >
                        <Trash2 size={18} />
                    </button>
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
            </div>
            <div className="flex-1 bg-white rounded-xl overflow-hidden relative cursor-crosshair touch-none">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="absolute inset-0 w-full h-full touch-none"
                />
            </div>
        </div>
    );
};

export default DrawingPad;
