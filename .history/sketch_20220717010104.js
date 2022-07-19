let audio, amplitude, fft, binWidth
const bins = 16
function preload() {
	audio = loadSound('assets/audio/sketch.mp3')
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)
	// rectMode(CENTER)
	// audio.play()
	// amplitude = new p5.Amplitude()
	fft = new p5.FFT(0, bins)
	binWidth = width / bins
}

function draw() {
	background(255, 0, 0)
	noStroke()
	// translate(width / 2, height / 2)
	// const volume = amplitude.getLevel()
	// const mapVolume = map(volume, 0, 0.1, 0, windowWidth)
	// const waveForm = audio.getPeaks()
	// rect(0, 0, mapVolume, mapVolume)
	// for (let i = 0; i < waveForm.length; i++) {
	// 	line(i, waveForm[i] * 100, i, waveForm[i] * -100)
	// }
	// essentially an array with length of bins and values from 0 - 255
	const spectrum = fft.analyze()

	for (let i = 0; i < spectrum.length; i++) {
		const x = i * binWidth
		const h = map(spectrum[i], 0, 255, 0, height)
		rect(x, height, binWidth, -h)
	}
}
