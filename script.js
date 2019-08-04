var thickness;
var player;
var nextLevel;
var fadeTimer;
var fadeDirection;

function setup() {
	createCanvas(800, 600);
	strokeWeight(0);
	stroke(255);
	rectMode(CENTER);
	textFont("Varela Round");
	textSize(32);

	thickness = 50;
	player = new Player();

	loadLevels();
	levels[currentLevelIndex].init();
	nextLevel = false;
}

function draw() {
	background(255);
	let deltaTime = 1 / frameRate();

	if (!nextLevel) {
		if (keyIsDown(187)) {
			thickness += 100 * deltaTime;
		}
		if (keyIsDown(189)) {
			thickness -= 100 * deltaTime;
		}
		if (thickness > 600) {
			thickness = 600;
		}
		if (thickness < 2) {
			thickness = 2;
		}

		player.update(deltaTime);
		if (levels[currentLevelIndex].update() && currentLevelIndex < levels.length - 1) {
			nextLevel = true;
			fadeTimer = 0;
			fadeDirection = 1;
		}
	} else {
		fadeTimer += fadeDirection * deltaTime;
		if (fadeTimer > 1) {
			fadeTimer = 1;
			fadeDirection = -1;
			currentLevelIndex++;
			levels[currentLevelIndex].init();
			levels[currentLevelIndex].update();
		}
		if (fadeTimer < 0) {
			nextLevel = false;
		}
	}

	levels[currentLevelIndex].draw();
	player.draw();
	levels[currentLevelIndex].drawText();

	if (nextLevel) {
		background(255, 255, 255, 255 * fadeTimer);
	}
}
