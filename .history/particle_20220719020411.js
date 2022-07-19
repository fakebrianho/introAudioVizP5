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
	}
	display() {
		fill(255)
		ellipse(this.pos.x, this.pos.y, this.size)
	}
}

// class Bubble {
// 	constructor(x, y, radius) {
// 		this.pos = createVector(2, 2)
// 		this.x = x
// 		this.y = y
// 		this.r = random(0, 255)
// 		this.g = random(0, 255)
// 		this.b = random(0, 255)
// 		this.radius = radius
// 	}

// 	move() {
// 		this.x += random(-5, 5)
// 		this.y += random(-5, 5)
// 	}

// 	show() {
// 		fill(this.r, this.g, this.b)
// 		circle(this.x, this.y, this.radius)
// 	}
// }
