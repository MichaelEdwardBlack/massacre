import { Entity, EntityProps } from "./Entity";

export interface ProjectileProps extends EntityProps {
  velocity: { x: number; y: number };
}

export class Projectile extends Entity {
  velocity: { x: number; y: number };

  constructor(props: ProjectileProps) {
    if (!props.color) props.color = "white";
    super(props);
    this.velocity = props.velocity;
  }

  draw(c: CanvasRenderingContext2D) {
    c.save();
    c.shadowColor = this.color;
    c.shadowBlur = 20;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
