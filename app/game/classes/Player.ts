import { CANVAS_HEIGHT } from "./Constants";
import { Entity, EntityProps } from "./Entity";
import { Sprite } from "./Sprite";

export interface PlayerProps extends EntityProps {
  id: string;
  score: number;
  name: string;
}

export class Player extends Entity {
  id: string;
  score: number;
  name: string;
  constructor(props: PlayerProps) {
    if (!props.score) props.score = 0;
    super(props);
    this.score = props.score;
    this.id = props.id;
    this.name = props.name;
  }

  drawCenter(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.arc(c.canvas.width / 2, c.canvas.height / 2, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  drawRelative(c: CanvasRenderingContext2D, background: Sprite) {
    const relativePosition = {
      x: this.x + background.position.x,
      y: this.y + background.position.y,
    };
    c.beginPath();
    c.arc(relativePosition.x, relativePosition.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}
