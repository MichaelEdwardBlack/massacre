export interface SpriteProps {
  position: { x: number; y: number };
  velocity?: { dx: number; dy: number };
  image: CanvasImageSource;
}
export class Sprite {
  position: { x: number; y: number };
  velocity: { dx: number; dy: number };
  image: CanvasImageSource;

  constructor({ position, velocity = { dx: 0, dy: 0 }, image }: SpriteProps) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
  }

  draw(c: CanvasRenderingContext2D) {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
