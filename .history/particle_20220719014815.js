export class Particle {
	constructor() {
		this.x = Math.random() * windowWidth
		this.y = Math.random() * windowHeight
		this.direction = createVector(Math.random(), Math.random())
		this.size = 20
	}
}
