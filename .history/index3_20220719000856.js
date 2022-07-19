let audio, amplitude, x, y, progress, xVal
let oldVar, fft
const easing = 0.15

function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}
function setup() {
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
	// frameRate(60)
}

function draw() {
	background(200, 200, 200)
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
