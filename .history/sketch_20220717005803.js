let audio, amplitude, fft
const bins = 16
function preload() {
	audio = loadSound('assets/audio/sketch.mp3')
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	canvas.rectMode(CENTER)
	audio.play()
	amplitude = new p5.Amplitude()
	fft = new p5.FFT()
}

function draw() {
	background(255, 0, 0)
	stroke(255)
	translate(width / 2, height / 2)
	const volume = amplitude.getLevel()
	const mapVolume = map(volume, 0, 0.1, 0, windowWidth)
	const waveForm = audio.getPeaks()
	rect(0, 0, mapVolume, mapVolume)
	for (let i = 0; i < waveForm.length; i++) {
		line(i, waveForm[i] * 100, i, waveForm[i] * -100)
	}
}
