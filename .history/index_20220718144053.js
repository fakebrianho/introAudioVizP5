let audio, amplitude, x, y

const easing = 0.05

function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}
function setup() {
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)
	amplitude = new p5.Amplitude()
	x = 15
	y = 15
	rectMode(CENTER)
}

function draw() {
	background(200, 200, 200)
	translate(width / 2, height / 2)
	const mapX = map(amplitude.volume, 0, 1, 0, width)
	let dX = 0
	if (audio.isPlaying()) {
		dX = mapX - x
		x += dX * easing
	} else if (x > 15) {
		dX = mapX - x
		x += dX * easing
	}
	rect(0, 0, x, x)
}

function togglePlay() {
	if (audio.isPlaying()) {
		audio.pause()
	} else {
		audio.play()
	}
}
