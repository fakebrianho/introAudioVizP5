let audio, amplitude, fft, binWidth, peakDetect
const bins = 16
function preload() {
	audio = loadSound('assets/audio/sketch.mp3')
}

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)
	// rectMode(CENTER)
	// audio.play()
	// amplitude = new p5.Amplitude()
	fft = new p5.FFT(0, bins)

	peakDetect = new p5.PeakDetect()
	peakDetect.onPeak(peakDetected)
	binWidth = width / bins
}

/*------------------------------
Frequency Domain
------------------------------*/
//bass = [20, 140]
//lowMid = [140, 400]

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
	fft.analyze()
	peakDetect.update(fft)
	// const spectrum = fft.analyze()

	// for (let i = 0; i < spectrum.length; i++) {
	// 	const x = i * binWidth
	// 	const y = map(spectrum[i], 0, 255, height, 0)
	// 	rect(x, y, binWidth, height - y)
	// }
}

function peakDetected() {
	console.log('peak detected')
}

function togglePlay() {
	if (audio.isPlaying()) {
		audio.pause()
	} else {
		audio.play()
	}
}
