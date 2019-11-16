import { Ninja } from '../objects/ninja';

export class GameScene extends Phaser.Scene {
	private map: Phaser.Tilemaps.Tilemap;
	private layer: Phaser.Tilemaps.DynamicTilemapLayer;
	private ninja: Ninja;

	constructor() {
		super({
			key: 'GameScene'
		});
	}

	preload(): void {
		this.load.spritesheet(
			"ninja",
			"../assets/ninja.png",
			{
				frameWidth: 32,
				frameHeight: 32,
				margin: 1,
				spacing: 2
			}
		);
		this.load.image('tiles', '../assets/tilemap/inca_front.png');
		this.load.tilemapTiledJSON("map", "../assets/tilemap/mapa.json");
	}

	create(): void {
		const map = this.map = this.make.tilemap({ key: "map" });
		const tileset = map.addTilesetImage("mapa-tiles", "tiles");
		const layer = this.layer = map.createDynamicLayer("layer", tileset);
		this.ninja = new Ninja(this, 16, 16);
		this.layer.setCollisionByProperty({ collides: true });
		this.physics.world.addCollider(this.ninja.sprite, layer);
		this.cameras.main.startFollow(this.ninja.sprite);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	}

	update(time, delta) {
		if (this.ninja.dead) {
			return;
		}

		this.ninja.update();

		if (this.ninja.sprite.y > this.layer.height || this.ninja.sprite.y < 0) {
			this.ninja.dead = true;

			const cam = this.cameras.main;
			cam.shake(100, 0.05);
			cam.fade(250, 0, 0, 0);

			cam.once("camerafadeoutcomplete", () => {
				this.ninja.destroy();
				this.scene.restart();
			});
		}
	}
}
