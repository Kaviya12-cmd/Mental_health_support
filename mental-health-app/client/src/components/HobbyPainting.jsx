import { useRef, useState, useEffect } from 'react';
import { FaEraser, FaPaintBrush, FaTrash, FaSave, FaCircle } from 'react-icons/fa';

const HobbyPainting = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#6C63FF');
    const [brushSize, setBrushSize] = useState(5);
    const [tool, setTool] = useState('brush'); // 'brush' or 'eraser'

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Fill white background initially
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
        ctx.lineWidth = brushSize;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const saveArtwork = () => {
        const link = document.createElement('a');
        link.download = 'my-mindease-artwork.png';
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    const colors = ['#6C63FF', '#00D2D3', '#FF7675', '#00B894', '#FFB800', '#2D3436'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                        onClick={() => setTool('brush')}
                        style={{ background: tool === 'brush' ? 'var(--primary-color)' : '#F0F3FF', color: tool === 'brush' ? 'white' : '#636E72', padding: '10px' }}
                    >
                        <FaPaintBrush />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        style={{ background: tool === 'eraser' ? 'var(--primary-color)' : '#F0F3FF', color: tool === 'eraser' ? 'white' : '#636E72', padding: '10px' }}
                    >
                        <FaEraser />
                    </button>
                    <input
                        type="range"
                        min="1" max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(e.target.value)}
                        style={{ width: '100px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    {colors.map(c => (
                        <button
                            key={c}
                            onClick={() => { setColor(c); setTool('brush'); }}
                            style={{
                                width: '30px', height: '30px', borderRadius: '50%', padding: 0,
                                background: c, border: color === c && tool === 'brush' ? '3px solid #ccc' : 'none'
                            }}
                        />
                    ))}
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => { setColor(e.target.value); setTool('brush'); }}
                        style={{ width: '30px', height: '30px', padding: 0, border: 'none', background: 'none' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={clearCanvas} style={{ background: '#FF7675', color: 'white', padding: '10px 15px' }}>
                        <FaTrash /> Clear
                    </button>
                    <button onClick={saveArtwork} style={{ background: 'var(--success-color)', color: 'white', padding: '10px 15px' }}>
                        <FaSave /> Save
                    </button>
                </div>
            </div>

            <div style={{
                flex: 1,
                background: '#F8FBFF',
                borderRadius: '16px',
                border: '2px solid #F0F3FF',
                overflow: 'hidden',
                cursor: 'crosshair',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                />
            </div>
        </div>
    );
};

export default HobbyPainting;
