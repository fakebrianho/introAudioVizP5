//our global variables that we'll be using and animating throughout the sketch
let audio, amplitude, x, y, progress, xVal
let oldVar, fft
let particles = []
let particleCount = 200
let lines = []
let bg = (200, 200, 200, 40)
const easing = 0.15
let test

// We want to preload our audio file before we start the sketch so that we don't run into any timing issues later.
function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}

function setup() {
	// We're just gonna make canvas a variable and attach a mouseClicked with a callback function to it so that we can toggle the play/pause state of the audio.
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)

	// We're gonna make a new amplitude object, it returns a value from 0-1 and basically tells us how loud the sound is.
	amplitude = new p5.Amplitude()

	//
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
	background(bg)

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
		if (mapX > 160) {
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
	if (mapX < 160) {
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
		bg = color(200, 200, 200, 40)
	} else {
		bg = color(32, 42, 68, 10) //(32, 42, 68, 40)
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
