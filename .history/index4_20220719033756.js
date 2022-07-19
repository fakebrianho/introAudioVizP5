// import Particle;
// import { Particle } from './particle.js'

let audio, amplitude, x, y, progress, xVal
let oldVar, fft
let particles = []
let particleCount = 200
let lines = []
let bg = (200, 200, 200, 40)
const easing = 0.15

let test
function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
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
	background(32, 42, 68)
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle())
	}
}

function draw() {
	background(32, 42, 68, 40)

	push()
	translate(width / 2, height / 2)
	noStroke()
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)
	pop()
	for (let i = 0; i < particleCount; i++) {
		particles[i].update()
		if (mapX > 150) {
			particles[i].display(5)
			particles[i].applyForce(mapX * 0.02)
		} else {
			particles[i].display(14)
			particles[i].applyForce(mapX * 0.08)
		}
		particles[i].joinParticles(particles.slice(i))
	}
	push()
	const fftwave = fft.waveform()
	noFill()
	strokeWeight(3)
	stroke(255)
	if (audio.isPlaying()) {
		stroke(255, 0, 0)
	}
	if (mapX < 150) {
		for (let i = 0; i < fftwave.length; i++) {
			const x = map(i, 0, fftwave.length, 0, width)
			const y = map(fftwave[i], -1, 1, 0, height)
			point(x, y)
		}
	}
	pop()
	if (audio.isPlaying()) {
		fill(255, 0, 0)
	}
	if (mapX < 150) {
		bg = (200, 200, 200, 40)
	} else {
		bg = (32, 42, 68, 40)
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
