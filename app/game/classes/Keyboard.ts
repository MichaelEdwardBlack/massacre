export class Key {
  key: string;
  pressed: boolean;

  constructor(key: string, pressed = false) {
    this.key = key;
    this.pressed = pressed;
  }
}

export class Keyboard {
  up: Key;
  left: Key;
  down: Key;
  right: Key;

  constructor() {
    this.up = new Key("w");
    this.left = new Key("a");
    this.down = new Key("s");
    this.right = new Key("d");
  }

  keyDown(key: string) {
    switch (key) {
      case this.up.key:
        this.up.pressed = true;
        break;
      case this.left.key:
        this.left.pressed = true;
        break;
      case this.down.key:
        this.down.pressed = true;
        break;
      case this.right.key:
        this.right.pressed = true;
        break;
      default:
        break;
    }
  }

  keyUp(key: string) {
    switch (key) {
      case this.up.key:
        this.up.pressed = false;
        break;
      case this.left.key:
        this.left.pressed = false;
        break;
      case this.down.key:
        this.down.pressed = false;
        break;
      case this.right.key:
        this.right.pressed = false;
        break;
      default:
        break;
    }
  }
}
