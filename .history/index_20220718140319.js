let audio
function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}
function setup() {
	createCanvas(windowWidth, windowHeight)
	audio.play()
}

function draw() {
	background(255, 0, 0)
}
