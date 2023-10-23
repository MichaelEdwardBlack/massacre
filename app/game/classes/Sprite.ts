import { ZOOM_LEVEL } from "./Constants";

export enum Direction {
  down = 0,
  up = 1,
  left = 2,
  right = 3,
}

export interface SpriteProps {
  position: { x: number; y: number };
  velocity?: { dx: number; dy: number };
  image: HTMLImageElement;
  frames?: { current: number; max: number; elapsed: number };
  directional?: boolean;
}
export class Sprite {
  position: { x: number; y: number };
  velocity: { dx: number; dy: number };
  image: HTMLImageElement;
  frames: { current: number; max: number; elapsed: number };
  moving: boolean = false;
  width: number = 0;
  height: number = 0;
  direction: Direction = Direction.down;

  constructor({
    position,
    velocity = { dx: 0, dy: 0 },
    image,
    frames = { current: 0, max: 1, elapsed: 0 },
    directional = false,
  }: SpriteProps) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
    this.frames = frames;

    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height / this.frames.max;

      if (directional) {
        this.width /= 4;
      }
    };
  }

  draw(c: CanvasRenderingContext2D) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.image.width * ZOOM_LEVEL,
      this.image.height * ZOOM_LEVEL
    );
  }

  drawRelative(c: CanvasRenderingContext2D, background: Sprite) {
    const relativePosition = {
      x: this.position.x + background.position.x - (this.width * ZOOM_LEVEL) / 2,
      y: this.position.y + background.position.y - (this.height * ZOOM_LEVEL) / 2,
    };

    if (this.frames.max > 1 && this.moving) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % 25 == 0) {
      if (this.frames.current < this.frames.max - 1) this.frames.current++;
      else this.frames.current = 0;
    }
    c.drawImage(
      this.image,
      this.width * this.direction, // crop x start
      this.height * this.frames.current, // crop y start
      this.width, // crop width
      this.height, // crop height
      relativePosition.x, // pos x
      relativePosition.y, // pos y
      this.width * ZOOM_LEVEL, // render width
      this.height * ZOOM_LEVEL // render height
    );
  }

  calculateDirectionAndMovement(previousPosition: { x: number; y: number }) {
    this.moving = previousPosition.x != this.position.x || previousPosition.y != this.position.y;
    if (!this.moving) {
      this.frames.current = 0;
      return;
    }
    const dx = this.position.x - previousPosition.x;
    const dy = this.position.y - previousPosition.y;
    if (Math.abs(dy) > Math.abs(dx)) {
      if (dy > 0) this.direction = Direction.down;
      else this.direction = Direction.up;
    } else {
      if (dx > 0) this.direction = Direction.right;
      else this.direction = Direction.left;
    }
  }
}
