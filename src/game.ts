import 'phaser';
import { GameScene } from './scenes/game-scene';

const config: Phaser.Types.Core.GameConfig = {
	width: 800,
	height: 600,
	type: Phaser.AUTO,
	parent: 'game',
	scene: [GameScene],
	title: 'Ninja',
	version: '1.0',
	input: {
		keyboard: true
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 0
			},
			debug: false
		}
	},
	backgroundColor: '#f8f8f8',
	render: {
		antialias: true
	}
};

export class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);
	}
}

window.addEventListener('load', () => {
	const game = new Game(config);
});
