class Particle {
	constructor() {
		// this.x = Math.random() * windowWidth
		// this.y = Math.random() * windowHeight
		this.pos = createVector(
			Math.random() * windowWidth,
			Math.random() * windowHeight
		)
		this.direction = createVector(Math.random(), Math.random())
		this.size = 20
	}
	checkCollision() {
		for (let i = 0; i < 100; i++) {
			for (let j = 0; j < 100; j++) {
				if (i != j) {
					let distance = p5.Vector.dist(
						particles[i].pos,
						particles[j].pos
					)
				}
				if (distance < 20) {
				}
			}
		}
	}
	update() {
		// this.x += this.direction.x
		// this.y += this.direction.y
		this.pos.add(this.direction)
		if (this.pos.x > windowWidth || this.pos.x < 0) {
			this.pos.x = windowWidth / 2
		}
		if (this.pos.y > windowHeight || this.pos.y < 0) {
			this.pos.y = windowHeight / 2
		}
	}
	display() {
		fill(255)
		ellipse(this.pos.x, this.pos.y, this.size)
	}
}
