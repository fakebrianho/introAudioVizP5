const { Line } = require('three')

let audio, amplitude
function preload() {
	audio = loadSound('assets/audio/sketch.mp3')
	console.log(audio)
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER)
	audio.play()
	amplitude = new p5.Amplitude()
}

function draw() {
	background(255, 0, 0)
	translate(width / 2, height / 2)
	const volume = amplitude.getLevel()
	const mapVolume = map(volume, 0, 0.1, 0, windowWidth)
	const waveForm = audio.getPeaks()
	// rect(0, 0, mapVolume, mapVolume)
	for (let i = 0; i < waveForm.length; i++) {
		line()
	}
}
