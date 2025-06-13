export function logIsDraw () {console.log(`isDrawing: ${isDrawing}`);}
export type Point = { x: number, y: number };
export let drawingPath: Point[] = [];
export let allDrawings: Point[][] = [];
export let allTiledCanvases: HTMLCanvasElement[] = [];
export let isDrawing = false;
export function setIsDrawing(value: boolean) {isDrawing = value;}