export class Key {
  keycode: string;
  pressed: boolean;

  constructor(keycode: string, pressed = false) {
    this.keycode = keycode;
    this.pressed = pressed;
  }
}

export class Keyboard {
  up: Key;
  left: Key;
  down: Key;
  right: Key;

  constructor() {
    this.up = new Key("KeyW");
    this.left = new Key("KeyA");
    this.down = new Key("KeyS");
    this.right = new Key("KeyD");
  }

  keyDown(keycode: string) {
    switch (keycode) {
      case this.up.keycode:
        this.up.pressed = true;
        break;
      case this.left.keycode:
        this.left.pressed = true;
        break;
      case this.down.keycode:
        this.down.pressed = true;
        break;
      case this.right.keycode:
        this.right.pressed = true;
        break;
      default:
        break;
    }
  }

  keyUp(keycode: string) {
    switch (keycode) {
      case this.up.keycode:
        this.up.pressed = false;
        break;
      case this.left.keycode:
        this.left.pressed = false;
        break;
      case this.down.keycode:
        this.down.pressed = false;
        break;
      case this.right.keycode:
        this.right.pressed = false;
        break;
      default:
        break;
    }
  }
}
