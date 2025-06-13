export const gridDivisions = 3; // 3x3 grid
export function drawGrid(ctx, canvas, gridDivisions) {
    const cellSize = canvas.width / gridDivisions;
    // Save the current context state
    ctx.save();
    // Draw all grid lines in light gray
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    // Draw vertical lines
    for (let i = 0; i < gridDivisions; i++) {
        const x = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    // Draw horizontal lines
    for (let i = 0; i < gridDivisions; i++) {
        const y = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    // Draw the middle square in blue
    const middleX = Math.floor(gridDivisions / 2) * cellSize;
    const middleY = Math.floor(gridDivisions / 2) * cellSize;
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(middleX, middleY, cellSize, cellSize);
    // Restore the context state
    ctx.restore();
    console.log('Drawing grid...');
    console.log(`Canvas dimensions: ${canvas.width}x${canvas.height}`);
    console.log(`Cell size: ${canvas.width / gridDivisions}`);
}
export function resizeCanvas(ctx, canvas) {
    canvas.width = 600;
    canvas.height = 600;
    // Save current canvas as image
    const tempImage = new Image();
    tempImage.src = canvas.toDataURL();
    if (ctx) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            drawGrid(ctx, canvas, gridDivisions);
        }
    }
}
