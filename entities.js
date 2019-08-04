class Entity {
	constructor(aPosition, aSize, aColor) {
		this.position = aPosition;
		this.size = aSize;
		this.color = aColor;
		this.updateLeftRight();
	}

	draw() {
		fill(this.color);
		rect(this.position, 300, this.size, thickness);
		if (this.left > this.right) {
			let position;
			if (this.position < 400) {
				position = this.position + 800;
			} else {
				position = this.position - 800;
			}
			rect(position, 300, this.size, thickness);
		}
	}

	move(aMovement) {
		this.position += aMovement;
		this.position = loopPosition(this.position);
		this.updateLeftRight();
	}

	setPosition(aPosition) {
		this.position = aPosition;
		this.position = loopPosition(this.position);
		this.updateLeftRight();
	}

	grow(aGrowth) {
		this.size += aGrowth;
		this.updateLeftRight();
	}

	setSize(aSize) {
		this.size = aSize;
		this.updateLeftRight();
	}

	collides(aEntity) {
		if (aEntity.left > aEntity.right) {
			return !(this.left > aEntity.right) || !(this.right < aEntity.left);
		} else {
			return !(this.left > aEntity.right || this.right < aEntity.left);
		}
	}

	collidesLeft(aEntity) {
		let collision = false;
		if (this.left > this.right) {
			collision = pointIsBetween(aEntity.right, 0, this.right) ||
				pointIsBetween(aEntity.right, this.left, 800);
		}
		return collision || pointIsBetween(aEntity.right, this.left, this.right);
	}

	collidesRight(aEntity) {
		let collision = false;
		if (this.left > this.right) {
			collision = pointIsBetween(aEntity.left, this.left, 800) ||
				pointIsBetween(aEntity.left, 0, this.right);
		}
		return collision || pointIsBetween(aEntity.left, this.left, this.right);
	}

	updateLeftRight() {
		this.left = this.position - this.size / 2;
		this.left = loopPosition(this.left);
		this.right = this.position + this.size / 2;
		this.right = loopPosition(this.right);
	}
}

class Player extends Entity {
	constructor() {
		super(0, 0, "#000");
	}

	update(aDeltaTime) {
		if (keyIsDown(LEFT_ARROW)) {
			this.move(-100 * aDeltaTime);
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.move(100 * aDeltaTime);
		}

		if (keyIsDown(UP_ARROW)) {
			this.grow(100 * aDeltaTime);
		}
		if (keyIsDown(DOWN_ARROW)) {
			this.grow(-100 * aDeltaTime);
		}
		let blockSize = levels[currentLevelIndex].getBlockSize();
		if (this.size > 799 - blockSize) {
			this.setSize(799 - blockSize);
		}
		if (this.size < 2) {
			this.setSize(2);
		}
	}
}

class Button extends Entity {
	constructor(aPosition, aSize, aIsInverted) {
		super(aPosition, aSize, "#000");
		this.isInverted = aIsInverted;
		this.isActive = this.isInverted;
	}

	update(aActivator) {
		if (this.collides(aActivator)) {
			this.isActive = !this.isInverted;
		}
		if (this.isActive) {
			this.color = "#5d3a9b";
		} else {
			this.color = "#e66100";
		}
	}

	reset() {
		this.isActive = this.isInverted;
	}
}

class Block extends Entity {
	constructor(aPosition, aSize) {
		super(aPosition, aSize, "#222");
	}

	update(aPlayer) {
		if (this.collidesLeft(aPlayer)) {
			this.setPosition(aPlayer.right + this.size / 2);
		}
		if (this.collidesRight(aPlayer)) {
			this.setPosition(aPlayer.left - this.size / 2);
		}
	}
}

function loopPosition(aPosition) {
	if (aPosition < 0) {
		aPosition += 800;
	}
	if (aPosition > 800) {
		aPosition -= 800;
	}
	return aPosition;
}

function pointIsBetween(aPoint, aLeft, aRight) {
	return aPoint > aLeft && aPoint < aRight;
}
