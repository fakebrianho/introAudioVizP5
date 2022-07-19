class Particle {
	constructor() {
		this.x = Math.random() * window.innerWidth
		this.y = Math.random() * window.innerHeight
		// this.pos = createVector(
		// 	Math.random() * windowWidth,
		// 	Math.random() * windowHeight
		// )
		this.direction = p5.createVector(Math.random(), Math.random())
		this.size = 20
	}
	update() {
		this.x += this.direction.x
		this.y += this.direction.y
		// this.pos.add(this.direction)
	}
	display() {
		fill(255)
		ellipse(this.pos.x, this.pos.y, this.size)
	}
}
