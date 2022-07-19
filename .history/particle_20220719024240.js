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
	joinParticles(particles) {
		particles.forEach((element) => {
			let dis = dist(this.pos.x, this.pos.y, element.pos.x, element.pos.y)
			if (dis < 85) {
				stroke('rgba(255,255,255)')
				line(this.pos.x, this.pos.y, element.pos.x, element.pos.y)
			}
		})
	}
}
