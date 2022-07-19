//our global variables that we'll be using and animating throughout the sketch
let audio, amplitude, x, y, progress, xVal
let oldVar, fft
let particles = []
let particleCount = 200
let lines = []
let bg = (200, 200, 200, 40)
const easing = 0.15
let test

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

	// setting up our particles here one time, we want to do this in the setup and not in the draw because we don't want to be constantly creating particles, IF YOU PUT IN DRAW YOU WILL SUFFER
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle())
	}
}

function draw() {
	// We set the background to a variable because we're going to change the background color based on our amplitude value.
	background(bg)

	// Push and pop because we're going to have drastically different drawing styles a lot.
	push()

	// For centering our rectangle
	translate(width / 2, height / 2)
	noStroke()

	// Mapping our volume from 0-1 to 0 to width/2
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)

	// This is a little hacky way of easing our values, if we just use the mapX value it'll jump around a lot won't look as nice. There are better ways to do this but for now, this works.
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)
	pop()

	// Particles! Iterating through our particles array and calling their movement functions, 'applyForce' and display functions
	// We're passing in our particle size in the display function as well. We're essentially saying with our conditional that if it's really loud the particle size decreases to reduce overall clutter because the animations will be going BRRRRR
	// JK update we're ONLY displaying our particles and lines when the music is loud enough to make it less cluttered and more like phases of a song.

	for (let i = 0; i < particleCount; i++) {
		particles[i].update()
		if (mapX > 160) {
			particles[i].display(5)
			particles[i].applyForce(mapX * 0.02)
			particles[i].joinParticles(particles.slice(i))
		}
	}

	push()

	// Using our fft we're going to call the waveform() function to get our waveform data. AKA our amplitudes along the time domain.
	const fftwave = fft.waveform()
	noFill()
	strokeWeight(3)
	stroke(255)

	//just a touch of spice to make the visualization different when  music is playing vs not playing
	if (audio.isPlaying()) {
		stroke(255, 0, 0)
	}

	//if our music isn't too loud we're going to draw our waveform in the form of points.
	if (mapX < 160) {
		for (let i = 0; i < fftwave.length; i++) {
			// we're mapping the x and y values of our waveform data to our width and height
			const x = map(i, 0, fftwave.length, 0, width)
			const y = map(fftwave[i], -1, 1, 0, height)
			// drawing the points with our newly mapped data.
			point(x, y)
		}
	}
	pop()

	if (audio.isPlaying()) {
		fill(255, 0, 0)
	} else fill(0)

	// changing our bg color based on volume threshold
	if (mapX < 160) {
		bg = color(200, 200, 200, 40)
	} else {
		bg = color(32, 42, 68, 10) //(32, 42, 68, 40)
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
