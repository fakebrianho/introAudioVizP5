let audio
function preload() {
	audio = loadSound('assets/audio/sketch.mp3')
	console.log(audio)
}

function setup() {
	createCanvas(windowWidth, windowHeight)
}

function draw() {
	background(255, 0, 0)
}
