var levels;
var currentLevelIndex;

function loadLevels() {
	levels = [];
	currentLevelIndex = 0;

	let level1Buttons = [];
	level1Buttons.push(new Button(500, 100, false));
	levels.push(new Level(level1Buttons, null, 300, "1/9\n\nMove with left and right arrow keys\nChange line thickness with + and -"));

	let level2Buttons = [];
	level2Buttons.push(new Button(500, 100, true));
	level2Buttons.push(new Button(200, 100, false));
	levels.push(new Level(level2Buttons, null, 500, "2/9"));

	let level3Buttons = [];
	level3Buttons.push(new Button(250, 100, false));
	level3Buttons.push(new Button(550, 100, false));
	levels.push(new Level(level3Buttons, null, 400, "3/9\n\nChange size with up and down arrow keys"));

	let level4Buttons = [];
	level4Buttons.push(new Button(195, 390, true));
	level4Buttons.push(new Button(605, 390, true));
	levels.push(new Level(level4Buttons, null, 400, "4/9"));

	let level5Buttons = [];
	level5Buttons.push(new Button(150, 100, false));
	level5Buttons.push(new Button(300, 100, true));
	level5Buttons.push(new Button(550, 100, false));
	levels.push(new Level(level5Buttons, null, 400, "5/9"));

	let level6Buttons = [];
	level6Buttons.push(new Button(200, 100, false));
	levels.push(new Level(level6Buttons, new Block(350, 50), 500, "6/9"));

	let level7Buttons = [];
	level7Buttons.push(new Button(175, 350, true));
	level7Buttons.push(new Button(625, 350, true));
	levels.push(new Level(level7Buttons, new Block(200, 75), 600, "7/9"));

	let level8Buttons = [];
	level8Buttons.push(new Button(400, 100, true));
	level8Buttons.push(new Button(250, 100, false));
	level8Buttons.push(new Button(550, 100, false));
	level8Buttons.push(new Button(100, 100, true));
	level8Buttons.push(new Button(700, 100, true));
	levels.push(new Level(level8Buttons, new Block(100, 50), 700, "8/9"));

	let level9Buttons = [];
	level9Buttons.push(new Button(400, 100, false));
	level9Buttons.push(new Button(250, 100, true));
	level9Buttons.push(new Button(550, 100, true));
	level9Buttons.push(new Button(100, 100, false));
	level9Buttons.push(new Button(700, 100, false));
	levels.push(new Level(level9Buttons, new Block(100, 50), 700, "9/9"));

	levels.push(new Level([], new Block(500, 50), 300, "A winner is you!"));
}

class Level {
	constructor(aButtons, aBlock, aPlayerPosition, aText) {
		this.buttons = aButtons;
		this.block = aBlock;
		this.playerPosition = aPlayerPosition;
		this.text = aText;
	}

	init() {
		player.setPosition(this.playerPosition);
		player.setSize(50);
	}

	update() {
		let levelComplete = true;
		for (let index = 0; index < this.buttons.length; index++) {
			this.buttons[index].reset();
			this.buttons[index].update(player);
			if (this.block) {
				this.buttons[index].update(this.block);
			}
			if (!this.buttons[index].isActive) {
				levelComplete = false;
			}
		}
		if (this.block) {
			this.block.update(player);
		}
		return levelComplete;
	}

	draw() {
		for (let index = 0; index < this.buttons.length; index++) {
			this.buttons[index].draw();
		}
		if (this.block) {
			this.block.draw();
		}
	}

	drawText() {
		strokeWeight(3);
		text(this.text, 100, 100);
		strokeWeight(0);
	}

	getBlockSize() {
		if (this.block) {
			return this.block.size - 1;
		} else {
			return 0;
		}
	}
}
