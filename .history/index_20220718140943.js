let audio, amplitude
function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}
function setup() {
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)
	amplitude = new p5.Amplitude()
	rectMode(CENTER)
}

function draw() {
	background(200, 200, 200)
	translate(width / 2, height / 2)
	console.log(amplitude.volume)
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)

	rect(0, 0, mapX, mapX)
}

function togglePlay() {
	if (audio.isPlaying()) {
		audio.pause()
	} else {
		audio.play()
	}
}
