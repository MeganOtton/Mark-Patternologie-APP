import { gridDivisions, drawGrid, resizeCanvas } from './grid.js';
import { startDrawing, draw, redrawCanvas, clearCanvas, stopDrawinghalftile, stopDrawingtile } from './drawingCore.js';
const mode = document.body.getAttribute('data-mode') || 'full';
console.log('Mode:', mode);
const canvas = document.getElementById('active-canvas');
if (!canvas) {
    throw new Error('Canvas element not found');
}
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('2D context not available');
}
let isDrawing = false;
export function initCanvas() {
    const mode = document.body.getAttribute('data-mode');
    const canvas = document.getElementById('active-canvas');
    if (!canvas) {
        throw new Error('Canvas element not found');
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('2D context not available');
    }
    console.log('Initializing canvas...');
    // Set initial drawing style
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    canvas.addEventListener('mousedown', (e) => handleStartDrawing(e, ctx));
    canvas.addEventListener('mousemove', (e) => handleDraw(e, ctx));
    canvas.addEventListener('mouseup', (e) => handleStopDrawing(e, ctx, canvas));
    canvas.addEventListener('mouseout', (e) => handleStopDrawing(e, ctx, canvas));
    canvas.addEventListener('touchstart', (e) => handleStartDrawing(e, ctx));
    canvas.addEventListener('touchmove', (e) => handleDraw(e, ctx));
    canvas.addEventListener('touchend', (e) => handleStopDrawing(e, ctx, canvas));
    canvas.addEventListener('pointerdown', (e) => handleStartDrawing(e, ctx));
    canvas.addEventListener('pointermove', (e) => handleDraw(e, ctx));
    canvas.addEventListener('pointerup', (e) => handleStopDrawing(e, ctx, canvas));
    canvas.addEventListener('pointerout', (e) => handleStopDrawing(e, ctx, canvas));
    // Add event listener for the clear button
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', () => handleClear(ctx, canvas, gridDivisions));
    }
    else {
        console.error('Clear button not found');
    }
    handleClear(ctx, canvas, gridDivisions); // Clear the canvas initially
    resizeCanvas(ctx, canvas);
    drawGrid(ctx, canvas, gridDivisions);
}
function handleResize() {
    if (!canvas || !ctx)
        return;
    resizeCanvas(ctx, canvas);
    redrawCanvas(ctx, canvas);
}
function handleStartDrawing(e, ctx) {
    e.preventDefault(); // Prevent scrolling on touch devices
    startDrawing(e, ctx);
}
function handleDraw(e, ctx) {
    e.preventDefault(); // Prevent scrolling on touch devices
    draw(e, ctx);
}
function handleStopDrawing(e, ctx, canvas) {
    const mode = document.body.getAttribute('data-mode');
    if (mode === 'full') {
        stopDrawingtile(ctx, canvas, gridDivisions);
    }
    else if (mode === 'half') {
        stopDrawinghalftile(ctx, canvas, gridDivisions);
    }
    else {
        document.body.removeAttribute('data-mode');
    }
}
function handleClear(ctx, canvas, gridDivisions) {
    console.log('Clearing canvas...');
    clearCanvas(ctx, canvas, gridDivisions);
    drawGrid(ctx, canvas, gridDivisions); // Redraw the grid after clearing
}
window.addEventListener('resize', handleResize);
// Call initCanvas when the page loads
window.addEventListener('load', initCanvas);
