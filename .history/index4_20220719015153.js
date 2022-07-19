// import Particle;
import { Particle } from './particle.js'

let audio, amplitude, x, y, progress, xVal
let oldVar, fft
let particles = []
let particleCount = 100

const easing = 0.15

// function createParticle() {
// 	let particle = {}
// 	particle.position = createVector(random(width), random(height))
// 	particle.direction = createVector(Math.random(), Math.random())
// 	particle.update = function () {
// 		this.position.add(this.direction)
// 	}
// }

function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}
function setup() {
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)
	const test = new Particle()
	amplitude = new p5.Amplitude()
	xVal = 0
	x = 15
	y = 15
	oldVar = 0
	progress = 0
	fft = new p5.FFT()
	rectMode(CENTER)
	background(200, 200, 200)
}

function draw() {
	background(200, 200, 200, 40)
	push()
	const fftwave = fft.waveform()
	noFill()
	strokeWeight(3)
	stroke(255)
	console.log(test)
	test.display()

	for (let i = 0; i < fftwave.length; i++) {
		const x = map(i, 0, fftwave.length, 0, width)
		const y = map(fftwave[i], -1, 1, 0, height)
		point(x, y)
	}
	pop()
	translate(width / 2, height / 2)
	noStroke()
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)
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
