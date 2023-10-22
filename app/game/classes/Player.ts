import { ZOOM_LEVEL } from "./Constants";
import { Sprite, SpriteProps } from "./Sprite";

export interface PlayerProps extends SpriteProps {
  id: string;
  score: number;
  name: string;
  color: string;
}

export class Player extends Sprite {
  id: string;
  score: number;
  name: string;
  color: string;

  constructor(props: PlayerProps) {
    if (!props.score) props.score = 0;
    super(props);
    this.score = props.score;
    this.id = props.id;
    this.name = props.name;
    this.color = props.color;
  }

  /*
[
  walk.s.1, walk.w.1, walk.a.1, walk.d.1, // idle
  walk.s.2, walk.w.2, walk.a.2, walk.d.2,
  walk.s.3, walk.w.3, walk.a.3, walk.d.3, // idle
  walk.s.4, walk.w.4, walk.a.4, walk.d.4,
  attack.s.1., attack.w.1, attack.a.1, attack.d.1,
  jump.s.1., jump.w.1, jump.a.1, jump.d.1,  
  dead, item, special.1, special.2,
]
  */

  drawRelative(c: CanvasRenderingContext2D, background: Sprite) {
    const relativePosition = {
      x: this.position.x + background.position.x,
      y: this.position.y + background.position.y,
    };
    const imageWidth = this.image.width / 4;
    const imageHeight = this.image.height / 7;
    const zoomedImageWidth = imageWidth * ZOOM_LEVEL;
    const zoomedImageHeight = imageHeight * ZOOM_LEVEL;
    c.drawImage(
      this.image,
      0,
      0,
      imageWidth,
      imageHeight,
      relativePosition.x - zoomedImageWidth / 2,
      relativePosition.y - zoomedImageHeight / 2,
      zoomedImageWidth,
      zoomedImageHeight
    );
  }
}
