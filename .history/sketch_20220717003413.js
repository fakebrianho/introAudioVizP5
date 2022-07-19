let audio, amplitude
function preload() {
	audio = loadSound('assets/audio/sketch.mp3')
	console.log(audio)
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	audio.play()
	amplitude = new p5.Amplitude()
}

function draw() {
	background(255, 0, 0)
	const volume = amplitude.getLevel()
	const mapVolume = map(volume, 0, 0.1, 0, windowHeight)
}
