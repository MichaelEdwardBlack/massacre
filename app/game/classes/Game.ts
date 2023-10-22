import gsap from "gsap";
import { Socket } from "socket.io-client";
import { Player } from "./Player";
import { Keyboard } from "./Keyboard";
import { Projectile } from "./Projectile";
import { Sprite } from "./Sprite";
import { BASE_MOVE_SPEED, CANVAS_HEIGHT, CANVAS_WIDTH, TICK_RATE } from "./Constants";

type Players = { [key: string]: Player };

export class Game {
  socket: Socket;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  frontendPlayers: Players = {};
  playerInputs: { sequenceNumber: number; dx: number; dy: number }[] = [];
  sequenceNumber = 0;
  keyboard = new Keyboard();
  animationId?: number;
  frontendProjectiles: { [key: string]: Projectile } = {};
  background: Sprite;
  onUpdatePlayersCallback?: (players: Players) => void;

  constructor({
    socket,
    canvas,
    context,
  }: {
    socket: Socket;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
  }) {
    this.socket = socket;
    this.canvas = canvas;
    this.context = context;

    const mapImage = new Image();
    mapImage.src = "/maps/FirstMap.png";
    this.background = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: mapImage,
    });
  }

  init = (username?: string | null) => {
    this.socket.on("connect", () => {
      this.socket.emit("initCanvas", {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        devicePixelRatio,
        username,
      });
    });
    this.socket.on("updatePlayers", this.onUpdatePlayers);
    this.socket.on("updateProjectiles", this.onUpdateProjectiles);
    this.socket.connect();

    // draw
    this.context.fillStyle = "rgba(0,0,0,0.1)";
    this.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.animate();

    // game clock
    setInterval(() => {
      if (this.keyboard.up.pressed) {
        this.sequenceNumber++;
        let sequenceNumber = this.sequenceNumber;
        this.playerInputs.push({ sequenceNumber, dx: 0, dy: -BASE_MOVE_SPEED });
        this.socket.emit("keydown", { key: this.keyboard.up.key, sequenceNumber });
      }

      if (this.keyboard.left.pressed) {
        this.sequenceNumber++;
        let sequenceNumber = this.sequenceNumber;
        this.playerInputs.push({ sequenceNumber, dx: -BASE_MOVE_SPEED, dy: 0 });
        this.socket.emit("keydown", { key: this.keyboard.left.key, sequenceNumber });
      }

      if (this.keyboard.down.pressed) {
        this.sequenceNumber++;
        let sequenceNumber = this.sequenceNumber;
        this.playerInputs.push({ sequenceNumber, dx: 0, dy: BASE_MOVE_SPEED });
        this.socket.emit("keydown", { key: this.keyboard.down.key, sequenceNumber });
      }

      if (this.keyboard.right.pressed) {
        this.sequenceNumber++;
        let sequenceNumber = this.sequenceNumber;
        this.playerInputs.push({ sequenceNumber, dx: BASE_MOVE_SPEED, dy: 0 });
        this.socket.emit("keydown", { key: this.keyboard.right.key, sequenceNumber });
      }
    }, TICK_RATE);

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("click", this.onClick);
  };

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    const myPlayer = this.frontendPlayers[this.socket.id];
    if (myPlayer) {
      this.background.position.x = -myPlayer.position.x + CANVAS_WIDTH / 2;
      this.background.position.y = -myPlayer.position.y + CANVAS_HEIGHT / 2;
    }

    this.background.draw(this.context);

    for (const id in this.frontendPlayers) {
      const player = this.frontendPlayers[id];
      player.drawRelative(this.context, this.background);
    }

    for (const id in this.frontendProjectiles) {
      const projectile = this.frontendProjectiles[id];
      projectile.drawRelative(this.context, this.background);
    }
  };

  private onUpdateProjectiles = (backendProjectiles: any) => {
    // remove dead projectiles
    for (const id in this.frontendProjectiles) {
      if (!backendProjectiles[id]) {
        delete this.frontendProjectiles[id];
      }
    }
    for (const id in backendProjectiles) {
      const backendProjectile = backendProjectiles[id];

      // spawn any new projectiles
      if (!this.frontendProjectiles[id]) {
        this.frontendProjectiles[id] = new Projectile({
          x: backendProjectile.x,
          y: backendProjectile.y,
          velocity: backendProjectile.velocity,
          radius: backendProjectile.radius,
          color: this.frontendPlayers[backendProjectile.playerId]?.color,
        });
      }
      // update existing projectile positions
      else {
        this.frontendProjectiles[id].x += backendProjectile.velocity.x;
        this.frontendProjectiles[id].y += backendProjectile.velocity.y;
      }
    }
  };

  private onUpdatePlayers = (backendPlayers: any) => {
    // remove disconnected players
    for (const id in this.frontendPlayers) {
      if (!backendPlayers[id]) {
        delete this.frontendPlayers[id];
      }
    }

    for (const id in backendPlayers) {
      const backendPlayer = backendPlayers[id];
      // add new players
      if (!this.frontendPlayers[id]) {
        const img = new Image();
        img.src = "/characters/BlackSorcerer/SpriteSheet.png";
        this.frontendPlayers[id] = new Player({
          id,
          position: {
            x: backendPlayer.x,
            y: backendPlayer.y,
          },
          image: img,
          color: backendPlayer.color,
          score: backendPlayer.score,
          name: backendPlayer.name,
        });
      }
      // update players
      else {
        // server reconciliation (fix lag for us the player)
        if (id === this.socket.id) {
          this.frontendPlayers[id].position.x = backendPlayer.x;
          this.frontendPlayers[id].position.y = backendPlayer.y;
          const lastBackendInputIndex = this.playerInputs.findIndex((input) => {
            return backendPlayer.sequenceNumber === input.sequenceNumber;
          });

          if (lastBackendInputIndex > -1) {
            this.playerInputs.splice(0, lastBackendInputIndex + 1);
          }

          this.playerInputs.forEach((input) => {
            this.frontendPlayers[id].position.x += input.dx;
            this.frontendPlayers[id].position.y += input.dy;
          });
        }
        // interpolation (smooth out lag for other players)
        else {
          gsap.to(this.frontendPlayers[id].position, {
            x: backendPlayer.x,
            y: backendPlayer.y,
            duration: TICK_RATE / 1000,
          });
        }
      }
    }

    if (this.onUpdatePlayersCallback) {
      this.onUpdatePlayersCallback(this.frontendPlayers);
    }
  };

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.frontendPlayers[this.socket.id]) return;
    this.keyboard.keyDown(e.key);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    if (!this.frontendPlayers[this.socket.id]) return;
    this.keyboard.keyUp(e.key);
  };

  private onClick = (e: MouseEvent) => {
    const myPlayer = this.frontendPlayers[this.socket.id];
    if (!myPlayer) return;
    const angle = Math.atan2(
      (e.clientY - this.canvas.offsetTop) * devicePixelRatio - CANVAS_HEIGHT / 2,
      (e.clientX - this.canvas.offsetLeft) * devicePixelRatio - CANVAS_WIDTH / 2
    );
    this.socket.emit("shoot", {
      x: myPlayer.position.x,
      y: myPlayer.position.y,
      angle,
    });
  };
}
