interface PlayerProps {
  x: number;
  y: number;
  radius: number;
  color: string;
}
export class Player {
  x: number;
  y: number;
  radius: number;
  color: string;

  constructor({ x, y, radius = 10, color }: PlayerProps) {
    this.x = x;
    this.y = y;
    this.radius = radius * devicePixelRatio;
    this.color = color;
  }

  draw(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}
