import { isDrawing, allDrawings } from './drawingState.js';
import { drawGrid } from './grid.js';
console.log(`isDrawing: ${isDrawing}`);
export function tileDrawingHalfDrop(ctx, canvas, gridDivisions) {
    console.log("Half Drop tiling called");
    const cellSize = canvas.width / gridDivisions;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allDrawings.forEach(path => {
        const pathf = path[0];
        const oCol = Math.floor(pathf.x / cellSize);
        const oRow = Math.floor(pathf.y / cellSize);
        for (let col = 0; col < gridDivisions; col++) {
            // For each column and row, draw the path offset to the cell's origin, with half-drop on odd columns
            const offCol = col - oCol;
            const yShift = (Math.abs(offCol) % 2 === 1) ? cellSize / 2 : 0;
            for (let row = 0; row < gridDivisions; row++) {
                const cellX = col * cellSize;
                const cellY = row * cellSize + yShift;
                // Only draw if the repeat is fully within the canvas
                if (cellY < 0 || cellY >= canvas.height)
                    continue;
                ctx.save();
                ctx.beginPath();
                path.forEach((point, index) => {
                    // Offset path so it appears in the correct cell
                    const x = (point.x - oCol * cellSize) + cellX;
                    const y = (point.y - oRow * cellSize) + cellY;
                    if (index === 0)
                        ctx.moveTo(x, y);
                    else
                        ctx.lineTo(x, y);
                });
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }
        }
    });
    drawGrid(ctx, canvas, gridDivisions);
}
