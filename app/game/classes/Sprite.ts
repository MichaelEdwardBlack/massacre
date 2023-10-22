import { ZOOM_LEVEL } from "./Constants";

export interface SpriteProps {
  position: { x: number; y: number };
  velocity?: { dx: number; dy: number };
  image: HTMLImageElement;
}
export class Sprite {
  position: { x: number; y: number };
  velocity: { dx: number; dy: number };
  image: HTMLImageElement;

  constructor({ position, velocity = { dx: 0, dy: 0 }, image }: SpriteProps) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
  }

  draw(c: CanvasRenderingContext2D) {
    c.drawImage(this.image, this.position.x, this.position.y, this.image.width * ZOOM_LEVEL, this.image.height * ZOOM_LEVEL);
  }
}
