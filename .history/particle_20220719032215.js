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
		this.acceleration = createVector(Math.random(), Math.random())
		this.velocity = createVector(1, 1)
	}

	applyForce(force) {
		let f = createVector(Math.random() * force, Math.random() * force)
		f.rotate(Math.random() * force)
		this.acceleration.add(f)
	}
	update() {
		this.velocity.add(this.acceleration)
		this.acceleration.mult(0)
		if (this.pos.x > windowWidth || this.pos.x < 0) {
			this.pos.x = Math.random() * windowWidth
			this.velocity.x *= -1
		}
		if (this.pos.y > windowHeight || this.pos.y < 0) {
			this.pos.y = Math.random() * windowHeight
			this.velocity.y *= -1
		}
		this.pos.add(this.velocity)
	}
	display() {
		fill(255)
		ellipse(this.pos.x, this.pos.y, this.size)
	}
	joinParticles(particles) {
		particles.forEach((element) => {
			let dis = dist(this.pos.x, this.pos.y, element.pos.x, element.pos.y)
			if (dis < 85) {
				stroke('rgba(255,255,255, 0.5)')
				line(this.pos.x, this.pos.y, element.pos.x, element.pos.y)
			}
		})
	}
}
