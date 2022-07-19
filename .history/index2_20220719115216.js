//our global variables that we'll be using and animating throughout the sketch
let audio, amplitude, x, y, progress, xVal
let oldVar
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
	rectMode(CENTER)
	// frameRate(60)
}

function draw() {
	background(200, 200, 200)
	push()
	translate(width / 2, height / 2)
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)
	pop()
	if (oldVar != progress) {
		let temp = abs(oldVar - progress)
		if (progress > width / 2) {
			xVal -= temp
		}
	}

	oldVar = progress
	stroke(255)
	translate(xVal, height / 1.25)
	const waveform = audio.getPeaks()
	progress = map(audio.currentTime(), 0, audio.duration(), 0, waveform.length)
	for (let i = 0; i < waveform.length; i++) {
		if (i > progress) {
			stroke(255, 0, 0)
		}
		line(i, waveform[i] * 100, i, waveform[i] * -100)
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
