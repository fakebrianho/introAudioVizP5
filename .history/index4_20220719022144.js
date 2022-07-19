// import Particle;
// import { Particle } from './particle.js'

let audio, amplitude, x, y, progress, xVal
let oldVar, fft
let particles = []
let particleCount = 100

const easing = 0.15

let test
function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}

function checkCollision() {
	for (let i = 0; i < 100; i++) {
		for (let j = 0; j < 100; j++) {
			if (i != j) {
				var distance = p5.Vector.dist(
					particles[i].pos,
					particles[j].pos
				)
			}
			if (distance < 20) {
				particles[i].direction.rotate(Math.random())
				particles[j].direction.rotate(Math.random())
			}
		}
	}
}

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)
	test = new Particle()
	amplitude = new p5.Amplitude()
	xVal = 0
	x = 15
	y = 15
	oldVar = 0
	progress = 0
	fft = new p5.FFT()
	rectMode(CENTER)
	background(200, 200, 200)
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle())
	}
}

function draw() {
	// background(200, 200, 200, 40)
	background(200, 200, 200)
	push()
	const fftwave = fft.waveform()
	noFill()
	strokeWeight(3)
	stroke(255)

	// text(`${mouseX}`, 500, 500)
	for (let i = 0; i < fftwave.length; i++) {
		const x = map(i, 0, fftwave.length, 0, width)
		const y = map(fftwave[i], -1, 1, 0, height)
		point(x, y)
	}
	pop()
	push()
	translate(width / 2, height / 2)
	noStroke()
	// text(windowWidth, 100, 100)
	// text(`${particles[1].pos.x}`, 100, 200)
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)

	pop()
	for (let i = 0; i < particleCount; i++) {
		checkCollision()
		particles[i].update()
		particles[i].display()
		// console.log(particles[1].pos)
	}
}

function togglePlay() {
	if (audio.isPlaying()) {
		audio.pause()
	} else {
		audio.play()
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
