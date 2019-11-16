export class Ninja {
	public dead = false;
	public sprite: Phaser.Physics.Arcade.Sprite;
	private scene: Phaser.Scene;
	private keys: any;
	private flipped = false;
	private flipToggle = true;
	readonly gravity = 3000;

	constructor(scene: Phaser.Scene, x, y) {
		this.scene = scene;

		const anims = scene.anims;
		anims.create({
			key: "ninja-idle",
			frames: anims.generateFrameNumbers("ninja", { start: 0, end: 3 }),
			frameRate: 3,
			repeat: -1
		});
		anims.create({
			key: "ninja-run",
			frames: anims.generateFrameNumbers("ninja", { start: 8, end: 15 }),
			frameRate: 12,
			repeat: -1
		});

		const sprite = this.sprite = scene.physics.add
			.sprite(x, y, "ninja", 0)
			.setDrag(1000, 0)
			.setMaxVelocity(300, 400)
			.setSize(18, 24)
			.setOffset(7, 9);

		this.keys = scene.input.keyboard.addKeys({
			space: Phaser.Input.Keyboard.KeyCodes.SPACE
		});

		const body = sprite.body as Phaser.Physics.Arcade.Body;
		body.setAllowGravity(true);
		body.setGravityY(this.gravity);
	}

	update() {
		const { keys, sprite } = this;
		const body = sprite.body as Phaser.Physics.Arcade.Body;
		const onGround = sprite.body.blocked.down;
		const onCeiling = sprite.body.blocked.up;

		sprite.setAccelerationX(300);

		if (keys.space.isDown && this.flipToggle) {
			this.flipToggle = false;
			if (onGround || onCeiling) {
				this.flipped = !this.flipped;
				sprite.setFlipY(this.flipped);
				body.setGravityY(this.gravity * (this.flipped ? -1 : 1));
			}
		} else if (keys.space.isUp) {
			this.flipToggle = true;
		}

		if (onGround) {
			if (sprite.body.velocity.x !== 0) {
				sprite.anims.play("ninja-run", true);
			} else {
				sprite.anims.play("ninja-idle", true);
			}
		} else {
			sprite.anims.stop();
			sprite.setTexture("ninja", 10);
		}
	}

	destroy() {
		this.sprite.destroy();
	}
}
