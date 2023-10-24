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
    props.directional = true;
    super(props);
    this.score = props.score;
    this.id = props.id;
    this.name = props.name;
    this.color = props.color;
  }
}
