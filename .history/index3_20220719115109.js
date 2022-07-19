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
	// We're gonna make a new amplitude object, it returns a value from 0-1 and basically tells us how loud the sound is.
	amplitude = new p5.Amplitude()
	// We're gonna pre-set our x and y values, arbitrarily at the moment but they're useful as base values for our rectangle.
	x = 15
	y = 15
	// FFT object which analyzes our frequency data
	fft = new p5.FFT()
	// Center our drawing point for the rectangle so that we can center it correctly.
	rectMode(CENTER)
	// Arbitrary
	background(200, 200, 200)
}

function draw() {
	//Giving an Alpha of 40 to our background color so we get a bit of afterimage / blurriness to our animation
	background(200, 200, 200, 40)
	push()
	//get our FFT waveform data, aka amplitude over time
	const fftwave = fft.waveform()
	noFill()
	strokeWeight(3)
	stroke(255)

	//we want to draw our waveform data as a line but made of points
	for (let i = 0; i < fftwave.length; i++) {
		//iterate through the fftwave and map the length to our x value acros the width of our screen
		const x = map(i, 0, fftwave.length, 0, width)
		//map the fftwave data at i, essentially the volume at a particular point in time to our y data.
		const y = map(fftwave[i], -1, 1, 0, height)
		point(x, y)
	}
	pop()
	// so we can center our rectangle
	translate(width / 2, height / 2)
	noStroke()
	// map the volume that is from 0-1 to 0 to width/2
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)
	// little hack we can use to create an easing effect so that the animation isn't so jumpy
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)
}

//our callback function that toggles the play/pause state of the audio
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
