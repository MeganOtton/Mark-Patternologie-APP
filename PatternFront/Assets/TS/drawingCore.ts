import { Point, drawingPath, allDrawings, isDrawing, setIsDrawing } from './drawingState.js';
import { drawGrid } from './grid.js';
import { tileDrawingHalfDrop } from './halfdraw.js';
import { tileDrawing } from './drawing.js';

const canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;

const mouse: { x: number | null | undefined; y: number | null | undefined } = {
    x: undefined,
    y: undefined
};

let lastX: number = 0;
let lastY: number = 0;

export function startDrawing(e: MouseEvent|TouchEvent, ctx: CanvasRenderingContext2D) {
    setIsDrawing(true);
    const point = getPointFromEvent(e);
    [lastX, lastY] = [point.x, point.y];
    drawingPath.length = 0; 
    drawingPath.push(point);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
}

//live drawings
export function draw(e: MouseEvent|TouchEvent, ctx: CanvasRenderingContext2D) {
    if (!isDrawing) return;
    const point = getPointFromEvent(e);
    ctx.beginPath();
    ctx.strokeStyle = 'black'; // Ensure stroke color is set to black
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    drawingPath.push(point); // lastX, lastY updated then added to drawingPath
    [lastX, lastY] = [point.x, point.y];
}

//stored paths
export function drawPath(ctx: CanvasRenderingContext2D, path: Point[]) {
    if (path.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
}

export function redrawCanvas(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all stored paths (not drawings)
    allDrawings.forEach(path => {
        drawPath(ctx, path);
    });

    // Draw current path
    if (drawingPath.length > 0) {
        drawPath(ctx, drawingPath);
    }

    // Redraw the grid
    //drawGrid(ctx, canvas);
}

export function clearCanvas(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, gridDivisions:number) {
    // Clear all drawings
    allDrawings.length = 0;
    drawingPath.length = 0;
    
    // Redraw the canvas (which will now only show the grid)
    redrawCanvas(ctx, canvas);
}

export function getPointFromEvent(e:MouseEvent | TouchEvent): Point {
    const target = e.target as Element | null;
    if (!target) {
        return { x: 0, y: 0 };
    }
    // Handle both mouse and touch events
    const rect = target.getBoundingClientRect();
    let x:number, y:number;
    if ('touches' in e && e.touches.length > 0) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else if ('clientX' in e) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    } else {
        x = 0;
        y = 0;
    }
    return { x, y };
}

if (canvas) {
    canvas.addEventListener('click', function(event) {
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
        console.log(`Mouse clicked at: (${mouse.x}, ${mouse.y})`);
    });
} else {
  console.error('Canvas element not found');
}

export function stopDrawinghalftile(ctx: CanvasRenderingContext2D, canvas:HTMLCanvasElement, gridDivisions:number) {
    if (!isDrawing) return;
    setIsDrawing(false);
    console.log("Calling tileDrawingHalfDrop...");
    if (drawingPath.length > 0) {
        allDrawings.push([...drawingPath]);
        drawingPath.length = 0;
    }
    tileDrawingHalfDrop(ctx, canvas, gridDivisions);
    console.log(`isDrawing: ${isDrawing}`);
}

export function stopDrawingtile(ctx: CanvasRenderingContext2D, canvas:HTMLCanvasElement, gridDivisions:number) {
    if (!isDrawing) return;
    setIsDrawing(false);
    console.log("Calling tileDrawing...");
    if (drawingPath.length > 0) {
        allDrawings.push([...drawingPath]);
        drawingPath.length = 0;
    }
    tileDrawing(ctx, canvas, gridDivisions);
    console.log(`isDrawing: ${isDrawing}`);
}