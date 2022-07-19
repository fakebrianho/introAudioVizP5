let audio, amplitude, x, y, progress, xVal

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
	rectMode(CENTER)
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
	if (audio.isPlaying()) {
		xVal++
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
