import { Entity, EntityProps } from "./Entity";

export interface PlayerProps extends EntityProps {
  id: string;
  score: number;
}

export class Player extends Entity {
  id: string;
  score: number;
  constructor(props: PlayerProps) {
    if (!props.score) props.score = 0;
    super(props);
    this.score = props.score;
    this.id = props.id;
  }
}
