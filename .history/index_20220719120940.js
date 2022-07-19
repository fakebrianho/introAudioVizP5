// our global variables that we'll be using and animating throughout the sketch
let audio, amplitude, x, y

// easing, how much dampening we want to apply to our animation
const easing = 0.15

//preload our stuff
function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}
function setup() {
	// setting canvas to a variable so we can attach a mouseClicked callback to it
	const canvas = createCanvas(windowWidth, windowHeight)
	// every time our canvas is clicked we have a callback function that toggles the play/pause state of the audio
	canvas.mouseClicked(togglePlay)

	//amplitude object that returns a value from 0-1 and basically tells us how loud the sound is
	amplitude = new p5.Amplitude()
	// our base
	x = 15
	y = 15
	rectMode(CENTER)
}

function draw() {
	background(200, 200, 200)
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
