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
	//center our drawing point for the rectangle
	rectMode(CENTER)
}

function draw() {
	//arbitrary background color
	background(200, 200, 200)
	//center our rectangle
	translate(width / 2, height / 2)

	//mapping our volume which is from 0-1 to 0 to width/2
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)
	// a hacky way of introducing an easing effect instead of setting our value directly to the mapped value which will be very jumpy
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)
}

//our callback function that looks at current playing state of song and pauses or plays
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
