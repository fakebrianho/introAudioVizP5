let audio, amplitude
function preload() {
	audio = loadSound('assets/audio/sketch.mp3')
	console.log(audio)
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	amplitude = new p5.Amplitude()
	console.log(getAmplitude())
}

function draw() {
	background(255, 0, 0)
}
