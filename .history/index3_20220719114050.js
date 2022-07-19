//our global variables that we'll be using and animating throughout the sketch
let audio, amplitude, x, y, progress, xVal
let oldVar, fft
const easing = 0.15

// We want to preload our audio file before we start the sketch so that we don't run into any timing issues later.
function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}

function setup() {
	// We're just gonna make canvas a variable and attach a mouseClicked with a callback function to it so that we can toggle the play/pause state of the audio.
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)

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
