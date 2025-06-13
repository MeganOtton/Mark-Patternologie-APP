import { allDrawings } from './drawingState.js';
import { drawGrid } from './grid.js';
export function tileDrawing(ctx, canvas, gridDivisions) {
    console.log("tileDrawing called");
    // Calculate the size of one grid cell
    const cellSize = canvas.width / gridDivisions;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let col = 0; col < gridDivisions; col++) {
        for (let row = 0; row < gridDivisions; row++) {
            const cellX = col * cellSize;
            const cellY = row * cellSize;
            allDrawings.forEach(path => {
                ctx.save();
                ctx.beginPath();
                path.forEach((point, index) => {
                    const x = (point.x % cellSize) + cellX;
                    const y = (point.y % cellSize) + cellY;
                    if (index === 0)
                        ctx.moveTo(x, y);
                    else
                        ctx.lineTo(x, y);
                });
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                drawGrid(ctx, canvas, gridDivisions);
            });
        }
    }
}
