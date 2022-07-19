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
	// We're gonna make a new amplitude object, it returns a value from 0-1 and basically tells us how loud the sound is.
	amplitude = new p5.Amplitude()
	// our xVal in this case is going to be the translation of the canvas as we move the canvas along with the progress of the song.
	xVal = 0
	// We're gonna pre-set our x and y values, arbitrarily at the moment but they're useful as base values for our rectangle.
	x = 15
	y = 15
	// we need to keep track of previous val and current progress to accurately get rate of change
	oldVar = 0
	progress = 0
	// changing where we draw our rectangle from
	rectMode(CENTER)
}

function draw() {
	//arbitrary bg color
	background(200, 200, 200)
	push()
	//center our rectangle
	translate(width / 2, height / 2)
	//map our volume which is from 0-1 to 0 to width/2
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)
	//hacky way of introducing an easing effect so that our sizes don't change too dramatically or in too choppy of a manner
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)
	pop()

	// here we're animating the translation of our sketch so that the whole wave form can be shown as we move on throughout the song.
	if (oldVar != progress) {
		let temp = abs(oldVar - progress)
		// we only start moving the canvas when our song gets to middle.
		if (progress > width / 2) {
			xVal -= temp
		}
	}
	oldVar = progress

	stroke(255)
	//actually setting our translation of the canvas
	translate(xVal, height / 1.25)

	//getting the peaks of the audio
	const waveform = audio.getPeaks()
	//setting our progress value by mapping the current time in song from 0 - waveform length so we can find our current spot in the waveform.
	progress = map(audio.currentTime(), 0, audio.duration(), 0, waveform.length)
	//iterating through the waveform so that we can 'animate the current position'
	for (let i = 0; i < waveform.length; i++) {
		// change the color based on where we are in the waveform / song
		if (i > progress) {
			stroke(255, 0, 0)
		}
		//draw our line, we multiply by 100 to make sure we can actually see the lines.
		line(i, waveform[i] * 100, i, waveform[i] * -100)
	}
}

//toggle our music play/pause state based on current state.
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
